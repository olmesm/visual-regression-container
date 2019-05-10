const path = require('path')

const chalk = require('chalk')

const { copyFiles } = require('./utils/copyFiles')
const { notEmpty } = require('./utils/notEmpty')
const { getUnique } = require('./utils/getUnique')
const { hyphenList } = require('./utils/hyphenList')
const { getFileList } = require('./utils/getFileList')
const { passesVisualRegression } = require('./utils/passesVisualRegression')

const {
  PATH_CHALLENGER,
  PATH_CHAMPION
} = require('../config/config.json')

const champions = getFileList(PATH_CHAMPION)
const challengers = getFileList(PATH_CHALLENGER)

const noChallengers = getUnique(champions, challengers)
const newChallengers = getUnique(challengers, champions)
const validChampions = getUnique(champions, noChallengers)

const listToDiff = Promise.all(validChampions.map(passesVisualRegression))

const runVisualRegression = async () => {
  try {
    const results = await listToDiff

    const failedList = results.filter(item => !item.passed)

    if (notEmpty(newChallengers)) {
      await Promise.all(newChallengers.map(challenger =>
        copyFiles(path.join(PATH_CHALLENGER, challenger), path.join(PATH_CHAMPION, challenger))
      ))

      console.log(
        chalk.green(
          `${chalk.bold('The following challengers did not exist and have been copied across:')}
          ${hyphenList(newChallengers)}\n`
        )
      )
    }

    if (notEmpty(noChallengers)) {
      console.log(
        chalk.yellow(
          `${chalk.bold('The following files did not have a corresponding challenger:')}
          ${hyphenList(noChallengers)}
          ${chalk.bold('\nConsider removing these files\n')}`
        )
      )
    }

    if (notEmpty(failedList)) {
      console.log(
        chalk.red(
          `${chalk.bold('The following files failed inspection:')}
          ${hyphenList(failedList.map(i => i.imageFileName))}\n`
        )
      )
    }

    if (!notEmpty(failedList)) {
      console.log(chalk.green('All passed!'))
    }
  } catch (err) {
    console.trace(err)
    process.exitCode = 1
  }
}

exports.runVisualRegression = runVisualRegression
