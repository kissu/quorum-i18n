'use strict';

var tryModuleAndReturnFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
    var pack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var wantedFile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (platform) {
              _context.next = 2;
              break;
            }

            throw new Error('No platform provided');

          case 2:
            wantedFile = constantizeIfTruthy(locale, pack);
            _context.prev = 3;
            return _context.abrupt('return', require('./merged-locales/' + platform + '/' + wantedFile + '.json'));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](3);
            return _context.abrupt('return', false);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 7]]);
  }));

  return function tryModuleAndReturnFile() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @func downgradeAndSearchFilesForLanguage
 * @reccursive
 * Downgrade d'abord la locale specific : 'politique-larem' => 'politique' -> '' -> false
 * Downgrade ensuite la locale : 'fr_FR' -> 'fr' -> '' -> false
 */
var downgradeAndSearchFilesForLanguage = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locale, localeSpecific, platform) {
    var attemptFileFound, futurLocaleString, futurLocaleSpecific;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tryModuleAndReturnFile(locale, localeSpecific, platform);

          case 2:
            attemptFileFound = _context2.sent;

            if (!attemptFileFound) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', attemptFileFound);

          case 5:
            /**
             *
             */
            futurLocaleString = '';
            futurLocaleSpecific = '';


            if (localeSpecific) futurLocaleSpecific = downgradeMyLocaleSpecific(localeSpecific);
            //
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

            if (!(!futurLocaleString && !futurLocaleSpecific)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 12;
            return tryModuleAndReturnFile('en', '', platform);

          case 12:
            return _context2.abrupt('return', _context2.sent);

          case 13:
            return _context2.abrupt('return', downgradeAndSearchFilesForLanguage(futurLocaleString, futurLocaleSpecific, platform));

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function downgradeAndSearchFilesForLanguage(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @func setLocaleForTheUser
 */


var setLocaleForTheUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(detectedLocale, localeSpecific, platform) {
    var localeFormatted;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            /**
             * We want to get the locale formatted with
             * the defineUserLocales function
             */
            localeFormatted = defineUserLocales(detectedLocale);
            _context3.next = 3;
            return downgradeAndSearchFilesForLanguage(localeFormatted, localeSpecific, platform);

          case 3:
            return _context3.abrupt('return', _context3.sent);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function setLocaleForTheUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var constantizeIfTruthy = function constantizeIfTruthy() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return [].concat(args).filter(Boolean).join('-');
};

var defineUserLocales = function defineUserLocales(deviceLocale) {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_');
  return 'en';
};

function downgradeMyLocaleSpecific(localeSpecific) {
  if (localeSpecific === '') return localeSpecific;
  return localeSpecific.replace(/-?[A-Za-z]+$/, '');
}

function downgradeMyLocaleString(locale) {
  if (locale === '') return locale;
  return locale.replace(/[-_]?[A-Za-z]+$/, '');
}module.exports = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var deviceLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
    var localeSpecific = arguments[1];
    var platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'web';
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = platform;
            _context4.next = _context4.t0 === 'web' ? 3 : _context4.t0 === 'mobile' ? 3 : 6;
            break;

          case 3:
            _context4.next = 5;
            return setLocaleForTheUser(deviceLocale, localeSpecific, platform);

          case 5:
            return _context4.abrupt('return', _context4.sent);

          case 6:
            throw new Error('The platform \'' + platform + '\' is not recognised by quorum-i18n.');

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  function getJSONLanguageForApplications() {
    return _ref4.apply(this, arguments);
  }

  return getJSONLanguageForApplications;
}();

var detectedLocale = 'en-GB-en';
var localeSpecific = 'ong-vert-modo';
var platform = 'web';

Test();