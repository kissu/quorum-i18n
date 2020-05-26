const constantizeIfTruthy = (...args) => [...args].filter(Boolean).join('-');

const defineUserLocales = deviceLocale => {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_');
  return 'en';
};

async function tryModuleAndReturnFile(locale = 'en', pack = '', platform = '') {
  if (!platform) throw new Error('No platform provided');
  const wantedFile = constantizeIfTruthy(locale, pack);

  try {
    const module = await import(`./merged-locales/${platform}/${wantedFile}.json`);
    return module.default;
  } catch (err) {
    return false;
  }
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
    return await tryModuleAndReturnFile('en', '', platform);
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

var Test = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var jsonWanted;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getJSONLanguageForApplications(detectedLocale, localeSpecific, platform);

          case 2:
            jsonWanted = _context5.sent;

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function Test() {
    return _ref5.apply(this, arguments);
  };
}();

export async function getJSONLanguageForApplications(deviceLocale = 'en', localeSpecific = null, platform = 'web') {
  switch (platform) {
    case 'web':
    case 'mobile':
      {
        return await setLocaleForTheUser(deviceLocale, localeSpecific, platform);
      }

    default:
      throw new Error(`The platform '${platform}' is not recognised by quorum-i18n.`);
  }
} // const detectedLocale = 'fr'
// const localeSpecific = 'politique-larem'
// const platform = 'web'
// async function Test() {
//   const jsonWanted = await getJSONLanguageForApplications(detectedLocale, localeSpecific, platform)
//   console.log(jsonWanted.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
// }
// Test()
// ;(async () => {
//   const x = 'fr-politique-larem'
//   const module = await import(`./merged-locales/web/${x}.json`)
//   console.log(module.default.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
// })()
// import jsonData from './merged-locales/web/fr.json'
// console.log(jsonData.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
