import * as prompt from 'enquirer'
// const { prompt } = require('enquirer')
console.log('prompt', prompt)

import dayjs from 'dayjs'
// const dayjs = require('dayjs')
console.log('dayjs', dayjs)

dayjs.extend(require('dayjs/plugin/localeData'))

// const numberInput = (name, min, max, format) => prompt({
//   type: 'numeral',
//   name,
//   message: `enter ${name}`,
//   format,
//   validate: (val, state) => {
//     if (val >= min && val <= max) {
//       return true
//     } else {
//       state.value = ''
//       return `rate must be between ${min}-${max}`
//     }
//   }
// })
export const percentInput = (name, min = 0, max = 1) => prompt({
  type: 'numeral',
  name,
  message: `enter ${name}`,
  format: (val) => val.toLocaleString('en-US', { style: 'percent' }),
  validate: (val, state) => {
    val = Number(`.${val}`)
    if (val >= min && val <= max) {
      state.value = val
      return true
    } else {
      state.value = ''
      return `rate must be between ${min * 100}-${max * 100}`
    }
  }
})

const formatCurrency = (n, currency = 'USD') => n.toLocaleString('en-US',
  { style: 'currency', currency })

export const currencyInput = (name, { min, max }) => prompt({
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

export const stringInput = (name) => prompt({ type: 'input', name, message: `enter ${name}` })
export const dateInput = async (name) => {
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
    choices: Array.from({ length: dayjs(`${month}-01`, 'MMMM-DD').daysInMonth() })
      .map((_, i) => ({ name: i + 1, value: i + 1 }))
  })
  return { month, day }
}

// module.exports = { percentInput, currencyInput, stringInput, dateInput }
