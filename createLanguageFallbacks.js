const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs
const cloneDeep = require('lodash/cloneDeep')

;(function () {
  const input = require('./input.json')
  const input2 = require('./initial-locales/web/en.json')
  const output = deepExtend(input, input2)
  fs.outputJsonSync('./output.json', output)
})()

// const platformLocales = [
//   {
//     path: 'web',
//     variants: [
//       ['en'],
//       ['en', 'ong'],
//       ['en', 'ong', 'vert'],

//       ['en_GB'],
//       ['en_GB', 'ong'],
//       ['en_GB', 'ong', 'vert'],

//       ['fr'],
//       ['fr', 'mediation'],
//       ['fr', 'mediation', 'promevil'],
//       ['fr', 'politique'],
//       ['fr', 'politique', 'larem'],
//     ],
//   },
//   {
//     path: 'mobile',
//     variants: [['en'], ['fr'], ['fr', 'mediation', 'promevil'], ['sk'], ['ar']],
//   },
// ]

// ;(async () => {
//   for (const platformLocale of platformLocales) {
//     const jsonFileName = (languageFallbackList) =>
//       `./merged-locales/${platformLocale.path}/${languageFallbackList
//         .map((lang) => lang.match(/\w+/gi)[0])
//         .join('-')}.json`

//     const importFile = async (localeVariant) => {
//       try {
//         return await require(`./initial-locales/${platformLocale.path}/${localeVariant}.json`)
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     ;(async () => {
//       for (const arrayOfLocales of platformLocale.variants) {
//         const importedLanguageLocaleToMerge = []
//         for (const locale of arrayOfLocales) {
//           const module = await importFile(locale)
//           importedLanguageLocaleToMerge.push(module)
//         }
//         const mergedJson = deepExtend(...cloneDeep(importedLanguageLocaleToMerge))
//         fs.outputJsonSync(jsonFileName(arrayOfLocales), mergedJson)
//       }
//     })()
//   }
// })()
