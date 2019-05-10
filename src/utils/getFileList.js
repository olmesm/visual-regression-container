const fs = require('fs')

const { OUTPUT_EXTENSION } = require('../../config/config.json')

const onlyExtensions = file => file.substr(-OUTPUT_EXTENSION.length) === OUTPUT_EXTENSION

const getFileList = filePath => fs.readdirSync(filePath).filter(onlyExtensions)

exports.getFileList = getFileList
