const { log, error, clear } = console
clear()

const {
  percentInput,
  currencyInput,
  stringInput,
  dateInput
} = require('./prompts')

async function main () {
  const { rate } = await percentInput('rate')
  const { salary } = await currencyInput('salary',
    { min: 1_000, max: 9_000_000 }
  )
  const { firstname } = await stringInput('firstname')
  const { lastname } = await stringInput('lastname')

  const { day: startDay, month: startMonth } = await dateInput('start')
  const { day: endDay, month: endMonth } = await dateInput('end')

  log({ firstname, lastname, startMonth, startDay, endMonth, endDay, salary, rate })
}

main()
  .then(log)
  .catch(error)
