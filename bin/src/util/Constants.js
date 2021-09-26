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
    Constants.init_TestConfig = function (sFilePath, testObj, customTestConfig) {
        if (customTestConfig === void 0) { customTestConfig = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var sFileParentFolder, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0: return [4 /*yield*/, path.dirname(sFilePath).split(path.sep).pop()];
                    case 1:
                        sFileParentFolder = _o.sent();
                        _a = this;
                        return [4 /*yield*/, sFilePath.slice(sFilePath.lastIndexOf(path.sep) + 1, sFilePath.length - 3)];
                    case 2:
                        _a.TESTCASE_NAME = _o.sent();
                        _b = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "testdata", sFileParentFolder)];
                    case 3:
                        _b.TEST_DATA_FOLDER = _o.sent();
                        if (!(customTestConfig == "")) return [3 /*break*/, 6];
                        _c = this;
                        _d = require;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, "TestConfig.json")];
                    case 4: return [4 /*yield*/, _d.apply(void 0, [_o.sent()])];
                    case 5:
                        _c.TEST_CONFIG_FILE = _o.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        _e = this;
                        _f = require;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, customTestConfig + ".json")];
                    case 7: return [4 /*yield*/, _f.apply(void 0, [_o.sent()])];
                    case 8:
                        _e.TEST_CONFIG_FILE = _o.sent();
                        _o.label = 9;
                    case 9:
                        _g = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "results", sFileParentFolder, "Logs")];
                    case 10:
                        _g.TEST_LOG_FOLDER = _o.sent();
                        _h = this;
                        return [4 /*yield*/, path.join(this.TEST_LOG_FOLDER, this.TESTCASE_NAME + ".log")];
                    case 11:
                        _h.TEST_LOG_FILE = _o.sent();
                        _j = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "results", sFileParentFolder, "Testsummary.txt")];
                    case 12:
                        _j.TEST_SUMMARY_FILE = _o.sent();
                        _k = this;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".txt")];
                    case 13:
                        _k.TEST_DATA_FILE = _o.sent();
                        _l = this;
                        return [4 /*yield*/, path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".json")];
                    case 14:
                        _l.TEST_DATA_FILE_IN_JSON = _o.sent();
                        _m = this;
                        return [4 /*yield*/, path.join(this.PROJECT_FOLDER, "results", sFileParentFolder, "Screenshots")];
                    case 15:
                        _m.TEST_SCREENSHOT_FOLDER = _o.sent();
                        return [4 /*yield*/, CommonFunctions_1.CommonFunctions.createFolder(path.join("results", sFileParentFolder), "Logs,Screenshots")];
                    case 16:
                        _o.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Constants.sTSFilePath = __filename;
    Constants.PROJECT_FOLDER = Constants.sTSFilePath.substring(0, Constants.sTSFilePath.indexOf("Project1") + 8);
    return Constants;
}());
exports.Constants = Constants;