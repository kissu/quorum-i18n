import * as MobileTranslates from '../merged-locales/mobile'
import * as WebTranslates from '../merged-locales/web'

const constantizeIfTruthy = (...args) => [...args].filter(Boolean).join('-')

const defineUserLocales = (deviceLocale) => {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_')
  return 'en'
}

let finalAvailableLocale
async function tryModuleAndReturnFile(locale = 'en', localeSpecific = null, platform = 'web') {
  if (!platform) throw new Error('No platform provided')
  const wantedFile = constantizeIfTruthy(locale, localeSpecific)
  finalAvailableLocale = constantizeIfTruthy(locale, localeSpecific)
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

function downgradeMyLocaleSpecific(localeSpecific) {
  if (localeSpecific === '') return localeSpecific
  return localeSpecific.replace(/-?[A-Za-z]+$/, '')
}

function downgradeMyLocaleString(locale) {
  if (locale === '') return locale
  return locale.replace(/[-_]?[A-Za-z]+$/, '')
}

/**
 * @func downgradeAndSearchFilesForLanguage
 * @reccursive
 * Downgrade d'abord la locale specific : 'politique-larem' => 'politique' -> '' -> false
 * Downgrade ensuite la locale : 'fr_FR' -> 'fr' -> '' -> false
 */
async function downgradeAndSearchFilesForLanguage(locale, localeSpecific, platform) {
  const attemptFileFound = await tryModuleAndReturnFile(locale, localeSpecific, platform)
  if (attemptFileFound) return attemptFileFound
  /**
   *
   */
  let futureLocaleString = ''
  let futureLocaleSpecific = ''

  //
  if (locale.match(/[a-z]+/gi).length > 1) {
    futureLocaleString = downgradeMyLocaleString(locale)
    futureLocaleSpecific = localeSpecific
  } else {
    if (localeSpecific) {
      futureLocaleSpecific = downgradeMyLocaleSpecific(localeSpecific)
      futureLocaleString = locale
    }
  }

  /**
   * If my locales are empty, I didn't find a solution and return the english
   */
  if (!futureLocaleString && !futureLocaleSpecific) {
    return await tryModuleAndReturnFile('en', null, platform)
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
  const localeFormatted = defineUserLocales(detectedLocale)
  return await downgradeAndSearchFilesForLanguage(localeFormatted, localeSpecific, platform)
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
  return 'this-is-working-great'
  switch (platform) {
    case 'web':
    case 'mobile': {
      return {
        content: await setLocaleForTheUser(deviceLocale, localeSpecific, platform),
        path: finalAvailableLocale,
      }
    }

    default:
      throw new Error(`The platform '${platform || ''}' is not recognised by quorum-i18n.`)
  }
}
