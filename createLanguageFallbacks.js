import fs from 'fs-extra' // beter file creation
import deepExtend from 'deep-extend' // merge various JSONs

const platformLocales = [
  {
    path: 'web',
    variants: [
      ['en'],
      ['en', 'ong'],
      ['en', 'ong', 'vert'],

      ['en_GB'],
      ['en_GB', 'ong'],
      ['en_GB', 'ong', 'vert'],

      ['fr'],
      ['fr', 'mediation'],
      ['fr', 'mediation', 'promevil'],
      ['fr', 'politique'],
      ['fr', 'politique', 'larem'],
    ],
  },
  {
    path: 'mobile',
    variants: [['en_EN'], ['en_EN', 'ar_AR'], ['en_EN', 'fr_FR'], ['en_EN', 'sk_SK']],
  },
]

;(async () => {
  for (const webLocale of platformLocales) {
    const jsonFileName = (languageFallbackList) =>
      `./merged-locales/${webLocale.path}/${languageFallbackList
        .map((lang) => lang.match(/\w+/gi)[0])
        .join('-')}.json`
    const importFile = async (localeVariant) =>
      await import(`./initial-locales/${webLocale.path}/${localeVariant}.json`)

    ;(async () => {
      for (const arrayOfLocales of webLocale.variants) {
        const importedLanguageLocaleToMerge = []
        for (const locale of arrayOfLocales) {
          const module = await importFile(locale)
          importedLanguageLocaleToMerge.push(module.default)
        }
        const mergedJson = deepExtend(...importedLanguageLocaleToMerge)
        fs.outputJsonSync(jsonFileName(arrayOfLocales), mergedJson)
      }
    })()
  }
})()
// ;(async () => {
//   const module = await import(`merged-locales/web/fr.json`)
//   console.log('hihi', module.default)
// })()
