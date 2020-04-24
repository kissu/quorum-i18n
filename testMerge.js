// beter file creation
const fs = require('fs-extra')
// merge various JSONs
const deepExtend = require('deep-extend')

// const first = require('./initial-locales/en.json')
const fr = require('./initial-locales/fr.json')
const canadian = require('./initial-locales/canadian.json')

let mergedJsons = deepExtend(fr, canadian)

fs.outputJsonSync('./merged-locales/message2.json', mergedJsons)
