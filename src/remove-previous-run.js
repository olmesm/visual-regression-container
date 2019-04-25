const fs = require('fs')
const rimrafSync = require('rimraf').sync

exports.removePreviousRun = filePath => {
  rimrafSync(filePath)
  fs.mkdirSync(filePath)
}
