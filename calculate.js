const formatDay = (day) => day < 10 ? String(day).padStart(2, '0') : day
const pickBracket = (salary) => {
  const brackets = new Map()

  brackets.set([0, 18_200], { base: 0, each: 0 })
  brackets.set([18_201, 37_000], { base: 0, each: 19 })
  brackets.set([37_001, 87_000], { base: 3_572, each: 32.5 })
  brackets.set([87_001, 180_000], { base: 19_822, each: 37 })
  brackets.set([180_001], { base: 54_232, each: 45 })

  console.log(brackets, salary)
  console.log(brackets.keys)

  for (const [bracket] of brackets) {
    console.log('>>', bracket)
    const [start, end = 9_999_999] = bracket
    const detail = brackets.get(bracket)

    console.log(salary > start, '???', salary < end)

    const match = salary > start && salary < end
    console.log(' ::', { start, end, detail }, match)
  }
  return 'fo'
}
// console.log(pickBracket(60_050))
console.log(pickBracket(188_050))
console.log('^^^^^^^^^^^^^^^^^')

function calculate(state) {
  console.log('CALC', state)
  const fullname = `${state.firstname} ${state.lastname}`
  const payPeriod =
    `${formatDay(state.startDay)} ${state.startMonth}` + ' - ' +
    `${formatDay(state.endDay)} ${state.endMonth} `
  const gross = Math.floor(state.salary / 12)
  // TODO
  const tax = 0
  const net = Math.ceil(gross - tax)
  const superAmount = Math.ceil(gross * state.rate)

  return { fullname, payPeriod, gross, tax, net, superAmount }
}

module.exports = calculate
