const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs

/* eslint-disable */
const allLanguagesVariants = [
  ['en'],
  ['en', 'ong'],
  ['en', 'ong', 'vert'],
  ['en', 'pltk'],
  ['en', 'pltk', 'larm'],

  ['en', 'en_GB'],
  ['en', 'en_GB', 'ong'],
  ['en', 'en_GB', 'ong', 'vert'],
  ['en', 'en_GB', 'pltk'],
  ['en', 'en_GB', 'pltk', 'larm'],

  ['en', 'fr'],
  ['en', 'fr', 'ong'],
  ['en', 'fr', 'ong', 'vert'],
  ['en', 'fr', 'pltk'],
  ['en', 'fr', 'pltk', 'larm'],
]
/* eslint-enable */

const jsonFileName = (languageFallbackList) =>
  `./merged-locales/${languageFallbackList.map((lang) => lang.match(/\w+/gi)[0]).join('-')}.json`
const importFile = (lang) => require(`./initial-locales/${lang}.json`)

for (const languageVariants of allLanguagesVariants) {
  const importedLanguageLocaleToMerge = languageVariants.reduce((accumulator, currentValue) => {
    accumulator.push(importFile(currentValue))
    return accumulator
  }, [])
  let mergedJson = deepExtend(...importedLanguageLocaleToMerge)
  fs.outputJsonSync(jsonFileName(languageVariants), mergedJson)
}
