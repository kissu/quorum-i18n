import * as MobileTranslates from '../initial-locales/mobile'
import * as WebTranslates from '../initial-locales/web'
import deepExtend from 'deep-extend' // merge various JSONs
import cloneDeep from 'lodash/cloneDeep'

const constantizeIfTruthy = (...args) => [...args].filter(Boolean).join('-')

const defineUserLocales = (deviceLocale) => {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_')
  return 'en'
}

let finalAvailableLocale
async function tryModuleAndReturnFile(locale = 'en', localeSpecific = null, platform = 'web') {
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
async function downgradeAndSearchFilesForLanguage(locale, localeSpecific, platform) {
  const attemptFileFound = await tryModuleAndReturnFile(locale, localeSpecific, platform)
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
      return await tryModuleAndReturnFile('en', null, platform)
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
async function setLocaleForTheUser(detectedLocale, localeSpecific, platform) {
  /**
   * We want to get the locale formatted with
   * the defineUserLocales function
   */
  const localeFormatted = sanitizeLocale(defineUserLocales(detectedLocale))
  return await downgradeAndSearchFilesForLanguage(
    localeFormatted,
    sanitizeLocaleSpecific(localeSpecific),
    platform
  )
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

export const getJSONLanguageForApplications = async (
  deviceLocale = 'en',
  localeSpecific = null,
  platform = 'web'
) => {
  switch (platform) {
    case 'web':
    case 'mobile': {
      await setLocaleForTheUser(deviceLocale, localeSpecific, platform)
      let fallbackedJsons = deepExtend(...cloneDeep(finalArray))
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
