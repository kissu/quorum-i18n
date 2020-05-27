"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSONLanguageForApplications = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const constantizeIfTruthy = (...args) => [...args].filter(Boolean).join('-');

const defineUserLocales = deviceLocale => {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_');
  return 'en';
};

let finalAvailableLocale;

async function tryModuleAndReturnFile(locale = 'en', localeSpecific = null, platform = 'web') {
  if (!platform) throw new Error('No platform provided');
  const wantedFile = constantizeIfTruthy(locale, localeSpecific);

  try {
    finalAvailableLocale = constantizeIfTruthy(locale, localeSpecific);
    const module = await Promise.resolve(`./merged-locales/${platform}/${wantedFile}.json`).then(s => _interopRequireWildcard(require(s))).catch(void 0);
    if (module) return module.default;
  } catch (e) {}
}

function downgradeMyLocaleSpecific(localeSpecific) {
  if (localeSpecific === '') return localeSpecific;
  return localeSpecific.replace(/-?[A-Za-z]+$/, '');
}

function downgradeMyLocaleString(locale) {
  if (locale === '') return locale;
  return locale.replace(/[-_]?[A-Za-z]+$/, '');
}
/**
 * @func downgradeAndSearchFilesForLanguage
 * @reccursive
 * Downgrade d'abord la locale specific : 'politique-larem' => 'politique' -> '' -> false
 * Downgrade ensuite la locale : 'fr_FR' -> 'fr' -> '' -> false
 */


async function downgradeAndSearchFilesForLanguage(locale, localeSpecific, platform) {
  const attemptFileFound = await tryModuleAndReturnFile(locale, localeSpecific, platform);
  if (attemptFileFound) return attemptFileFound;
  /**
   *
   */

  let futurLocaleString = '';
  let futurLocaleSpecific = '';
  if (localeSpecific) futurLocaleSpecific = downgradeMyLocaleSpecific(localeSpecific); //

  if (futurLocaleSpecific === '') {
    if (futurLocaleSpecific === localeSpecific) {
      futurLocaleString = downgradeMyLocaleString(locale);
    } else {
      futurLocaleString = locale;
    }
  } else {
    futurLocaleString = locale;
  }
  /**
   * If my locales are empty, I didn't find a solution and return the english
   */


  if (!futurLocaleString && !futurLocaleSpecific) {
    return await tryModuleAndReturnFile('en', null, platform);
  }
  /**
   * downgradeAndSearchFilesForLanguage again because we not found the file
   */


  return downgradeAndSearchFilesForLanguage(futurLocaleString, futurLocaleSpecific, platform);
}
/**
 * @func setLocaleForTheUser
 */


async function setLocaleForTheUser(detectedLocale, localeSpecific, platform) {
  /**
   * We want to get the locale formatted with
   * the defineUserLocales function
   */
  const localeFormatted = defineUserLocales(detectedLocale);
  return await downgradeAndSearchFilesForLanguage(localeFormatted, localeSpecific, platform);
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


const getJSONLanguageForApplications = async (deviceLocale = 'en', localeSpecific = null, platform = 'web') => {
  switch (platform) {
    case 'web':
    case 'mobile':
      {
        return {
          content: await setLocaleForTheUser(deviceLocale, localeSpecific, platform),
          path: finalAvailableLocale
        };
      }

    default:
      throw new Error(`The platform '${platform || ''}' is not recognised by quorum-i18n.`);
  }
};

exports.getJSONLanguageForApplications = getJSONLanguageForApplications;