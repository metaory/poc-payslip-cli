const dayjs = require('dayjs')

const getDiff = ({ startDay, startMonth, endDay, endMonth }) => {
  const year = new Date().getFullYear()
  const startDate = dayjs(`${startMonth}-${startDay}-${year}`, 'MMMM-D-YYYY')
  const endDate = dayjs(`${endMonth}-${endDay}-${year}`, 'MMMM-D-YYYY')

  return {
    days: endDate.diff(startDate, 'day'),
    months: endDate.diff(startDate, 'month') || 1
  }
}

const formatDay = (day) => day < 10 ? String(day).padStart(2, '0') : day

const pickBracket = (salary) => {
  const brackets = new Map()

  brackets.set([0, 18_200], { base: 0, each: 0 })
  brackets.set([18_201, 37_000], { base: 0, each: 0.19 })
  brackets.set([37_001, 87_000], { base: 3_572, each: 0.325 })
  brackets.set([87_001, 180_000], { base: 19_822, each: 0.37 })
  brackets.set([180_001], { base: 54_232, each: 0.45 })

  return Array.from(brackets.entries()).reduce((acc, cur) => {
    const [_bracket] = cur
    const [start, end = 9_999_999] = _bracket

    const match = salary > start && salary < end

    if (match) acc = [[start, end], brackets.get(_bracket)]
    return acc
  })
}

module.exports = function(state) {
  if (process.argv[2] === '--table') console.table({ state })

  const {
    firstname,
    lastname,
    startMonth,
    startDay,
    endMonth,
    endDay,
    salary,
    rate
  } = state

  const fullname = `${firstname} ${lastname}`
  const payPeriod =
    `${formatDay(startDay)} ${startMonth}` + ' - ' +
    `${formatDay(endDay)} ${endMonth} `

  const { days, months } = getDiff({ startDay, startMonth, endDay, endMonth })

  const gross = Math.floor((salary / 12 / 30) * days)
  const [[bracketStart], { base, each }] = pickBracket(salary)
  const tax = Math.ceil(((((salary - bracketStart) * each) + base) / 12 / 30) * days)
  const net = Math.ceil(gross - tax)
  const superAmount = Math.floor(gross * rate)

  return { fullname, payPeriod, gross, tax, net, superAmount }
}
