
const calculate = require('./calculate')

const outcome = calculate({
  firstname: 'foo',
  lastname: 'bar',
  startMonth: 'January',
  startDay: 1,
  endMonth: 'January',
  endDay: 31,
  salary: 60_050,
  rate: 0.09
})

console.table({ outcome })
