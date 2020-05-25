const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs

/* eslint-disable */
const webLanguagesVariants = [
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

const webJsonFileName = (languageFallbackList) =>
  `./merged-locales/web/${languageFallbackList.map((lang) => lang.match(/\w+/gi)[0]).join('-')}.json`
const importWebFile = (lang) => require(`./initial-locales/web/${lang}.json`)

for (const languageVariants of webLanguagesVariants) {
  const importedLanguageLocaleToMerge = languageVariants.reduce((accumulator, currentValue) => {
    accumulator.push(importWebFile(currentValue))
    return accumulator
  }, [])
  let mergedJson = deepExtend(...importedLanguageLocaleToMerge)
  fs.outputJsonSync(webJsonFileName(languageVariants), mergedJson)
}

/* eslint-disable */
const mobileLanguagesVariants = [
  ['en_EN'],
  ['en_EN', 'ar_AR'],
  ['en_EN', 'fr_FR'],
  ['en_EN', 'sk_SK'],
]
/* eslint-enable */

const mobileJsonFileName = (languageFallbackList) =>
  `./merged-locales/mobile/${languageFallbackList.map((lang) => lang.match(/\w+/gi)[0]).join('-')}.json`
const importMobileFile = (lang) => require(`./initial-locales/mobile/${lang}.json`)

for (const languageVariants of mobileLanguagesVariants) {
  const importedLanguageLocaleToMerge = languageVariants.reduce((accumulator, currentValue) => {
    accumulator.push(importMobileFile(currentValue))
    return accumulator
  }, [])
  let mergedJson = deepExtend(...importedLanguageLocaleToMerge)
  fs.outputJsonSync(mobileJsonFileName(languageVariants), mergedJson)
}
