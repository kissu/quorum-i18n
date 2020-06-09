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
  finalAvailableLocale = constantizeIfTruthy(locale, localeSpecific)
  try {
    module = await import(`../initial-locales/${platform}/${wantedFile}`)
    return module.default
  } catch (error) {
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
let finalArray = []
async function downgradeAndSearchFilesForLanguage(locale, localeSpecific, platform) {
  const attemptFileFound = await tryModuleAndReturnFile(locale, localeSpecific, platform)
  // if (attemptFileFound) return attemptFileFound
  console.log('|||', locale, localeSpecific)
  console.log('attempt', attemptFileFound?.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST)
  if (attemptFileFound) finalArray.unshift(attemptFileFound)
  console.log('ls', localeSpecific)
  if (!localeSpecific) return finalArray
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
  // if (deviceLocale.includes(' ') || localeSpecific.includes(' '))
  //   throw new Error("The device locale or specific shouldn't have a space string.")
  switch (platform) {
    case 'web':
    case 'mobile': {
      await setLocaleForTheUser(deviceLocale, localeSpecific, platform)
      console.log(
        'to merge',
        finalArray?.[0]?.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST,
        finalArray?.[1]?.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST,
        finalArray?.[2]?.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST
      )
      const fallbackedJsons = deepExtend(...cloneDeep(finalArray))
      console.log('merged final array', fallbackedJsons?.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST)
      return {
        content: fallbackedJsons,
        path: finalAvailableLocale,
      }
    }

    default:
      throw new Error(`The platform '${platform || ''}' is not recognised by quorum-i18n.`)
  }
}
