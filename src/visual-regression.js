const fs = require('fs')

const BlinkDiff = require('blink-diff')
const FILE_DS_STORE = '.DS_Store'
const championPath = 'screenshots/champion'
const challengerPath = 'screenshots/challenger'
const diffPath = 'screenshots/diff'

function passesVisualRegression (imageFileName) {
  const diff = new BlinkDiff({
    imageAPath: `${championPath}/${imageFileName}`,
    imageBPath: `${challengerPath}/${imageFileName}`,
    imageOutputPath: `${diffPath}/${imageFileName}`,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0
  })

  return new Promise(
    (resolve, reject) =>
      diff.run((error, result) => {
        if (error) {
          return reject(error)
        }

        if (diff.hasPassed(result.code)) {
          return resolve({ passed: true })
        }

        return resolve({ passed: false, imageFileName })
      })
  )
}

function runVisualRegression () {
  const championImages = fs.readdirSync(championPath).filter(f => f !== FILE_DS_STORE)
  const visualRegressionPromises = []
  const failedFiles = []

  championImages.forEach(imageFileName => {
    visualRegressionPromises.push(passesVisualRegression(imageFileName))
  })

  Promise.all(visualRegressionPromises)
    .then(values => {
      values.forEach(value => {
        if (value.passed === false) {
          failedFiles.push(value.imageFileName)
        }
      })

      if (failedFiles.length > 0) {
        const failedFilesString = `\n - ${failedFiles.join('\n')}\n`

        throw new Error(
          `The following files have failed visual regression: ${failedFilesString}
          If you wish to accept these changes please run:
          npm run test:vr-approve`
        )
      }

      console.log('Visual regression has passed.')
    })
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
}

exports.runVisualRegression = runVisualRegression
