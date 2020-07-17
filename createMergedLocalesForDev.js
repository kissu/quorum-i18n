const fs = require('fs-extra') // beter file creation
const merge = require('lodash/merge')
const cloneDeep = require('lodash/cloneDeep')

const helperManualJsonMerge = () => {
  // in case we had an issue, how to quickly merge all the stuff
  // take the wished input file, update the initial-locale to merge with and run
  const input = require('./initial-locales/web/en.json')
  const input2 = require('./input.json')
  const output = merge(input, input2) // the order may change here, depending of the direction of the merge
  fs.outputJsonSync('./output.json', output)
}
// helperManualJsonMerge()

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
      ['fr', 'fr-elu'],
    ],
  },
  {
    path: 'mobile',
    variants: [['en'], ['fr'], ['fr', 'fr-mediation', 'fr-mediation-promevil'], ['sk'], ['ar']],
  },
]

const mergedLocales = async () => {
  for (const platformLocale of platformLocales) {
    const jsonFileName = (name) => `./merged-locales/${platformLocale.path}/${name}.json`

    const importFile = async (localeVariant) => {
      try {
        return await require(`./initial-locales/${platformLocale.path}/${localeVariant}.json`)
      } catch (err) {
        console.log(err)
      }
    }

    const cloneDeepGeneration = async () => {
      for (const arrayOfLocales of platformLocale.variants) {
        const importedLanguageLocaleToMerge = []
        for (const locale of arrayOfLocales) {
          const module = await importFile(locale)
          importedLanguageLocaleToMerge.push(module)
        }
        const mergedJson = merge(...cloneDeep(importedLanguageLocaleToMerge))
        fs.outputJsonSync(jsonFileName(arrayOfLocales[arrayOfLocales.length - 1]), mergedJson)
      }
    }
    cloneDeepGeneration()
  }
}
mergedLocales()
