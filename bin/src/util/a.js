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
var fs = require("fs");
var readline = require("readline");
var Browser_1 = require("./Browser");
//import { Constants } from './Constants';
var _a = require('selenium-webdriver/lib/logging'), Preferences = _a.Preferences, Type = _a.Type, Level = _a.Level;
var firefox = require('selenium-webdriver/firefox');
var path = require('path');
var fp = require('firefox-profile');
var jsonPath = require('jsonpath');
var dateFormat = require('dateformat');
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
    CommonFunctions.getUTCTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var d, localTime, localOffset, utc, offset, EST, ESTTime, dateFormat, dt;
            return __generator(this, function (_a) {
                d = new Date();
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                offset = -5;
                EST = utc + (3600000 * offset);
                ESTTime = new Date(EST);
                dateFormat = require('dateformat');
                ESTTime = dateFormat(ESTTime, "yyyy-mm-dd hh:MM:ss");
                dt = ESTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
                return [2 /*return*/, dt];
            });
        });
    };
    CommonFunctions.subHoursFromUTCTime = function (intHours) {
        return __awaiter(this, void 0, void 0, function () {
            var d, localTime, localOffset, utc, offset, EST, ESTTime, dt;
            return __generator(this, function (_a) {
                d = new Date();
                d.setHours(d.getHours() - intHours);
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                offset = -0;
                EST = utc + (3600000 * offset);
                ESTTime = new Date(EST);
                //ESTTime = moment(ESTTime).format('YYYY-MM-DD HH:MM:ss');
                ESTTime = dateFormat(ESTTime, 'yyyy-mm-dd hh:MM:ss');
                dt = ESTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
                return [2 /*return*/, dt];
            });
        });
    };
    CommonFunctions.addOrSubDaystoDate = function (date, days, action) {
        return __awaiter(this, void 0, void 0, function () {
            var convDate, getDayCount, modifiedDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        convDate = new Date(date);
                        return [4 /*yield*/, convDate.getDate()];
                    case 1:
                        getDayCount = _a.sent();
                        return [4 /*yield*/, action.toUpperCase()];
                    case 2:
                        if (!((_a.sent()) == "ADD")) return [3 /*break*/, 4];
                        return [4 /*yield*/, convDate.setDate(getDayCount + days)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, (action.toUpperCase()).indexOf("SUB")];
                    case 5:
                        if (!((_a.sent()) != -1)) return [3 /*break*/, 7];
                        return [4 /*yield*/, convDate.setDate(getDayCount - days)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        modifiedDate = dateFormat(convDate, "yyyy-mm-dd HH:MM:ss");
                        return [4 /*yield*/, modifiedDate];
                    case 8: 
                    //await console.log("Modified Date: "+modifiedDate);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.getPDTTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var d, localTime, localOffset, utc, offset, PDT, PDTTime, dt;
            return __generator(this, function (_a) {
                d = new Date();
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                offset = -7;
                PDT = utc + (3600000 * offset);
                PDTTime = new Date(PDT);
                // PDTTime = moment(PDTTime).format('YYYY-MM-DD HH:MM:ss');
                PDTTime = dateFormat(PDTTime, 'yyyy-mm-dd hh:MM:ss');
                dt = PDTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
                return [2 /*return*/, dt];
            });
        });
    };
    CommonFunctions.loadURL = function (driver, strURL) {
        return __awaiter(this, void 0, void 0, function () {
            var count, strTitle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 1;
                        strTitle = "";
                        _a.label = 1;
                    case 1:
                        console.log("Launching URL: " + strURL);
                        // await this.logMessage(null, "INFO", "Launching URL: " + strURL);
                        return [4 /*yield*/, driver.get(strURL)];
                    case 2:
                        // await this.logMessage(null, "INFO", "Launching URL: " + strURL);
                        _a.sent();
                        return [4 /*yield*/, driver.getTitle()];
                    case 3:
                        strTitle = _a.sent();
                        if (strTitle.includes("us.oracle.com") && count != 3) {
                            count = count + 1;
                            return [3 /*break*/, 4];
                        }
                        else
                            return [3 /*break*/, 5];
                        _a.label = 4;
                    case 4:
                        if (true) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //------------------------------------------------------------
    CommonFunctions.takeScreenShot = function (driver, strScreenShotFolder) {
        return __awaiter(this, void 0, void 0, function () {
            var strTimeStamp, strFileName, sBrowserName, logs, addContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CommonFunctions.getTimeStamp()];
                    case 1:
                        strTimeStamp = _a.sent();
                        return [4 /*yield*/, path.join(strScreenShotFolder, strTimeStamp + ".png")];
                    case 2:
                        strFileName = _a.sent();
                        return [4 /*yield*/, console.log(strFileName)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, driver.executeScript("return navigator.userAgent", "")];
                    case 4:
                        sBrowserName = _a.sent();
                        return [4 /*yield*/, sBrowserName.toUpperCase().includes("FIREFOX")];
                    case 5:
                        if (!_a.sent()) return [3 /*break*/, 8];
                        return [4 /*yield*/, driver.manage().logs().get("browser")];
                    case 6:
                        logs = _a.sent();
                        return [4 /*yield*/, console.log(logs)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, driver.takeScreenshot().then(function (data) {
                            return __awaiter(this, void 0, void 0, function () {
                                var base64Data;
                                return __generator(this, function (_a) {
                                    base64Data = data.replace(/^data:image\/png;base64,/, "");
                                    fs.writeFile(strFileName, base64Data, 'base64', function (error) {
                                        if (error)
                                            console.log(error);
                                    });
                                    return [2 /*return*/];
                                });
                            });
                        })];
                    case 9:
                        _a.sent();
                        addContext = require('mochawesome/addContext');
                        addContext(Constants.TEST_OBJECT, { title: 'Screenshot', value: strFileName });
                        return [4 /*yield*/, strFileName];
                    case 10: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.getValueFromFile = function (filename, sKey, sRow) {
        return __awaiter(this, void 0, void 0, function () {
            var papa, fs, file, results;
            return __generator(this, function (_a) {
                papa = require('papaparse');
                fs = require('fs');
                file = fs.readFileSync(filename, 'utf8');
                results = papa.parse(file, {
                    header: true,
                    delimiter: ','
                });
                return [2 /*return*/, results.data[sRow][sKey]];
            });
        });
    };
    CommonFunctions.readDataFromFile = function (strFileName, strKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var rl = readline.createInterface({
                            input: fs.createReadStream(strFileName)
                        });
                        var isFound = false;
                        rl.on('line', function (line) {
                            var keyValuePair = line.split("=");
                            if (keyValuePair.includes(strKey)) {
                                isFound = true;
                                resolve(keyValuePair[1]);
                            }
                        });
                        rl.on('close', function () {
                            if (!isFound) {
                                reject(strKey + " Not found");
                            }
                        });
                    })];
            });
        });
    };
    CommonFunctions.logMessage = function (sLogFolderPath, sLogLevel, sMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var date, TEST_LOG_FILE, TEST_OBJECT, addContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        switch (sLogLevel) {
                            case "INFO":
                                sMessage = "[INFO " + date.toLocaleString() + "] " + sMessage;
                                break;
                            case "PASS":
                                sMessage = "[PASS " + date.toLocaleString() + "] " + sMessage;
                                break;
                            case "FAIL":
                                sMessage = "[FAIL " + date.toLocaleString() + "] " + sMessage;
                                break;
                            case "WARNING":
                                sMessage = "[WARNING " + date.toLocaleString() + "] " + sMessage;
                                break;
                        }
                        return [4 /*yield*/, console.log(sMessage)];
                    case 1:
                        _a.sent();
                        TEST_LOG_FILE = null;
                        if (!(Constants.TEST_LOG_FILE == undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Constants.getTestLogFile()];
                    case 2:
                        TEST_LOG_FILE = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        TEST_LOG_FILE = Constants.TEST_LOG_FILE;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, fs.appendFile(TEST_LOG_FILE, sMessage + "\n", function (err) {
                            if (err)
                                console.log(err);
                        })];
                    case 5:
                        _a.sent();
                        TEST_OBJECT = null;
                        if (!(Constants.TEST_OBJECT == undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Constants.getTestObject()];
                    case 6:
                        TEST_OBJECT = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        TEST_OBJECT = Constants.TEST_OBJECT;
                        _a.label = 8;
                    case 8:
                        addContext = require('mochawesome/addContext');
                        addContext(TEST_OBJECT, sMessage);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonFunctions.appendToTestSummary = function (sTestSummaryFile, sTestCase, sStatus) {
        if (sTestSummaryFile === void 0) { sTestSummaryFile = ""; }
        if (sTestCase === void 0) { sTestCase = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((sStatus == "FAILED") || (sStatus == false)) {
                            sStatus = "FAILED" + "***";
                        }
                        else {
                            sStatus = "PASSED";
                        }
                        return [4 /*yield*/, fs.appendFile(sTestSummaryFile, sTestCase.padEnd(35) + "\t" + sStatus + "\n", function (err) {
                                if (err)
                                    console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonFunctions.getObjectID = function (sObjectName) {
        return __awaiter(this, void 0, void 0, function () {
            var sObjFile, sObjID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, path.join(__dirname, "..", "ObjectRepository")];
                    case 1:
                        sObjFile = _a.sent();
                        return [4 /*yield*/, console.log(sObjFile)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.readDataFromFile(sObjFile, sObjectName)];
                    case 3:
                        sObjID = _a.sent();
                        return [2 /*return*/, sObjID];
                }
            });
        });
    };
    CommonFunctions.getTimeStamp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Date().toLocaleString().replace(/\//g, "").replace(/,/g, "").replace(/ /g, "_").replace(/:/g, "")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.getRecentFileName = function (strPath) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, arrFileNames, strRecFile, recTime, i, file, stat, stat1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fs = require('fs');
                        return [4 /*yield*/, fs.readdirSync(strPath)];
                    case 1:
                        arrFileNames = _b.sent();
                        strRecFile = "", recTime = 0;
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < arrFileNames.length)) return [3 /*break*/, 6];
                        file = strPath + "\\" + arrFileNames[i];
                        return [4 /*yield*/, fs.lstatSync(file)];
                    case 3:
                        stat = _b.sent();
                        _a = Number;
                        return [4 /*yield*/, stat.mtimeMs];
                    case 4:
                        stat1 = _a.apply(void 0, [_b.sent()]);
                        if (i == 0) {
                            strRecFile = file;
                            recTime = stat1;
                        }
                        else {
                            if (stat1 > recTime) {
                                strRecFile = file;
                                recTime = stat1;
                            }
                        }
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, strRecFile];
                    case 7: 
                    // await this.logMessage(null, "INFO","Recent FileName: " + strRecFile + " mtime: " + recTime);
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CommonFunctions.afterTest = function (TEST_STATUS, driver, TEST_SCREENSHOT_FOLDER, TEST_SUMMARY_FILE, TESTCASE_NAME) {
        if (driver === void 0) { driver = null; }
        if (TEST_SCREENSHOT_FOLDER === void 0) { TEST_SCREENSHOT_FOLDER = ""; }
        if (TEST_SUMMARY_FILE === void 0) { TEST_SUMMARY_FILE = ""; }
        if (TESTCASE_NAME === void 0) { TESTCASE_NAME = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CommonFunctions.writeToFile = function (fileName, data) {
        return __awaiter(this, void 0, void 0, function () {
            //var data = "New File Contents";
            function writingToFile() {
                fs.writeFile(fileName, data, 'utf8', function (err) {
                    if (err)
                        console.log(err);
                });
            }
            var fs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require('fs');
                        return [4 /*yield*/, setTimeout(writingToFile, 7000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, console.log("Successfully Written to File.")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonFunctions.appendToFile = function (filename, data) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                fs = require('fs');
                //var data = "New File Contents";
                fs.appendFile(filename, data, 'utf8', function (err) {
                    if (err)
                        console.log(err);
                    console.log("Successfully Appended to File.");
                });
                return [2 /*return*/];
            });
        });
    };
    CommonFunctions.readingFile = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs.readFile(fileName, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Reading File...");
                    console.log(data);
                });
                return [2 /*return*/];
            });
        });
    };
    CommonFunctions.changeDataInFile = function (fileName, sValue, sRepaceWith) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require('fs');
                        fs.readFile(fileName, 'utf8', function (err, data) {
                            if (err) {
                                return console.log(err);
                            }
                            //var result = data.replace(/MIAMI/g, sRepaceWith);
                            var regex = new RegExp(sValue, "g");
                            var result = data.replace(regex, sRepaceWith);
                            fs.writeFile(fileName, result, 'utf8', function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                                CommonFunctions.sleep(10000);
                            });
                        });
                        return [4 /*yield*/, console.log("Successfully Updated the File.")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonFunctions.sleep = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            var stop;
            return __generator(this, function (_a) {
                stop = new Date().getTime();
                while (new Date().getTime() < stop + time) {
                    ;
                }
                return [2 /*return*/];
            });
        });
    };
    CommonFunctions.removeLinesFromFile = function (fileName, keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require('fs');
                        fs.readFile(fileName, 'utf8', function (err, data) {
                            if (err) {
                                return console.log(err);
                            }
                            var lines = data.split('\n');
                            var lineNo;
                            lines.forEach(function (line, lineNumber) {
                                if (line.includes(keyword)) {
                                    lineNo = lineNumber;
                                }
                            });
                            if (lineNo == undefined)
                                return -1;
                            lines.splice(lineNo, 1);
                            var newtext = lines.join('\n');
                            fs.writeFile(fileName, newtext, 'utf8', function (err) {
                                if (err)
                                    return console.log(err);
                                CommonFunctions.sleep(10000);
                            });
                        });
                        return [4 /*yield*/, console.log("Successfully Removed the line with keyword: " + keyword + " from the File.")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonFunctions.getLineCountInFile = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, array;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require('fs');
                        array = fs.readFileSync(fileName).toString().split("\n");
                        // await this.logMessage(null, "INFO", "Lines Count: " + array.length);
                        return [4 /*yield*/, console.log("Lines Count: " + array.length)];
                    case 1:
                        // await this.logMessage(null, "INFO", "Lines Count: " + array.length);
                        _a.sent();
                        return [2 /*return*/, array.length];
                }
            });
        });
    };
    CommonFunctions.subHoursFromPDTTime = function (intHours) {
        return __awaiter(this, void 0, void 0, function () {
            var d, localTime, localOffset, utc, offset, PDT, PDTTime, dt;
            return __generator(this, function (_a) {
                d = new Date();
                d.setHours(d.getHours() - intHours);
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                offset = -7;
                PDT = utc + (3600000 * offset);
                PDTTime = new Date(PDT);
                // PDTTime = moment(PDTTime).format('YYYY-MM-DD HH:MM:ss');
                PDTTime = dateFormat(PDTTime, 'yyyy-mm-dd hh:MM:ss');
                dt = PDTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
                return [2 /*return*/, dt];
            });
        });
    };
    CommonFunctions.getDaysDiffFromCurrentDate = function (dtDate) {
        return __awaiter(this, void 0, void 0, function () {
            var dtCurrdate, diff, daysDiff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dtCurrdate = new Date();
                        return [4 /*yield*/, this.logMessage(Constants.TEST_LOG_FILE, "INFO", "Current date: " + dtCurrdate)];
                    case 1:
                        _a.sent();
                        diff = Math.abs(dtDate.getTime() - dtCurrdate.getTime());
                        return [4 /*yield*/, this.logMessage(Constants.TEST_LOG_FILE, "INFO", "diff: " + diff)];
                    case 2:
                        _a.sent();
                        daysDiff = Math.ceil(diff / (1000 * 3600 * 24));
                        return [4 /*yield*/, this.logMessage(Constants.TEST_LOG_FILE, "INFO", "Days difference between date and Current date: " + daysDiff)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, daysDiff];
                }
            });
        });
    };
    CommonFunctions.validateIfDateFormatIsYYYYMMDD = function (dtDate, strDelimiter) {
        return __awaiter(this, void 0, void 0, function () {
            var temp, d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        temp = dtDate.split(strDelimiter);
                        d = new Date(dtDate);
                        return [4 /*yield*/, this.logMessage(null, "INFO", "Verifying if date is in YYYYMMDD format")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ((d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0]))];
                }
            });
        });
    };
    CommonFunctions.getDataFromFileAsDictionary = function (strFileName) {
        return __awaiter(this, void 0, void 0, function () {
            var arrData, strTemp, lines, _i, lines_1, line, arrTemp, strKey, strValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrData = {};
                        strTemp = fs.readFileSync(strFileName, 'utf-8');
                        lines = strTemp.split("\n");
                        // await this.logMessage(null, "INFO", "Reading data from file " + strFileName);
                        console.log("Reading data from file " + strFileName);
                        _i = 0, lines_1 = lines;
                        _a.label = 1;
                    case 1:
                        if (!(_i < lines_1.length)) return [3 /*break*/, 4];
                        line = lines_1[_i];
                        arrTemp = line.split("=");
                        strKey = arrTemp[0].trim();
                        strValue = arrTemp[1].trim();
                        return [4 /*yield*/, this.logMessage(null, "INFO", "key: " + strKey + ", " + "value: " + strValue)];
                    case 2:
                        _a.sent();
                        console.log("key: " + strKey + ", " + "value: " + strValue);
                        arrData[strKey] = strValue;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, arrData];
                }
            });
        });
    };
    CommonFunctions.readJSONDataFromFile = function (fileName, key) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, contents, jsonContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require("fs");
                        return [4 /*yield*/, fs.readFileSync(fileName)];
                    case 1:
                        contents = _a.sent();
                        return [4 /*yield*/, JSON.parse(contents)];
                    case 2:
                        jsonContent = _a.sent();
                        return [4 /*yield*/, jsonContent[key]];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.getTimeDifference = function (dtDate1, dtDate2) {
        return __awaiter(this, void 0, void 0, function () {
            var localTime1, localOffset1, utc1, localTime2, localOffset2, utc2, seconds;
            return __generator(this, function (_a) {
                localTime1 = dtDate1.getTime();
                localOffset1 = dtDate1.getTimezoneOffset() * 60000;
                utc1 = localTime1 + localOffset1;
                localTime2 = dtDate2.getTime();
                localOffset2 = dtDate2.getTimezoneOffset() * 60000;
                utc2 = localTime2 + localOffset2;
                seconds = ((utc2 - utc1) / 1000) - 41400;
                // await this.logMessage(null, "INFO", "Time difference in seconds is: " + seconds);
                console.log("Time difference in seconds is: " + seconds);
                return [2 /*return*/, seconds];
            });
        });
    };
    CommonFunctions.createFolder = function (strParentFolder, strFolderNames) {
        return __awaiter(this, void 0, void 0, function () {
            var arrFolders, i;
            return __generator(this, function (_a) {
                arrFolders = strFolderNames.split(",");
                for (i = 0; i < arrFolders.length; i++) {
                    fs.mkdir(path.join(Constants.PROJECT_FOLDER, strParentFolder, arrFolders[i]), { recursive: true }, function (err) {
                        if (err)
                            console.log(" Results directory NOT created." + err);
                        else
                            console.log(" Results directory successfully created.");
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    CommonFunctions.convertDateIntoFormat = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var dateTime, datestring;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dateTime = new Date(date);
                        datestring = (dateTime.getFullYear() + "-" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "-" + ("0" + dateTime.getDate()).slice(-2) + " " + ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2) + ":" + ("0" + dateTime.getSeconds()).slice(-2));
                        return [4 /*yield*/, console.log(datestring)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, datestring];
                }
            });
        });
    };
    CommonFunctions.getDateWithoutTime = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var dateTime, datestring;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dateTime = new Date(date);
                        datestring = (dateTime.getFullYear() + "-" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "-" + ("0" + dateTime.getDate()).slice(-2));
                        return [4 /*yield*/, console.log(datestring)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, datestring];
                }
            });
        });
    };
    CommonFunctions.timeDiffInMilliSec = function (date1, date2, hours, mins, seconds) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, localTime1, endDate, localTime2, timeDiff, sec, minutes, hrs, sec, minutes, sec;
            return __generator(this, function (_a) {
                startDate = new Date(date1);
                localTime1 = startDate.getTime();
                endDate = new Date(date2);
                localTime2 = endDate.getTime();
                timeDiff = 0;
                if (localTime1 > localTime2) {
                    timeDiff = localTime1 - localTime2;
                }
                else if (localTime1 < localTime2) {
                    timeDiff = localTime2 - localTime1;
                }
                if (hours == true) {
                    sec = Math.floor(timeDiff / 1000);
                    minutes = Math.floor(sec / 60);
                    hrs = Math.floor(minutes / 60);
                    return [2 /*return*/, hrs];
                }
                if (mins == true) {
                    sec = Math.floor(timeDiff / 1000);
                    minutes = Math.floor(sec / 60);
                    return [2 /*return*/, minutes];
                }
                if (seconds == true) {
                    sec = Math.floor(timeDiff / 1000);
                    return [2 /*return*/, sec];
                }
                return [2 /*return*/];
            });
        });
    };
    CommonFunctions.verifyIfStringContains = function (anyParentData, strChildData) {
        return __awaiter(this, void 0, void 0, function () {
            var strParentData, result, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strParentData = anyParentData.toString();
                        result = [];
                        j = 0;
                        _a.label = 1;
                    case 1:
                        if (!(j <= strChildData.length - 1)) return [3 /*break*/, 7];
                        if (!strParentData.includes(strChildData[j])) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.push(true)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, result.push(false)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.logMessage(null, "INFO", strChildData[j] + "*****************Value NOT PRESENT***************** ++ INDEX VALUE :::: " + j)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 1];
                    case 7: return [4 /*yield*/, this.logMessage(null, "INFO", "Result :: " + result)];
                    case 8:
                        _a.sent();
                        if (result.includes(false)) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonFunctions.removeFile = function (strFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var isFileRemoved;
            return __generator(this, function (_a) {
                isFileRemoved = false;
                try {
                    console.info('Removing file: ' + strFilePath);
                    fs.unlinkSync(strFilePath);
                    console.info('File Removed successfully');
                    // await this.logMessage(null, "INFO", "File Removed");
                    isFileRemoved = true;
                }
                catch (err) {
                    console.error("Error occurred while trying to remove file");
                    // await this.logMessage(null, "WARNING", "Error occurred while trying to remove file");
                }
                return [2 /*return*/, isFileRemoved];
            });
        });
    };
    CommonFunctions.runCommand = function (strCommand) {
        return __awaiter(this, void 0, void 0, function () {
            var child_process, resp, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        child_process = require('child_process');
                        return [4 /*yield*/, child_process.execSync(strCommand)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.toString('UTF8')];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, result];
                    case 3: 
                    // await CommonFunctions.logMessage(Constants.TEST_LOG_FILE, "INFO", "Command Output :: " + result);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.getValueFromResponse = function (strResponse, strQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var strRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jsonPath.query(strResponse, strQuery.toString())];
                    case 1:
                        strRes = _a.sent();
                        return [4 /*yield*/, strRes];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonFunctions.prototype.getRecentFileFromDirectory = function (strDirectoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, path, _, files;
            return __generator(this, function (_a) {
                fs = require('fs');
                path = require('path');
                _ = require('underscore');
                files = fs.readdirSync(strDirectoryName);
                return [2 /*return*/, _.max(files, function (f) {
                        var fullpath = path.join(strDirectoryName, f);
                        return fs.statSync(fullpath).ctime;
                    })];
            });
        });
    };
    //For Time Difference in Seconds in Fusion VM. Time zone is in PDT
    CommonFunctions.getPDTTimeDifference = function (dtDate1, dtDate2) {
        return __awaiter(this, void 0, void 0, function () {
            var time1, time2, seconds;
            return __generator(this, function (_a) {
                time1 = dtDate1.getTime();
                time2 = dtDate2.getTime();
                seconds = Math.abs((time1 - time2) / 1000);
                console.log("seconds: " + seconds);
                // await this.logMessage(null, "INFO", "Time difference in secoonds is: " + seconds);
                return [2 /*return*/, seconds];
            });
        });
    };
    CommonFunctions.getDateInFormat = function (dtDate, strFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var strDate;
            return __generator(this, function (_a) {
                strDate = dateFormat(dtDate, strFormat);
                console.log("Formatted date: " + strDate);
                // await this.logMessage(null, "INFO", "Formatted date: " + strDate);
                return [2 /*return*/, strDate];
            });
        });
    };
    CommonFunctions.verifyIfTextExistsInFile = function (strFileName, strKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var rl = readline.createInterface({
                            input: fs.createReadStream(strFileName)
                        });
                        var isFound = false;
                        rl.on('line', function (line) {
                            if (line.includes(strKey)) {
                                isFound = true;
                                resolve("true");
                            }
                        });
                        rl.on('close', function () {
                            if (!isFound) {
                                reject("false");
                            }
                        });
                    })];
            });
        });
    };
    CommonFunctions.readDataFromXMLFile = function (strFileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var fs = require('fs');
                        var xml2js = require('xml2js');
                        var parser = new xml2js.Parser();
                        fs.readFile(strFileName, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            parser.parseString(data, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                var jsonRes = JSON.stringify(result);
                                // console.dir("JSON result: " + jsonRes);
                                resolve(jsonRes);
                            });
                        });
                    })];
            });
        });
    };
    CommonFunctions.updateDataInCsv = function (strSrcFilePath, strColumnsToUpdate, strDataToUpdate, strNewFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                fs = require('fs');
                fs.readFile(strSrcFilePath, 'utf8', function (err, data) {
                    if (err) {
                        throw err;
                    }
                    var arrData = data.split('\n');
                    var lineCount = arrData.length;
                    var arrColumns = arrData[1].split(",");
                    var columnsCount = arrColumns.length;
                    var arrColsToUpdate = strColumnsToUpdate.split(",");
                    var k = 0;
                    for (var i = 3; i < lineCount - 1; i++) {
                        for (var j = 0; j < columnsCount; j++) {
                            if (arrColumns[j] == arrColsToUpdate[k]) {
                                var arrLineData = arrData[i].split(",");
                                var temp = arrLineData[j] + strDataToUpdate;
                                arrLineData[j] = temp;
                                arrData[i] = arrLineData.join(',');
                                k++;
                            }
                            if (k == arrColsToUpdate.length) {
                                break;
                            }
                        }
                        k = 0;
                    }
                    var updatedData = arrData.join("\n");
                    fs.writeFile(strNewFilePath, updatedData, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                });
                return [2 /*return*/, true];
            });
        });
    };
    CommonFunctions.getCountOfOccurances = function (strparentString, strRegularExpression) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var len, count;
            return __generator(this, function (_b) {
                len = (_a = strparentString.match(new RegExp(strRegularExpression, "g"))) === null || _a === void 0 ? void 0 : _a.length;
                count = (len == undefined) ? 0 : len;
                console.log("count: " + count);
                return [2 /*return*/, count];
            });
        });
    };
    CommonFunctions.getDataFromCSVFile = function (strFileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var fs = require('fs');
                        fs.readFile(strFileName, 'utf-8', function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            var arrData = data.split('\n');
                            resolve(arrData);
                        });
                    })];
            });
        });
    };
    return CommonFunctions;
}());
exports.CommonFunctions = CommonFunctions;
