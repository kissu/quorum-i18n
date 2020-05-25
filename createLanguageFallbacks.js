const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs
const englishFallback = require('./merged-locales/web/en.json')

/* eslint-disable */
const webLanguagesVariants = [
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

//////////
//! meh à faire ca en dynamique
const constantizeIfTruthy = (...args) => [...args].filter(Boolean).join('-')

const defineUserLocales = (deviceLocale) => {
  let typeOfLocale = null
  let finalLocale = 'en'
  if (deviceLocale.match(/\w+/g).length === 1 || deviceLocale.match(/\w+/g).length === 3) {
    return {
      localeString: deviceLocale.match(/\w+/g)[0], //? fr >> fr OR zh-Hans-HK >> zh
      typeOfLocale: 'solo',
    }
  }
  if (deviceLocale.match(/\w+/g).length === 2) {
    return {
      localeString: deviceLocale.replace('-', '_'), //? en-GB >> en_GB
      typeOfLocale: 'duo',
    }
  }
  return {
    localeString: 'en',
    typeOfLocale: null,
  }
}

async function tryModuleAndReturnFile(locale = 'en', pack = '', platform = '') {
  if (!platform) throw new Error('No platform provided')
  const wantedFile = constantizeIfTruthy(locale, pack)
  try {
    const module = await require(`./merged-locales/${platform}/${wantedFile}.json`)
    return module
  } catch (err) {
    return false
  }
}

const setLocaleForTheUser = async (detectedLocale, localeSpecific, platform) => {
  /**
   * We want to get the locale formatted with
   * the defineUserLocales function
   */
  const localeFormatted = defineUserLocales(detectedLocale)

  switch (localeFormatted.typeOfLocale) {
    case null:
      return englishFallback

    case 'solo':
    case 'duo': {
      // locale: 'fr-BE' localeSpecific: 'ong-vert' -> 'ong'
      const firstAttempt = await tryModuleAndReturnFile(
        localeFormatted.localeString,
        localeSpecific,
        platform
      )
      if (firstAttempt) return firstAttempt
      /**
       * Second Attempt and downgrade the localeSpecific
       * For example : ong-vert -> ong ou ong -> ''
       */
      // locale: 'fr-BE' localeSpecific: 'ong' -> ''
      const firstDowngradeLocaleSpecific = localeSpecific.replace(/-?[A-Za-z]+$/, '')
      const secondAttempt = await tryModuleAndReturnFile(
        localeFormatted.localeString,
        firstDowngradeLocaleSpecific,
        platform
      )
      if (secondAttempt) return secondAttempt
      /**
       * Third attempt and downgrade the locale
       * and delete the localeSpecific ong ou '' -> ''
       */
      // locale: 'fr-BE' localeSpecific: '' -> ''
      const thirdAttempt = await tryModuleAndReturnFile(localeFormatted.localeString, '', platform)
      if (thirdAttempt) return thirdAttempt

      /**
       * Now we downgrade the locale
       */
      const downgradeLocaleString = localeFormatted.localeString.replace(/[-_]?[A-Za-z]+$/, '')
      const fourthAttempt = await tryModuleAndReturnFile(downgradeLocaleString, '', platform)
      if (fourthAttempt) return fourthAttempt

      /**
       * We did not find any language and we fallback
       * on the english.
       */
      return englishFallback
    }

    default:
      throw new Error(`The platform '${platform}' is not recognised by quorum-i18n.`)
  }
}

// if (!localeFormatted.typeOfLocale) {
//   return englishFallback
// } else {
//   if (userDashLocale) {
//     //? in case we do have an fr-BE or a en-GB (en_GB)
//     try {
//       module = await import(
//         /* webpackChunkName: "import dashLocale" */
//         `./merged-locales/web/en-${constantizeIfTruthy(userDashLocale, localeSpecific)}.json`
//       )
//       return module
//       // i18n.setLocaleMessage(constantizeIfTruthy(userDashLocale, localeSpecific), module)
//       // i18n.locale = constantizeIfTruthy(userDashLocale, localeSpecific)
//     } catch {
//       //? case we don't, try the first part aka fr and en
//       userCurrentLocale = detectedLocale.match(/\w+/g)[0].replace(/^en-/, '')
//       if (userCurrentLocale === 'en') {
//         module = englishFallback
//       } else {
//         module = await import(
//           /* webpackChunkName: "import locale" */
//           `./merged-locales/web/en-${constantizeIfTruthy(userCurrentLocale, localeSpecific)}.json`
//         )
//       }
//       // i18n.setLocaleMessage(constantizeIfTruthy(userCurrentLocale, localeSpecific), module)
//       // i18n.locale = constantizeIfTruthy(userCurrentLocale, localeSpecific)
//     }
//   } else {
//     //? case we do have a fr, en, ar (arabic) or alike
//     try {
//       module = await import(
//         /* webpackChunkName: "import locale" */
//         `./merged-locales/web/en-${constantizeIfTruthy(userCurrentLocale, localeSpecific)}.json`
//       )
//       // i18n.setLocaleMessage(constantizeIfTruthy(userCurrentLocale, localeSpecific), module)
//       // i18n.locale = constantizeIfTruthy(userCurrentLocale, localeSpecific)
//     } catch {
//       //? in case we really do have nothing, final fallback
//       module = await import(
//         /* webpackChunkName: "import locale" */
//         `./merged-locales/web/${constantizeIfTruthy('en', localeSpecific)}.json`
//       )
//       // i18n.setLocaleMessage(constantizeIfTruthy('en', localeSpecific), module)
//       // i18n.locale = constantizeIfTruthy('en', localeSpecific)
//     }
//   }
// }

//? when receiving from the back
// const defineLocaleSpecific = (localeSpecificFromBack) => {
//   if (localeSpecificFromBack) {
//     localeSpecific = localeSpecificFromBack
//     return setLocaleForTheUser(constantizeIfTruthy(userCurrentLocale))
//   }
//   localeSpecific = null
// }

/**
 * @async
 * @func getJSONLanguageForApplications
 * @param {string} deviceLocale
 * @param {string} localeSpecific
 * @param {string} platform
 * @desc This function will try to resolve json availables
 * for the different platforms to helps front end applications
 * to have the right language depends on locale pack and platform
 */
async function getJSONLanguageForApplications(deviceLocale = 'en', localeSpecific, platform = 'web') {
  console.log(JSON.parse(JSON.stringify({ deviceLocale, localeSpecific, platform })))
  switch (platform) {
    case 'web':
    case 'mobile': {
      return await setLocaleForTheUser(deviceLocale, localeSpecific, platform)
    }

    default:
      throw new Error(`The platform '${platform}' is not recognised by quorum-i18n.`)
  }
}

const detectedLocale = 'CZ-Hans-HK'
const localeSpecific = ''
const platform = 'web'

async function Test() {
  const jsonWanted = await getJSONLanguageForApplications(detectedLocale, localeSpecific, platform)
  console.log(jsonWanted.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
}

Test()
