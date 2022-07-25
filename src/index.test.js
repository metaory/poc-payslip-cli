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

test('120_000 case', () => {
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
  expect(outcome.tax).toBe(2669) // XXX
  expect(outcome.net).toBe(7331) // XXX
  expect(outcome.superAmount).toBe(1000)
})

/**************************************************************************
 first-name, last-name, annual-salary, super-rate (%), payment-start-date *
 Andrew, Smith, 60_050, 9%,   01 March – 31 March                         *
 Claire, Wong, 120_000, 10% , 01 March – 31 March                         *
 .........................................................................*
 name , pay-period          , gross , tax  , net  , super                 *
 A S  , 01 March – 31 March , 5004  , 922  , 4082 , 450                   *
 C W  , 01 March – 31 March , 10000 , 2670 , 7330 , 1000                  *
**************************************************************************/
