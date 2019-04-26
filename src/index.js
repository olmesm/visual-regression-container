const { removePreviousRun } = require('./remove-previous-run')
const { puppet } = require('./puppet')
const { runVisualRegression } = require('./visual-regression.js')

const { PATH_CHALLENGER, PATH_DIFF } = require('../config/config.json')
const URLS = require('../config/urls.json')

const run = async () => {
  try {
    await removePreviousRun(PATH_CHALLENGER)
    await removePreviousRun(PATH_DIFF)

    await puppet(URLS)
    await runVisualRegression()
  } catch (e) {
    console.trace(e)
    process.exit(1)
  }
}

run()
