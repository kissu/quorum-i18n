// beter file creation
const fs = require('fs-extra')
// merge various JSONs
const deepExtend = require('deep-extend')

const first = require('./initial-locales/en.json')
const second = require('./initial-locales/fr.json')

let mergedJsons = deepExtend(first, second)

fs.outputJsonSync('./merged-locales/message2.json', mergedJsons)
