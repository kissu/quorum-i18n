"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSONLanguageForApplications = getJSONLanguageForApplications;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var constantizeIfTruthy = function constantizeIfTruthy() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return [].concat(args).filter(Boolean).join('-');
};

var defineUserLocales = function defineUserLocales(deviceLocale) {
  if (deviceLocale) return deviceLocale.replace(/-/gi, '_');
  return 'en';
};

var finalAvailableLocale;

function tryModuleAndReturnFile() {
  return _tryModuleAndReturnFile.apply(this, arguments);
}

function _tryModuleAndReturnFile() {
  _tryModuleAndReturnFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var locale,
        localeSpecific,
        platform,
        wantedFile,
        module,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            locale = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'en';
            localeSpecific = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            platform = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'web';

            if (platform) {
              _context.next = 5;
              break;
            }

            throw new Error('No platform provided');

          case 5:
            wantedFile = constantizeIfTruthy(locale, localeSpecific);
            _context.prev = 6;
            finalAvailableLocale = constantizeIfTruthy(locale, localeSpecific);
            _context.next = 10;
            return Promise.resolve("./merged-locales/".concat(platform, "/").concat(wantedFile, ".json")).then(function (s) {
              return _interopRequireWildcard(require(s));
            });

          case 10:
            module = _context.sent;
            return _context.abrupt("return", module["default"]);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](6);
            return _context.abrupt("return", false);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 14]]);
  }));
  return _tryModuleAndReturnFile.apply(this, arguments);
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


function downgradeAndSearchFilesForLanguage(_x, _x2, _x3) {
  return _downgradeAndSearchFilesForLanguage.apply(this, arguments);
}
/**
 * @func setLocaleForTheUser
 */


function _downgradeAndSearchFilesForLanguage() {
  _downgradeAndSearchFilesForLanguage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locale, localeSpecific, platform) {
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

            return _context2.abrupt("return", attemptFileFound);

          case 5:
            /**
             *
             */
            futurLocaleString = '';
            futurLocaleSpecific = '';
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


            if (!(!futurLocaleString && !futurLocaleSpecific)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 12;
            return tryModuleAndReturnFile('en', null, platform);

          case 12:
            return _context2.abrupt("return", _context2.sent);

          case 13:
            return _context2.abrupt("return", downgradeAndSearchFilesForLanguage(futurLocaleString, futurLocaleSpecific, platform));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _downgradeAndSearchFilesForLanguage.apply(this, arguments);
}

function setLocaleForTheUser(_x4, _x5, _x6) {
  return _setLocaleForTheUser.apply(this, arguments);
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


function _setLocaleForTheUser() {
  _setLocaleForTheUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(detectedLocale, localeSpecific, platform) {
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
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _setLocaleForTheUser.apply(this, arguments);
}

function getJSONLanguageForApplications() {
  return _getJSONLanguageForApplications.apply(this, arguments);
}

function _getJSONLanguageForApplications() {
  _getJSONLanguageForApplications = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var deviceLocale,
        localeSpecific,
        platform,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            deviceLocale = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 'en';
            localeSpecific = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
            platform = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 'web';
            _context4.t0 = platform;
            _context4.next = _context4.t0 === 'web' ? 6 : _context4.t0 === 'mobile' ? 6 : 11;
            break;

          case 6:
            _context4.next = 8;
            return setLocaleForTheUser(deviceLocale, localeSpecific, platform);

          case 8:
            _context4.t1 = _context4.sent;
            _context4.t2 = finalAvailableLocale;
            return _context4.abrupt("return", {
              content: _context4.t1,
              path: _context4.t2
            });

          case 11:
            throw new Error("The platform '".concat(platform || '', "' is not recognised by quorum-i18n."));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getJSONLanguageForApplications.apply(this, arguments);
}