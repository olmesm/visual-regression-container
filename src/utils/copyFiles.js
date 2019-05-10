const fs = require('fs')

const copyFiles = (src, dest) => new Promise((resolve, reject) => {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      return reject(err)
    }
    return resolve(true)
  })
})

exports.copyFiles = copyFiles
