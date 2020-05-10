import fs from 'fs-extra' // beter file creation
import deepExtend from 'deep-extend' // merge various JSONs
import { allLanguagesVariants } from './allLanguageVariants.js'

const jsonFileName = (languageFallbackList) =>
  `./merged-locales/${languageFallbackList.map((lang) => lang.slice(0, 4)).join('-')}.json`
const importFile = async (lang) => {
  const module = await import(`./initial-locales/${lang}.json`).catch((e) => console.log(e))
  console.log('nice', module)
  return module.default
}
// await import(`quorum-i18n/merged-locales/${locale}.json`)

for (const languageVariants of allLanguagesVariants) {
  const importedLanguageLocaleToMerge = languageVariants.reduce(async (accumulator, currentValue) => {
    accumulator.push(await importFile(currentValue))
    return accumulator
  }, [])
  let mergedJson = deepExtend(Array.from(importedLanguageLocaleToMerge))
  fs.outputJsonSync(jsonFileName(languageVariants), mergedJson)
}
