const path = require('path')

const BlinkDiff = require('blink-diff')

const { PATH_CHALLENGER, PATH_CHAMPION, PATH_DIFF } = require('../../config/config.json')

const passesVisualRegression = (imageFileName) => {
  const diff = new BlinkDiff({
    imageAPath: path.join(PATH_CHAMPION, imageFileName),
    imageBPath: path.join(PATH_CHALLENGER, imageFileName),
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    imageOutputPath: path.join(PATH_DIFF, imageFileName),
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0
  })

  return new Promise((resolve, reject) => diff.run((error, result) => {
    if (error) {
      throw new Error(error)
    }

    if (diff.hasPassed(result.code)) {
      return resolve({ imageFileName, passed: true })
    }

    return resolve({ imageFileName, passed: false })
  }))
}

exports.passesVisualRegression = passesVisualRegression
