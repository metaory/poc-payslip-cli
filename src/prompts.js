const { prompt } = require('enquirer')

const dayjs = require('dayjs')
dayjs.extend(require('dayjs/plugin/localeData'))
// dayjs.extend(require('dayjs/plugin/customParseFormat'))

const percentInput = (name, min = 0, max = 1) => prompt({
  type: 'numeral',
  name,
  message: `enter ${name}`,
  format: (val) => val.toLocaleString('en-US', { style: 'percent' }),
  validate: (val, state) => {
    const _val = Number(`.${val < 10 ? String(val).padStart(2, 0) : val}`)
    if (_val >= min && _val <= max) {
      state.value = _val
      return true
    } else {
      state.value = ''
      return `rate must be between ${min * 100}-${max * 100}`
    }
  }
})

const formatCurrency = (n, currency = 'USD') => n.toLocaleString('en-US',
  { style: 'currency', currency })

const currencyInput = (name, min, max) => prompt({
  type: 'numeral',
  name,
  message: `enter ${name}`,
  format: formatCurrency,
  validate: (val, state) => {
    if (val >= min && val <= max) {
      return true
    } else {
      state.value = ''
      return `${name} must be between` + '\n' +
        `${formatCurrency(min)} - ${formatCurrency(max)}`
    }
  }
})

const stringInput = (name) => prompt({
  type: 'input',
  name,
  message: `enter ${name}`,
  validate: (val) => !!val || `${name} cant be empty!`
})

const dateInput = async (name) => {
  const year = new Date().getFullYear()

  const { month } = await prompt({
    type: 'select',
    name: 'month',
    message: `enter ${name} month?`,
    limit: 7,
    choices: dayjs.months()
  })

  const { day } = await prompt({
    type: 'select',
    name: 'day',
    message: `enter ${name} day?`,
    limit: 7,
    choices: Array.from({
      length: dayjs(`${month}-01-${year}`, 'MMMM-DD-YYYY').daysInMonth()
    })
      .map((_, i) => ({ name: i + 1, value: i + 1 }))
  })
  return { month, day }
}

module.exports = {
  percentInput,
  currencyInput,
  stringInput,
  dateInput
}
