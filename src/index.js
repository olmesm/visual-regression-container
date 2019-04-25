const { removePreviousRun } = require('./remove-previous-run')
const { puppet } = require('./puppet')
const { runVisualRegression } = require('./visual-regression.js')

const { PATH_CHALLENGER, PATH_DIFF } = require('../config/config.json')

const run = async () => {
  try {
    await removePreviousRun(PATH_CHALLENGER)
    await removePreviousRun(PATH_DIFF)

    await puppet()
    await runVisualRegression()
  } catch (e) { console.log(e) }
}

run()
