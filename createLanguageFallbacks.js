const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs

/* eslint-disable */
const allLanguagesVariants = [
  ['en'],
  ['en', 'ong'],
  ['en', 'ong', 'vert'],

  ['en', 'en_GB'],
  ['en', 'en_GB', 'ong'],
  ['en', 'en_GB', 'ong', 'vert'],

  ['en', 'fr'],
  ['en', 'fr', 'mediation'],
  ['en', 'fr', 'mediation', 'promevil'],
  ['en', 'fr', 'politique'],
  ['en', 'fr', 'politique', 'larem'],
]
/* eslint-enable */

const jsonFileName = (languageFallbackList) =>
  `./merged-locales/web/${languageFallbackList.map((lang) => lang.match(/\w+/gi)[0]).join('-')}.json`
const importFile = (lang) => require(`./initial-locales/web/${lang}.json`)

for (const languageVariants of allLanguagesVariants) {
  const importedLanguageLocaleToMerge = languageVariants.reduce((accumulator, currentValue) => {
    accumulator.push(importFile(currentValue))
    return accumulator
  }, [])
  let mergedJson = deepExtend(...importedLanguageLocaleToMerge)
  fs.outputJsonSync(jsonFileName(languageVariants), mergedJson)
}
