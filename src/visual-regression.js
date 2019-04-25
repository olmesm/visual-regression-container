const fs = require('fs')

const BlinkDiff = require('blink-diff')

const {
  OUTPUT_EXTENSION,
  PATH_CHALLENGER,
  PATH_CHAMPION,
  PATH_DIFF
} = require('../config/config.json')

const outputExtensionLength = OUTPUT_EXTENSION.length

const passesVisualRegression = (imageFileName) => {
  const diff = new BlinkDiff({
    imageAPath: `${PATH_CHAMPION}/${imageFileName}`,
    imageBPath: `${PATH_CHALLENGER}/${imageFileName}`,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    imageOutputPath: `${PATH_DIFF}/${imageFileName}`,
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

const onlyExtensions = f => f.substr(-outputExtensionLength) === OUTPUT_EXTENSION

const runVisualRegression = () => {
  const visualRegressionPromises = []
  const failedFiles = []
  const championImages = fs.readdirSync(PATH_CHAMPION)
    .filter(onlyExtensions)

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
