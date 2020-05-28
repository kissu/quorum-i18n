"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSONLanguageForApplications = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _en_EN = _interopRequireDefault(require("./../merged-locales/mobile/en_EN.json"));

var _en_ENSk_SK = _interopRequireDefault(require("./../merged-locales/mobile/en_EN-sk_SK.json"));

var _en_ENFr_FR = _interopRequireDefault(require("./../merged-locales/mobile/en_EN-fr_FR.json"));

var _en_ENAr_AR = _interopRequireDefault(require("./../merged-locales/mobile/en_EN-ar_AR.json"));

var _fr = _interopRequireDefault(require("./../merged-locales/web/fr.json"));

var _frPolitique = _interopRequireDefault(require("./../merged-locales/web/fr-politique.json"));

var _frPolitiqueLarem = _interopRequireDefault(require("./../merged-locales/web/fr-politique-larem.json"));

var _frMediation = _interopRequireDefault(require("./../merged-locales/web/fr-mediation.json"));

var _frMediationPromevil = _interopRequireDefault(require("./../merged-locales/web/fr-mediation-promevil.json"));

var _en_GB = _interopRequireDefault(require("./../merged-locales/web/en_GB.json"));

var _en_GBOng = _interopRequireDefault(require("./../merged-locales/web/en_GB-ong.json"));

var _en_GBOngVert = _interopRequireDefault(require("./../merged-locales/web/en_GB-ong-vert.json"));

var _en = _interopRequireDefault(require("./../merged-locales/web/en.json"));

var _enOng = _interopRequireDefault(require("./../merged-locales/web/en-ong.json"));

var _enOngVert = _interopRequireDefault(require("./../merged-locales/web/en-ong-vert.json"));

var MobileTranslates = {};
MobileTranslates["en_EN"] = _en_EN["default"];
MobileTranslates["en_EN-sk_SK"] = _en_ENSk_SK["default"];
MobileTranslates["en_EN-fr_FR"] = _en_ENFr_FR["default"];
MobileTranslates["en_EN-ar_AR"] = _en_ENAr_AR["default"];
var WebTranslates = {};
WebTranslates["fr"] = _fr["default"];
WebTranslates["fr-politique"] = _frPolitique["default"];
WebTranslates["fr-politique-larem"] = _frPolitiqueLarem["default"];
WebTranslates["fr-mediation"] = _frMediation["default"];
WebTranslates["fr-mediation-promevil"] = _frMediationPromevil["default"];
WebTranslates["en_GB"] = _en_GB["default"];
WebTranslates["en_GB-ong"] = _en_GBOng["default"];
WebTranslates["en_GB-ong-vert"] = _en_GBOngVert["default"];
WebTranslates["en"] = _en["default"];
WebTranslates["en-ong"] = _enOng["default"];
WebTranslates["en-ong-vert"] = _enOngVert["default"];

var constantizeIfTruthy = function constantizeIfTruthy() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return [].concat(args).filter(Boolean).join("-");
};

var defineUserLocales = function defineUserLocales(deviceLocale) {
  if (deviceLocale) return deviceLocale.replace(/-/gi, "_");
  return "en";
};

var finalAvailableLocale;

function tryModuleAndReturnFile() {
  return _tryModuleAndReturnFile.apply(this, arguments);
}

function _tryModuleAndReturnFile() {
  _tryModuleAndReturnFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var locale,
        localeSpecific,
        platform,
        wantedFile,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            locale = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "en";
            localeSpecific = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
            platform = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "web";

            if (platform) {
              _context2.next = 5;
              break;
            }

            throw new Error("No platform provided");

          case 5:
            wantedFile = constantizeIfTruthy(locale, localeSpecific);
            finalAvailableLocale = constantizeIfTruthy(locale, localeSpecific);
            _context2.t0 = platform;
            _context2.next = _context2.t0 === "web" ? 10 : 13;
            break;

          case 10:
            if (!WebTranslates[wantedFile]) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", WebTranslates[wantedFile]);

          case 12:
            return _context2.abrupt("return", false);

          case 13:
            if (!MobileTranslates[wantedFile]) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", WebTranslates[wantedFile]);

          case 15:
            return _context2.abrupt("return", false);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _tryModuleAndReturnFile.apply(this, arguments);
}

function downgradeMyLocaleSpecific(localeSpecific) {
  if (localeSpecific === "") return localeSpecific;
  return localeSpecific.replace(/-?[A-Za-z]+$/, "");
}

function downgradeMyLocaleString(locale) {
  if (locale === "") return locale;
  return locale.replace(/[-_]?[A-Za-z]+$/, "");
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
  _downgradeAndSearchFilesForLanguage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(locale, localeSpecific, platform) {
    var attemptFileFound, futurLocaleString, futurLocaleSpecific;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return tryModuleAndReturnFile(locale, localeSpecific, platform);

          case 2:
            attemptFileFound = _context3.sent;

            if (!attemptFileFound) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", attemptFileFound);

          case 5:
            /**
             *
             */
            futurLocaleString = "";
            futurLocaleSpecific = "";
            if (localeSpecific) futurLocaleSpecific = downgradeMyLocaleSpecific(localeSpecific); //

            if (futurLocaleSpecific === "") {
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
              _context3.next = 13;
              break;
            }

            _context3.next = 12;
            return tryModuleAndReturnFile("en", null, platform);

          case 12:
            return _context3.abrupt("return", _context3.sent);

          case 13:
            return _context3.abrupt("return", downgradeAndSearchFilesForLanguage(futurLocaleString, futurLocaleSpecific, platform));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
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
  _setLocaleForTheUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(detectedLocale, localeSpecific, platform) {
    var localeFormatted;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            /**
             * We want to get the locale formatted with
             * the defineUserLocales function
             */
            localeFormatted = defineUserLocales(detectedLocale);
            _context4.next = 3;
            return downgradeAndSearchFilesForLanguage(localeFormatted, localeSpecific, platform);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setLocaleForTheUser.apply(this, arguments);
}

var getJSONLanguageForApplications = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var deviceLocale,
        localeSpecific,
        platform,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deviceLocale = _args.length > 0 && _args[0] !== undefined ? _args[0] : "en";
            localeSpecific = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            platform = _args.length > 2 && _args[2] !== undefined ? _args[2] : "web";
            _context.t0 = platform;
            _context.next = _context.t0 === "web" ? 6 : _context.t0 === "mobile" ? 6 : 11;
            break;

          case 6:
            _context.next = 8;
            return setLocaleForTheUser(deviceLocale, localeSpecific, platform);

          case 8:
            _context.t1 = _context.sent;
            _context.t2 = finalAvailableLocale;
            return _context.abrupt("return", {
              content: _context.t1,
              path: _context.t2
            });

          case 11:
            throw new Error("The platform '".concat(platform || "", "' is not recognised by quorum-i18n."));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getJSONLanguageForApplications() {
    return _ref.apply(this, arguments);
  };
}();

exports.getJSONLanguageForApplications = getJSONLanguageForApplications;