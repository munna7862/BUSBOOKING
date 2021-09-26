"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
var selenium_webdriver_1 = require("selenium-webdriver");
var Browser = /** @class */ (function () {
    function Browser() {
    }
    Browser.getDriver = function (strBrowser) {
        return __awaiter(this, void 0, void 0, function () {
            var driver, sBrowser, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sBrowser = strBrowser.toLowerCase();
                        _a = sBrowser;
                        switch (_a) {
                            case "chrome": return [3 /*break*/, 1];
                            case "firefox": return [3 /*break*/, 3];
                            case "edge": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.getChromeDriver()];
                    case 2:
                        driver = _b.sent();
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, this.getFireforDriver()];
                    case 4:
                        driver = _b.sent();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, this.getEdgeDriver()];
                    case 6:
                        driver = _b.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.getChromeDriver()];
                    case 8:
                        driver = _b.sent();
                        return [3 /*break*/, 9];
                    case 9: return [4 /*yield*/, driver.manage().window().maximize()];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, driver];
                }
            });
        });
    };
    Browser.getChromeDriver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var driver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser("chrome").build()];
                    case 1:
                        driver = _a.sent();
                        return [2 /*return*/, driver];
                }
            });
        });
    };
    Browser.getFireforDriver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var driver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser("firefox").build()];
                    case 1:
                        driver = _a.sent();
                        return [2 /*return*/, driver];
                }
            });
        });
    };
    Browser.getEdgeDriver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var driver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser("MicrosoftEdge").build()];
                    case 1:
                        driver = _a.sent();
                        return [2 /*return*/, driver];
                }
            });
        });
    };
    return Browser;
}());
exports.Browser = Browser;
