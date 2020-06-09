const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs
const cloneDeep = require('lodash/cloneDeep')

// ;(function () { // in case we had an issue, how to quickly merge all the stuff
//   const input = require('./input.json')
//   const input2 = require('./initial-locales/web/en.json')
//   const output = deepExtend(input, input2)
//   fs.outputJsonSync('./output.json', output)
// })()

// this is meh.. but it will stay like that for the moment but not worth it
const platformLocales = [
  {
    path: 'web',
    variants: [
      ['en'],
      ['en', 'en-ong'],
      ['en', 'en-ong', 'en-ong-vert'],

      ['en_GB'],
      ['en_GB', 'en_GB-mediation-promevil'],

      ['fr'],
      ['fr', 'fr-mediation'],
      ['fr', 'fr-mediation', 'fr-mediation-promevil'],
      ['fr', 'fr-politique'],
      ['fr', 'fr-politique', 'fr-politique-larem'],
    ],
  },
  {
    path: 'mobile',
    variants: [['en'], ['fr'], ['fr', 'fr-mediation', 'fr-mediation-promevil'], ['sk'], ['ar']],
  },
]

;(async () => {
  for (const platformLocale of platformLocales) {
    const jsonFileName = (name) => `./merged-locales/${platformLocale.path}/${name}.json`

    const importFile = async (localeVariant) => {
      try {
        return await require(`./initial-locales/${platformLocale.path}/${localeVariant}.json`)
      } catch (err) {
        console.log(err)
      }
    }

    ;(async () => {
      for (const arrayOfLocales of platformLocale.variants) {
        const importedLanguageLocaleToMerge = []
        for (const locale of arrayOfLocales) {
          const module = await importFile(locale)
          importedLanguageLocaleToMerge.push(module)
        }
        const mergedJson = deepExtend(...cloneDeep(importedLanguageLocaleToMerge))
        fs.outputJsonSync(jsonFileName(arrayOfLocales[arrayOfLocales.length - 1]), mergedJson)
      }
    })()
  }
})()
