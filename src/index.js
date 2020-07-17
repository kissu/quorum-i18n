import * as MobileTranslates from '../initial-locales/mobile'
import * as WebTranslates from '../initial-locales/web' // merge various JSONs
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import forIn from 'lodash/forIn'

const constantizeIfTruthy = (...args) => [...args].filter(Boolean).join('-')

const defineUserLocales = (deviceLocale) => {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_')
  return 'en'
}

let finalAvailableLocale
function tryModuleAndReturnFile(locale = 'en', localeSpecific = null, platform = 'web') {
  const wantedFile = constantizeIfTruthy(locale, localeSpecific)
  finalAvailableLocale = locale
  switch (platform) {
    case 'web':
      if (WebTranslates[wantedFile]) return WebTranslates[wantedFile]
      return false

    case 'mobile':
      if (MobileTranslates[wantedFile]) return MobileTranslates[wantedFile]
      return false

    default:
      return false
  }
}

function sanitizeLocale(string) {
  if (!string) return null
  //? I did not found a sanitizer like this online, so I did a custom one
  return string
    .trim() // remove space around the string
    .replace(/\d/g, '') // remove all the digits
    .replace(/\s/g, '-') // replace any space by a `-`
    .replace(/[^\w-_]/g, '') // match all BUT [word char + `-` and `-`], aka remove all "symbols"
    .replace(/[-_]{2,}/, '_') // dedupe all the `-` and `_` into clean unique `_`
}

function sanitizeLocaleSpecific(string) {
  if (!string) return null
  return string
    .trim() // remove space around the string
    .replace(/\d/g, '') // remove all the digits
    .replace(/[\s_]/g, '-') // replace any space or `_` by a `-`
    .replace(/[^\w-]/g, '') // match all BUT [word char + `-`], aka remove all "symbols"
    .replace(/(\W){2,}/, '$1') // dedupe all the `-` in case several are folowing each other
}

function downgradeMyLocaleString(locale) {
  if (locale === '') return locale
  return locale.replace(/[-_]?[a-z]+$/i, '')
}

function downgradeMyLocaleSpecific(localeSpecific) {
  if (localeSpecific === '') return localeSpecific
  return localeSpecific.replace(/-?[a-z]+$/i, '')
}

/**
 * @func downgradeAndSearchFilesForLanguage
 * @reccursive
 * Downgrade d'abord la locale specific : 'politique-larem' => 'politique' -> '' -> false
 * Downgrade ensuite la locale : 'fr_FR' -> 'fr' -> '' -> false
 */
let finalArray = []
function downgradeAndSearchFilesForLanguage(locale, localeSpecific, platform) {
  const attemptFileFound = tryModuleAndReturnFile(locale, localeSpecific, platform)
  if (attemptFileFound) {
    finalArray.unshift(attemptFileFound)
    if (!localeSpecific) {
      return finalArray
    }
  }

  let futureLocaleString = ''
  let futureLocaleSpecific = ''

  if (locale.match(/[a-z]+/gi).length > 1) {
    futureLocaleString = downgradeMyLocaleString(locale)
    futureLocaleSpecific = localeSpecific
  } else {
    if (localeSpecific) {
      futureLocaleSpecific = downgradeMyLocaleSpecific(localeSpecific)
      futureLocaleString = locale
    }

    /**
     * If my locales are empty, I didn't find a solution and return the english
     */

    if (!futureLocaleString && !futureLocaleSpecific) {
      const myLangFallBack = tryModuleAndReturnFile('en', null, platform)
      finalArray.unshift(myLangFallBack)
      return myLangFallBack
    }
  }

  /**
   * downgradeAndSearchFilesForLanguage again because we not found the file
   */
  return downgradeAndSearchFilesForLanguage(futureLocaleString, futureLocaleSpecific, platform)
}

/**
 * @func setLocaleForTheUser
 */
function setLocaleForTheUser(detectedLocale, localeSpecific, platform) {
  finalArray = [] // reset here or the next call to this function will be wrong
  /**
   * We want to get the locale formatted with
   * the defineUserLocales function
   */
  const localeFormatted = sanitizeLocale(defineUserLocales(detectedLocale))
  return downgradeAndSearchFilesForLanguage(localeFormatted, sanitizeLocaleSpecific(localeSpecific), platform)
}

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

export const getJSONLanguageForApplications = (
  deviceLocale = 'en',
  localeSpecific = null,
  platform = 'web',
) => {
  switch (platform) {
    case 'web':
    case 'mobile': {
      /**
       * Add a english fallback by default to avoid empty strings on new
       * basic languages like just few keys for a new lang.
       * All the languages are now based on english by default to avoid missing
       * translations on a new language.
       */
      const basicLanguage = setLocaleForTheUser('en', null, platform)
      setLocaleForTheUser(deviceLocale, localeSpecific, platform)
      let fallbackedJsons = merge(...cloneDeep(basicLanguage), ...cloneDeep(finalArray))
      finalArray = [] // reset here or the next call to this function will be wrong
      return {
        content: fallbackedJsons,
        path: finalAvailableLocale,
      }
    }

    default:
      throw new Error(`The platform '${platform || ''}' is not recognised by quorum-i18n.`)
  }
}

/**
 * @function getAllAvailableLocales
 * The purpose of this function is to given tools to know exactly what are the
 * languages availables in the apps. We can filter it by pack.
 */
export const getAllAvailableLocales = (platform = 'web', packageWanted = '') => {
  const allLanguages = []
  let packageLanguagesToUse
  switch (platform) {
    case 'web':
      packageLanguagesToUse = WebTranslates
      break

    case 'mobile':
      packageLanguagesToUse = MobileTranslates
      break

    default:
      break
  }

  if (packageLanguagesToUse) {
    if (!packageWanted) {
      forIn(packageLanguagesToUse, (value, key) => {
        if (!key.includes('-')) {
          if (value['XXX_TRANSLATION_LANGUAGE_NAME']) {
            allLanguages.push({
              key,
              languageName: value['XXX_TRANSLATION_LANGUAGE_NAME'],
            })
          }
        }
      })
    } else {
      forIn(packageLanguagesToUse, (value, key) => {
        if (key.includes(packageWanted)) {
          if (value['XXX_TRANSLATION_LANGUAGE_NAME']) {
            allLanguages.push({
              key,
              languageName: value['XXX_TRANSLATION_LANGUAGE_NAME'],
            })
          }
        }
      })
    }
  }

  return allLanguages
}
