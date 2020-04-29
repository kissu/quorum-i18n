const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs

/* eslint-disable */
const allLanguagesVariants = [
  ['fr'],
  ['fr', 'canadian'],
  ['fr', 'canadian', 'chelou'],
  ['canadian', 'chelou'],
  ['canadian', 'chelou', 'meme'],
  ['canadian', 'meme', 'chelou'],
  ['en'],
  ['en', 'gb']
]
/* eslint-enable */

const jsonFileName = (languageFallbackList) =>
  `./merged-locales/${languageFallbackList.map((lang) => lang.slice(0, 4)).join('-')}.json`
const importFile = (lang) => require(`./initial-locales/${lang}.json`)

for (const languageVariants of allLanguagesVariants) {
  const importedLanguageLocaleToMerge = languageVariants.reduce((accumulator, currentValue) => {
    accumulator.push(importFile(currentValue))
    return accumulator
  }, [])
  let mergedJson = deepExtend(...importedLanguageLocaleToMerge)
  fs.outputJsonSync(jsonFileName(languageVariants), mergedJson)
}
