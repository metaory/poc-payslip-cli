
const calculate = require('./calculate')

const outcome_1 = calculate({
  firstname: 'foo',
  lastname: 'bar',
  startMonth: 'March',
  startDay: 1,
  endMonth: 'March',
  endDay: 31,
  salary: 60_050,
  rate: 0.09
})
console.table({ outcome_1 })

console.log('------------------------------------------')

// const outcome_2 = calculate({
//   firstname: 'foo',
//   lastname: 'bar',
//   startMonth: 'March',
//   startDay: 1,
//   endMonth: 'March',
//   endDay: 31,
//   salary: 120_000,
//   rate: 0.10
// })
// console.table({ outcome_2 })
