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
exports.CommonFunctions = void 0;
var Constants_1 = require("./Constants");
var Browser_1 = require("./Browser");
var path = require('path');
var fs = require('fs');
var CommonFunctions = /** @class */ (function () {
    function CommonFunctions() {
    }
    CommonFunctions.getDriver = function (strBrowser) {
        return __awaiter(this, void 0, void 0, function () {
            var driver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser_1.Browser.getDriver(strBrowser)];
                    case 1:
                        driver = _a.sent();
                        return [2 /*return*/, driver];
                }
            });
        });
    };
    CommonFunctions.loadURL = function (driver, sURL) {
        return __awaiter(this, void 0, void 0, function () {
            var sTitle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, console.log("Launching URL: " + sURL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, driver.get(sURL)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, driver.getTitle()];
                    case 3:
                        sTitle = _a.sent();
                        return [4 /*yield*/, console.log("Page Title is: " + sTitle)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, driver];
                }
            });
        });
    };
    CommonFunctions.getTimeStamp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Date().toLocaleString().replace(/\//g, "").replace(/,/, "").replace(/ /g, "_").replace(/:/g, "")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.createFolder = function (sFileParentFolder, sFolderNames) {
        return __awaiter(this, void 0, void 0, function () {
            var arrFolder, i;
            return __generator(this, function (_a) {
                arrFolder = sFolderNames.split(",");
                for (i = 0; i < arrFolder.length; i++) {
                    fs.mkdir(path.join(Constants_1.Constants.PROJECT_FOLDER, sFileParentFolder, arrFolder[i]), { recursive: true }, function (err) {
                        if (err) {
                            console.log("Results directory NOT created. " + err);
                        }
                        else {
                            console.log("Results directory successfully created.");
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    return CommonFunctions;
}());
exports.CommonFunctions = CommonFunctions;
