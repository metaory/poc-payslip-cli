const { log, error, table, clear } = console
clear()

const {
  percentInput,
  currencyInput,
  stringInput,
  dateInput
} = require('./prompts')

const calculate = require('./calculate')

const print = (obj) => {
  if (process.argv[2] === '--table') table({ obj })

  log(Object.keys(obj).join(', '))
  log(Object.values(obj).join(', '))
}

async function main() {
  const { firstname } = await stringInput('firstname')
  const { lastname } = await stringInput('lastname')

  const { rate } = await percentInput('rate')
  const { salary } = await currencyInput('salary', 1_000, 9_000_000)

  const { day: startDay, month: startMonth } = await dateInput('start')
  const { day: endDay, month: endMonth } = await dateInput('end')

  const outcome = calculate({
    firstname,
    lastname,
    startMonth,
    startDay,
    endMonth,
    endDay,
    salary,
    rate
  })

  print(outcome)
}

main()
  .then(log)
  .catch(error)

/*
*

first-name, last-name, annual-salary, super-rate (%), payment-start-date
Andrew, Smith, 60_050, 9%,   01 March – 31 March
Claire, Wong, 120_000, 10% , 01 March – 31 March

name , pay-period          , gross , tax  , net  , super
A S  , 01 March – 31 March , 5004  , 922  , 4082 , 450
C W  , 01 March – 31 March , 10000 , 2696 , 7304 , 1000
*/
