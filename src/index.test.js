const calculate = require('./calculate')

test('60_050 case', () => {
  const outcome = calculate({
    firstname: 'foo',
    lastname: 'bar',
    startMonth: 'March',
    startDay: 1,
    endMonth: 'March',
    endDay: 31,
    salary: 60_050,
    rate: 0.09
  })
  console.table({ outcome })
  expect(outcome.gross).toBe(5004)
  expect(outcome.tax).toBe(922)
  expect(outcome.net).toBe(4082)
  expect(outcome.superAmount).toBe(450)
})

console.log('-------------')

test('60_050 case', () => {
  const outcome = calculate({
    firstname: 'foo',
    lastname: 'bar',
    startMonth: 'March',
    startDay: 1,
    endMonth: 'March',
    endDay: 31,
    salary: 120_000,
    rate: 0.10
  })
  console.table({ outcome })
  expect(outcome.gross).toBe(10000)
  // expect(outcome.tax).toBe(2696)
  // expect(outcome.net).toBe(7304)
  expect(outcome.superAmount).toBe(1000)
})

