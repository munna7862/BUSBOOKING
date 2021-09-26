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
exports.Constants = void 0;
var CommonFunctions_1 = require("./CommonFunctions");
var path = require('path');
var fs = require('fs');
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.init_TestConfig = function (sParentFolderPath, sFilePath, testObj, customTestConfig) {
        if (customTestConfig === void 0) { customTestConfig = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var sParentFolder, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, err_1, _m, _o, strInstance, useResourceList, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
            return __generator(this, function (_z) {
                switch (_z.label) {
                    case 0: return [4 /*yield*/, path.dirname(sParentFolderPath).split(path.sep).pop()];
                    case 1:
                        sParentFolder = _z.sent();
                        this.TESTCASE_NAME = sFilePath.slice(sParentFolderPath.lastIndexOf(path.sep) + 1, sFilePath.length - 3);
                        _a = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "Testdata", sParentFolder)];
                    case 2:
                        _a.TEST_DATA_FOLDER = _z.sent();
                        if (!(customTestConfig == "")) return [3 /*break*/, 5];
                        _b = this;
                        _c = require;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, "TestConfig.json")];
                    case 3: return [4 /*yield*/, _c.apply(void 0, [_z.sent()])];
                    case 4:
                        _b.TEST_CONFIG_FILE = _z.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        _d = this;
                        _e = require;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, customTestConfig + ".json")];
                    case 6: return [4 /*yield*/, _e.apply(void 0, [_z.sent()])];
                    case 7:
                        _d.TEST_CONFIG_FILE = _z.sent();
                        _z.label = 8;
                    case 8:
                        _f = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "Results", sParentFolder, "Logs")];
                    case 9:
                        _f.TEST_LOG_FOLDER = _z.sent();
                        _g = this;
                        return [4 /*yield*/, path.join(this.TEST_LOG_FOLDER, this.TESTCASE_NAME + ".log")];
                    case 10:
                        _g.TEST_LOG_FILE = _z.sent();
                        _h = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "Results", sParentFolder, "Testsummary.txt")];
                    case 11:
                        _h.TEST_SUMMARY_FILE = _z.sent();
                        _j = this;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".txt")];
                    case 12:
                        _j.TEST_DATA_FILE = _z.sent();
                        _k = this;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".json")];
                    case 13:
                        _k.TEST_DATA_FILE_IN_JSON = _z.sent();
                        _z.label = 14;
                    case 14:
                        _z.trys.push([14, 17, , 18]);
                        if (!fs.existsSync(Constants.TEST_DATA_FILE_IN_JSON)) return [3 /*break*/, 16];
                        _l = this;
                        return [4 /*yield*/, require(Constants.TEST_DATA_FILE_IN_JSON)];
                    case 15:
                        _l.JSON_DATA = _z.sent();
                        _z.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        err_1 = _z.sent();
                        console.error(err_1);
                        return [3 /*break*/, 18];
                    case 18:
                        _m = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "Results", sParentFolder, "Screenshots")];
                    case 19:
                        _m.TEST_SCREENSHOT_FOLDER = _z.sent();
                        return [4 /*yield*/, CommonFunctions_1.CommonFunctions.createFolder(path.join("Results", sParentFolder), "Logs,Screenshots")];
                    case 20:
                        _z.sent();
                        this.TEST_OBJECT = testObj;
                        _o = this;
                        return [4 /*yield*/, require(Constants.PROJECT_FOLDER + "\\EnvironmentConfig.json")];
                    case 21:
                        _o.envConfig = _z.sent();
                        strInstance = this.TEST_CONFIG_FILE.INSTANCE_TYPE;
                        return [4 /*yield*/, this.envConfig.USE_RESOURCE_LIST];
                    case 22:
                        useResourceList = _z.sent();
                        _p = this;
                        return [4 /*yield*/, this.getURL(useResourceList, strInstance)];
                    case 23:
                        _p.sURL = _z.sent();
                        _q = this;
                        return [4 /*yield*/, this.getBrowser()];
                    case 24:
                        _q.sBROWSER = _z.sent();
                        _r = this;
                        _s = parseInt;
                        return [4 /*yield*/, this.envConfig.RETRIES];
                    case 25:
                        _r.nRetries = _s.apply(void 0, [_z.sent()]);
                        _t = this;
                        return [4 /*yield*/, this.envConfig[strInstance + "_DBA_USERNAME"]];
                    case 26:
                        _t.DBA_USERNAME = _z.sent();
                        _u = this;
                        return [4 /*yield*/, this.envConfig[strInstance + "_DBA_PASSWORD"]];
                    case 27:
                        _u.DBA_PASSWORD = _z.sent();
                        _v = this;
                        return [4 /*yield*/, this.envConfig.ZIMBRA_EMAIL_USER];
                    case 28:
                        _v.ZIMBRA_EMAIL_USER = _z.sent();
                        _w = this;
                        return [4 /*yield*/, this.envConfig.ZIMBRA_EMAIL_PASSWORD];
                    case 29:
                        _w.ZIMBRA_EMAIL_PASSWORD = _z.sent();
                        _x = this;
                        return [4 /*yield*/, CommonFunctions_1.CommonFunctions.getDriver(this.sBROWSER)];
                    case 30:
                        _x.driver = _z.sent();
                        _y = this;
                        return [4 /*yield*/, this.getInstance(strInstance)];
                    case 31:
                        _y.INSTANCE_TYPE = _z.sent();
                        return [4 /*yield*/, this.driver.manage().setTimeouts({ implicit: this.OBJECT_LOAD_TIMEOUT, pageLoad: this.PAGE_LOAD_TIMEOUT, script: this.SCRIPT_TIMEOUT })];
                    case 32:
                        _z.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Constants.getInstance = function (strInstance) {
        return __awaiter(this, void 0, void 0, function () {
            var strEnvInstance;
            return __generator(this, function (_a) {
                strEnvInstance = "";
                switch (strInstance) {
                    case "QACLOUD_DAILY":
                    case "QACLOUD_MIG":
                    case "QACLOUD_WEEKLY":
                    case "QACLOUD":
                        strEnvInstance = "QACLOUD";
                        break;
                    case "QA_COLLAB":
                    case "QAMAIN":
                        strEnvInstance = "QAMAIN";
                        break;
                    case "OCICLOUD":
                    case "OCICLOUD_DAILY":
                    case "OCICLOUD_MIG":
                    case "OCICLOUD_WEEKLY":
                        strEnvInstance = "OCICLOUD";
                        break;
                }
                return [2 /*return*/, strEnvInstance];
            });
        });
    };
    Constants.getURL = function (useResourceList, strInstance) {
        return __awaiter(this, void 0, void 0, function () {
            var strURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strURL = "";
                        if (!useResourceList) return [3 /*break*/, 2];
                        return [4 /*yield*/, Constants.envConfig.QAMAIN_RESOURCE_LIST_NAME];
                    case 1:
                        strURL = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Constants.envConfig[strInstance + "_URL"]];
                    case 3:
                        strURL = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, strURL];
                }
            });
        });
    };
    Constants.setTimeouts = function (intObjectLoadTimeOut, intPageLoadTimeout, intScriptTimeout) {
        if (intObjectLoadTimeOut === void 0) { intObjectLoadTimeOut = ""; }
        if (intPageLoadTimeout === void 0) { intPageLoadTimeout = ""; }
        if (intScriptTimeout === void 0) { intScriptTimeout = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (intObjectLoadTimeOut != "") {
                            this.OBJECT_LOAD_TIMEOUT = intObjectLoadTimeOut;
                        }
                        if (intPageLoadTimeout != "") {
                            this.PAGE_LOAD_TIMEOUT = intPageLoadTimeout;
                        }
                        if (intScriptTimeout != "") {
                            this.SCRIPT_TIMEOUT = intScriptTimeout;
                        }
                        return [4 /*yield*/, this.driver.manage().setTimeouts({ implicit: this.OBJECT_LOAD_TIMEOUT, pageLoad: this.PAGE_LOAD_TIMEOUT, script: this.SCRIPT_TIMEOUT })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Constants.getTestLogFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var strTestLogFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Constants.TEST_LOG_FILE];
                    case 1:
                        strTestLogFile = _a.sent();
                        return [2 /*return*/, strTestLogFile];
                }
            });
        });
    };
    Constants.getTestObject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var strTestObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Constants.TEST_OBJECT];
                    case 1:
                        strTestObject = _a.sent();
                        return [2 /*return*/, strTestObject];
                }
            });
        });
    };
    Constants.getBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var strBrowser, dtDate, strDay, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.envConfig.BROWSER];
                    case 1:
                        strBrowser = _a.sent();
                        if (strBrowser.toLowerCase() == "random") {
                            dtDate = new Date();
                            strDay = dtDate.getDate();
                            val = strDay / 7;
                            if (Math.ceil(val) == 1) {
                                strBrowser = "chrome";
                            }
                            else if (Math.ceil(val) == 2) {
                                strBrowser = "firefox";
                            }
                            else if (Math.ceil(val) == 3) {
                                strBrowser = "edge";
                            }
                            else {
                                strBrowser = "chrome";
                            }
                        }
                        return [2 /*return*/, strBrowser];
                }
            });
        });
    };
    Constants.OTM_RESOURCE_LIST_SERVERS = "http://slc12bgf.us.oracle.com/servers/servers.html";
    Constants.OTM_RESOURCE_LIST_TEST_SERVERS = "http://slc12bgf.us.oracle.com/servers/servers-test.html";
    Constants.EMAIL_IMAP_URL = "imaps://stbeehive.oracle.com"; // Dont give slash (/) at the end
    Constants.SCRIPT_TIMEOUT = 100000;
    Constants.PAGE_LOAD_TIMEOUT = 100000;
    Constants.OBJECT_LOAD_TIMEOUT = 80000;
    Constants.PAGE_TITLE_TIMEOUT = 60000;
    Constants.CHROME_POPUP_WAITTIME = 8000;
    Constants.FIREFOX_POPUP_WAITTIME = 8000;
    Constants.strTempPath = __filename;
    Constants.PROJECT_FOLDER = Constants.strTempPath.substring(0, Constants.strTempPath.indexOf("UIAutomation") + 12);
    return Constants;
}());
exports.Constants = Constants;
