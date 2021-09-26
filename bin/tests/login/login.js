"use strict";
//https://www.tsrtconline.in/oprs-web/
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
var selenium_webdriver_1 = require("selenium-webdriver");
var Browser_1 = require("./../../src/util/Browser");
var CommonFunctions_1 = require("./../../src/util/CommonFunctions");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, driver, loginBtn, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _b = (_a = console).log;
                    _c = "Starting is: ";
                    return [4 /*yield*/, CommonFunctions_1.CommonFunctions.getTimeStamp()];
                case 1: return [4 /*yield*/, _b.apply(_a, [_c + (_g.sent())])];
                case 2:
                    _g.sent();
                    return [4 /*yield*/, Browser_1.Browser.getDriver("edge")];
                case 3:
                    driver = _g.sent();
                    return [4 /*yield*/, driver.manage().setTimeouts({ implicit: 10000, pageLoad: 20000 })];
                case 4:
                    _g.sent();
                    return [4 /*yield*/, CommonFunctions_1.CommonFunctions.loadURL(driver, "https://opensource-demo.orangehrmlive.com/")];
                case 5:
                    driver = _g.sent();
                    return [4 /*yield*/, Promise.all([
                            driver.findElement(selenium_webdriver_1.By.id("txtUsername")).sendKeys("Admin"),
                            driver.findElement(selenium_webdriver_1.By.id("txtPassword")).sendKeys("admin123")
                        ]).then(function () {
                            console.log("Entered data in all data fields");
                        })];
                case 6:
                    _g.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id("btnLogin"))];
                case 7:
                    loginBtn = _g.sent();
                    return [4 /*yield*/, loginBtn.click()];
                case 8:
                    _g.sent();
                    _e = (_d = console).log;
                    _f = "Ending is: ";
                    return [4 /*yield*/, CommonFunctions_1.CommonFunctions.getTimeStamp()];
                case 9: return [4 /*yield*/, _e.apply(_d, [_f + (_g.sent())])];
                case 10:
                    _g.sent();
                    return [4 /*yield*/, driver.close()];
                case 11:
                    _g.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
