import * as fs from 'fs';
import * as readline from 'readline';
import { WebDriver } from "selenium-webdriver";
import { Browser } from './Browser';
//import { Constants } from './Constants';
const { Preferences, Type, Level } = require('selenium-webdriver/lib/logging')
const firefox = require('selenium-webdriver/firefox');
const path = require('path');
const fp = require('firefox-profile');
var jsonPath = require('jsonpath');
var dateFormat = require('dateformat');

export class CommonFunctions {

    public static async getDriver(strBrowser: string): Promise<WebDriver> {
        let driver:WebDriver;
        driver = await Browser.getDriver(strBrowser);
        return driver;
    }

    public static async getUTCTime(): Promise<string> {
        //const moment = require('moment');        
        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -5;
        let EST = utc + (3600000 * offset);
        let ESTTime = new Date(EST);
        //ESTTime = moment(ESTTime).format('YYYY-MM-DD HH:MM:ss');        
        var dateFormat = require('dateformat');
        ESTTime= dateFormat(ESTTime, "yyyy-mm-dd hh:MM:ss");
        //var day = dateFormat(new Date(), "yyyy.mm.dd hh:MM:ss");
        let dt = ESTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }
  
    public static async subHoursFromUTCTime(intHours: number): Promise<string> {
        //const moment = require('moment');
        let d = new Date();
        d.setHours(d.getHours() - intHours);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -0;
        let EST = utc + (3600000 * offset);
        let ESTTime = new Date(EST);
        //ESTTime = moment(ESTTime).format('YYYY-MM-DD HH:MM:ss');
        ESTTime = dateFormat(ESTTime,'yyyy-mm-dd hh:MM:ss');
        let dt = ESTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }


    public static async addOrSubDaystoDate(date: string, days: number, action: string) {
        // const moment = require('moment');
        let convDate = new Date(date);
        let getDayCount = await convDate.getDate();
        if (await action.toUpperCase() == "ADD") {
            await convDate.setDate(getDayCount + days);
        }
        else if (await (action.toUpperCase()).indexOf("SUB") != -1) {
            await convDate.setDate(getDayCount - days);
        }
        let modifiedDate: string = dateFormat(convDate, "yyyy-mm-dd HH:MM:ss");
        //await console.log("Modified Date: "+modifiedDate);
        return await modifiedDate;
    }

    public static async getPDTTime(): Promise<string> {
        // const moment = require('moment');
        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -7;
        let PDT = utc + (3600000 * offset);
        let PDTTime = new Date(PDT);
        // PDTTime = moment(PDTTime).format('YYYY-MM-DD HH:MM:ss');
        PDTTime = dateFormat(PDTTime,'yyyy-mm-dd hh:MM:ss');
        let dt = PDTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }

    public static async loadURL(driver: WebDriver, strURL: string) {
        let count = 1;
        let strTitle = "";
        do {
            console.log("Launching URL: " + strURL);
            // await this.logMessage(null, "INFO", "Launching URL: " + strURL);
            await driver.get(strURL);
            strTitle = await driver.getTitle();
            if (strTitle.includes("us.oracle.com") && count != 3) {
                count = count + 1;
                continue;
            }
            else
                break;
        } while (true)
        //await driver.manage().window().maximize();
    }
//------------------------------------------------------------
    public static async takeScreenShot(driver: WebDriver, strScreenShotFolder: string): Promise<string> {
        let strTimeStamp = await CommonFunctions.getTimeStamp();
        let strFileName = await path.join(strScreenShotFolder, strTimeStamp + ".png");
        await console.log(strFileName);

        let sBrowserName: string = await driver.executeScript("return navigator.userAgent", "");
        if (await sBrowserName.toUpperCase().includes("FIREFOX")) {
            let logs = await driver.manage().logs().get("browser");
            await console.log(logs);
            // await this.logMessage(null, "INFO", "Firefox logs: " + logs);
        }

        await driver.takeScreenshot().then(async function (data) {
            let base64Data: string = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFile(strFileName, base64Data, 'base64', function (error: any) {
                if (error) console.log(error);
            });
        });

        // await this.logMessage(null, "INFO", "Screenshot Captured");
        // await this.logMessage(null, "INFO", "Screenshot Path: " + strFileName);

        var addContext = require('mochawesome/addContext');
        addContext(Constants.TEST_OBJECT, { title: 'Screenshot', value: strFileName});

        return await strFileName;
    }

    public static async getValueFromFile(filename: string, sKey: string, sRow: number): Promise<string> {
        const papa = require('papaparse');
        const fs = require('fs');
        const file = fs.readFileSync(filename, 'utf8');
        let results = papa.parse(file, {
            header: true,
            delimiter: ','
        });
        return results.data[sRow][sKey];
    }

    public static async readDataFromFile(strFileName: string, strKey: string): Promise<string> {
        return new Promise(function (resolve, reject) {
            let rl = readline.createInterface({
                input: fs.createReadStream(strFileName)
            });

            let isFound:boolean = false;
            rl.on('line', function (line) {
                let keyValuePair: string[] = line.split("=");
                if (keyValuePair.includes(strKey)) {
                    isFound = true;
                    resolve(keyValuePair[1]);
                }
            });

            rl.on('close', function(){
                if(!isFound){
                    reject(strKey + " Not found");
                }
            });
        });
    }

    public static async logMessage(sLogFolderPath: any, sLogLevel: any, sMessage: any) {
        let date = new Date();
        switch (sLogLevel) {
            case "INFO": sMessage = "[INFO " + date.toLocaleString() + "] " + sMessage; break;
            case "PASS": sMessage = "[PASS " + date.toLocaleString() + "] " + sMessage; break;
            case "FAIL": sMessage = "[FAIL " + date.toLocaleString() + "] " + sMessage; break;
            case "WARNING": sMessage = "[WARNING " + date.toLocaleString() + "] " + sMessage; break;
        }
        await console.log(sMessage);
        let TEST_LOG_FILE:any = null;
        if(Constants.TEST_LOG_FILE == undefined){
            TEST_LOG_FILE = await Constants.getTestLogFile();
        }else{
            TEST_LOG_FILE = Constants.TEST_LOG_FILE;
        }
        await fs.appendFile(TEST_LOG_FILE, sMessage + "\n", (err: any) => {
            if (err) console.log(err);
        });
        let TEST_OBJECT:any = null;
        if(Constants.TEST_OBJECT == undefined){
            TEST_OBJECT = await Constants.getTestObject();
        }else{
            TEST_OBJECT = Constants.TEST_OBJECT;
        }
        var addContext = require('mochawesome/addContext');
        addContext(TEST_OBJECT, sMessage );
    }
    public static async appendToTestSummary(sTestSummaryFile: string = "", sTestCase: string = "", sStatus: any) {
        if ((sStatus == "FAILED") || (sStatus == false)) { sStatus = "FAILED" + "***"; }
        else { sStatus = "PASSED"; }
        await fs.appendFile(sTestSummaryFile, sTestCase.padEnd(35) + "\t" + sStatus + "\n", (err: any) => {
            if (err) console.log(err);
        });
    }

    public static async getObjectID(sObjectName: string): Promise<string> {
        // var path = require("path");
        let sObjFile = await path.join(__dirname, "..", "ObjectRepository");
        await console.log(sObjFile);
        let sObjID = await this.readDataFromFile(sObjFile, sObjectName);
        return sObjID as string;
    }

    public static async getTimeStamp(): Promise<string> {
        return await new Date().toLocaleString().replace(/\//g, "").replace(/,/g, "").replace(/ /g, "_").replace(/:/g, "");
    }

    public static async getRecentFileName(strPath:string): Promise<string> {
        var fs = require('fs');
        var arrFileNames: string[] = await fs.readdirSync(strPath);
        let strRecFile: string = "", recTime: number = 0;
        for (let i = 0; i < arrFileNames.length; i++) {
            let file = strPath + "\\" + arrFileNames[i];//let file = await path.join(path, fileNames[i]);
            let stat = await fs.lstatSync(file);
            let stat1 = Number(await stat.mtimeMs);
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
        }
        // await this.logMessage(null, "INFO","Recent FileName: " + strRecFile + " mtime: " + recTime);
        return await strRecFile;
    }

    public static async afterTest(TEST_STATUS: any, driver: any = null, TEST_SCREENSHOT_FOLDER: string = "", TEST_SUMMARY_FILE: string = "", TESTCASE_NAME: string = ""){

        // let sBrowserName: string = await Constants.driver.executeScript("return navigator.userAgent", "");
        // if (await sBrowserName.toUpperCase().includes("FIREFOX")) {
        //     let logs = await Constants.driver.manage().logs().get("browser");
        //     await console.log(logs);
        // }

        // await this.appendToTestSummary(Constants.TEST_SUMMARY_FILE, Constants.TESTCASE_NAME, TEST_STATUS);
        // if (TEST_STATUS == "FAILED" || TEST_STATUS == false) {
        //     var sFile = await this.takeScreenShot(Constants.driver, Constants.TEST_SCREENSHOT_FOLDER);
        //     console.log("[FAIL " + await this.getTimeStamp() + "] TEST STATUS :: FAILED*******************");
        //     await this.logMessage(Constants.TEST_LOG_FOLDER, 'FAIL', await this.getTimeStamp() + "] TEST STATUS :: FAILED*******************");
        //     // await this.logMessage(Constants.TEST_LOG_FOLDER, 'Screenshot', sFile);
        //     // return sFile;
        // }
        // else {
        //     console.log("[PASS " + await this.getTimeStamp() + "] TEST STATUS :: PASSED");
        //     await this.logMessage(Constants.TEST_LOG_FOLDER, 'PASS', await this.getTimeStamp() + "] TEST STATUS :: PASSED");
        //     // return "TEST STATUS :: PASSED - Screenshot is not captured";
        // }

        // await Constants.driver.quit();
        // await Constants.driver.sleep(10 * 1000);

    }


    public static async writeToFile(fileName: string, data: string) {
        const fs = require('fs');
        //var data = "New File Contents";
        function writingToFile() {
            fs.writeFile(fileName, data, 'utf8', (err: any) => {
                if (err) console.log(err);
            });
        }
        await setTimeout(writingToFile, 7000);
        await console.log("Successfully Written to File.");
        // await this.logMessage(null, "INFO", "Successfully Written to File");
    }

    public static async appendToFile(filename: string, data: string) {
        const fs = require('fs');
        //var data = "New File Contents";
        fs.appendFile(filename, data, 'utf8', (err: any) => {
            if (err) console.log(err);
            console.log("Successfully Appended to File.");
        });
    }


    public static async readingFile(fileName: string) {
        fs.readFile(fileName, 'utf8', function (err: any, data: any) {
            if (err) {
                return console.log(err);
            }
            console.log("Reading File...");
            console.log(data);
        });
    }

    public static async changeDataInFile(fileName: string, sValue: string, sRepaceWith: string) {
        var fs = require('fs')
        fs.readFile(fileName, 'utf8', function (err: any, data: any) {
            if (err) {
                return console.log(err);
            }
            //var result = data.replace(/MIAMI/g, sRepaceWith);
            var regex = new RegExp(sValue, "g");
            var result = data.replace(regex, sRepaceWith);
            fs.writeFile(fileName, result, 'utf8', function (err: any) {
                if (err) {
                    return console.log(err);
                }
                CommonFunctions.sleep(10000);
            });
        });
        await console.log("Successfully Updated the File.");
    }



    public static async sleep(time: number) {
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {
            ;
        }
    }

    public static async removeLinesFromFile(fileName: string, keyword: string) {
        const fs = require('fs');
        fs.readFile(fileName, 'utf8', function (err: any, data: any) {
            if (err) {
                return console.log(err);
            }
            let lines = data.split('\n');
            var lineNo;
            lines.forEach(function (line: any, lineNumber: number) {
                if (line.includes(keyword)) {
                    lineNo = lineNumber;
                }
            });
            if (lineNo == undefined)
                return -1;
            lines.splice(lineNo, 1);
            var newtext = lines.join('\n');
            fs.writeFile(fileName, newtext, 'utf8', function (err: any) {
                if (err)
                    return console.log(err);
                CommonFunctions.sleep(10000);
            });
        });
        await console.log("Successfully Removed the line with keyword: " + keyword + " from the File.");
    }

    public static async getLineCountInFile(fileName: string): Promise<number> {
        var fs = require('fs');
        var array: string[] = fs.readFileSync(fileName).toString().split("\n");
        // await this.logMessage(null, "INFO", "Lines Count: " + array.length);
        await console.log("Lines Count: " + array.length);
        return array.length;
    }

    public static async subHoursFromPDTTime(intHours: number): Promise<string> {
        // const moment = require('moment');
        let d = new Date();
        d.setHours(d.getHours() - intHours);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -7;
        let PDT = utc + (3600000 * offset);
        let PDTTime = new Date(PDT);
        // PDTTime = moment(PDTTime).format('YYYY-MM-DD HH:MM:ss');
        PDTTime = dateFormat(PDTTime,'yyyy-mm-dd hh:MM:ss');
        let dt = PDTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }

    public static async getDaysDiffFromCurrentDate(dtDate:Date):Promise<number>{
        let dtCurrdate = new Date();
        await this.logMessage(Constants.TEST_LOG_FILE, "INFO", "Current date: " + dtCurrdate);
        let diff = Math.abs(dtDate.getTime() - dtCurrdate.getTime());
        await this.logMessage(Constants.TEST_LOG_FILE, "INFO", "diff: " + diff);
        var daysDiff = Math.ceil(diff / (1000 * 3600 * 24)); 
        await this.logMessage(Constants.TEST_LOG_FILE, "INFO", "Days difference between date and Current date: " + daysDiff);
        return daysDiff;
    }

    public static async validateIfDateFormatIsYYYYMMDD(dtDate:any, strDelimiter:string) {
        var temp = dtDate.split(strDelimiter);
        var d = new Date(dtDate);
        await this.logMessage(null, "INFO", "Verifying if date is in YYYYMMDD format");
        return ((d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0]));
    }

    public static async getDataFromFileAsDictionary(strFileName:string): Promise<{[key:string]:string}>{
        let arrData: { [key: string]: string } = {};
        let strTemp:string = fs.readFileSync(strFileName, 'utf-8');
        let lines:Array<string> = strTemp.split("\n");
        // await this.logMessage(null, "INFO", "Reading data from file " + strFileName);
        console.log("Reading data from file " + strFileName);
        for(let line of lines){
            let arrTemp:Array<string> = line.split("=");
            let strKey:string = arrTemp[0].trim();
            let strValue:string = arrTemp[1].trim();
            await this.logMessage(null, "INFO", "key: " + strKey + ", " + "value: " + strValue);
            console.log("key: " + strKey + ", " + "value: " + strValue);
            arrData[strKey] = strValue;
        }
        return arrData;
    }   
    
    public static async readJSONDataFromFile(fileName: string, key:string): Promise<any> {
        var fs = require("fs");
        var contents = await fs.readFileSync(fileName);
        var jsonContent = await JSON.parse(contents);
        return await jsonContent[key];
    }
    
    public static async getTimeDifference(dtDate1:Date, dtDate2:Date){

        let localTime1 = dtDate1.getTime();
        let localOffset1 = dtDate1.getTimezoneOffset() * 60000;
        let utc1 = localTime1 + localOffset1;

        let localTime2 = dtDate2.getTime();
        let localOffset2 = dtDate2.getTimezoneOffset() * 60000;
        let utc2 = localTime2 + localOffset2;

        let seconds = ((utc2-utc1)/1000) - 41400;
        // await this.logMessage(null, "INFO", "Time difference in seconds is: " + seconds);
        console.log("Time difference in seconds is: " + seconds);
        return seconds;
    }
    
    public static async createFolder(strParentFolder:string, strFolderNames:string){

        let arrFolders:string[] = strFolderNames.split(",");

        for(var i=0; i<arrFolders.length; i++){
            fs.mkdir(path.join(Constants.PROJECT_FOLDER, strParentFolder, arrFolders[i]), { recursive: true }, function(err:any) {
                if (err)   console.log(" Results directory NOT created." + err);
                else       console.log(" Results directory successfully created.");            
            })
        }

    }

    public static async convertDateIntoFormat(date:Date):Promise<any>{
        let dateTime = new Date(date); 
        var datestring = (dateTime.getFullYear() + "-" + ("0"+(dateTime.getMonth()+1)).slice(-2) + "-" +("0" + dateTime.getDate()).slice(-2)+ " " + ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2)+ ":" + ("0" + dateTime.getSeconds()).slice(-2));
        await console.log(datestring);  
        return datestring; 
    }

    public static async getDateWithoutTime(date:Date):Promise<any>{
        let dateTime = new Date(date); 
        var datestring = (dateTime.getFullYear() + "-" + ("0"+(dateTime.getMonth()+1)).slice(-2) + "-" +("0" + dateTime.getDate()).slice(-2));
        await console.log(datestring);  
        return datestring; 
    }

    public static async timeDiffInMilliSec(date1:string,date2:string,hours:boolean,mins:boolean,seconds:boolean){
        let startDate = new Date(date1);
        let localTime1 = startDate.getTime();  
        //await console.log(localTime1);
        let endDate = new Date(date2);
        let localTime2 = endDate.getTime();  
        //await console.log(localTime2);
        let timeDiff=0;
        if(localTime1>localTime2){
            timeDiff = localTime1 - localTime2;
        }
        else if(localTime1<localTime2){
            timeDiff = localTime2 - localTime1;
        }
        if(hours == true){
            let sec = Math.floor(timeDiff / 1000);
            let minutes =Math.floor( sec/60);
            let hrs =Math.floor( minutes/60);
            return hrs;
        }
        if(mins == true){
            let sec = Math.floor(timeDiff / 1000);
            let minutes =Math.floor( sec/60);
            return minutes;
        }
        if(seconds == true){
            let sec = Math.floor(timeDiff / 1000);
            return sec;
        }
    }

    public static async verifyIfStringContains(anyParentData:any,strChildData:string[]){
        //This methods validates if the actual data contains the String passed as 'String to Verify'
        let strParentData:string = anyParentData.toString();
        let result:boolean[] = [];
        for(var j=0;j<=strChildData.length-1;j++){
            if(strParentData.includes(strChildData[j])){
                await result.push(true);
            }
            else{
                await result.push(false);
                await this.logMessage(null,"INFO",strChildData[j]+"*****************Value NOT PRESENT***************** ++ INDEX VALUE :::: "+j)
            }       
        }
        await this.logMessage(null,"INFO","Result :: "+result);
        if(result.includes(false)){
            return false;
        }
        else{
            return true;
        }
    }

    public static async removeFile(strFilePath:string){
        let isFileRemoved:boolean = false;
        try {
            console.info('Removing file: ' + strFilePath);
            fs.unlinkSync(strFilePath);
            console.info('File Removed successfully');
            // await this.logMessage(null, "INFO", "File Removed");
            isFileRemoved = true;
        } catch(err) {
            console.error("Error occurred while trying to remove file");
            // await this.logMessage(null, "WARNING", "Error occurred while trying to remove file");
        }
        return isFileRemoved;
    }

    public static async runCommand(strCommand:string){
        var child_process = require('child_process');
        var resp = await child_process.execSync(strCommand);
        var result = await resp.toString('UTF8');        
        // await CommonFunctions.logMessage(Constants.TEST_LOG_FILE, "INFO", "Command Output :: " + result);
        return await result;
    }

    public static async getValueFromResponse(strResponse:string, strQuery:string){
        let strRes = await jsonPath.query(strResponse,strQuery.toString());
        return await strRes;
    }

    public async getRecentFileFromDirectory(strDirectoryName:string) {
        var fs = require('fs');
        var path = require('path');
        var _ = require('underscore');

        var files = fs.readdirSync(strDirectoryName);

        return _.max(files, function (f:any) {
            var fullpath = path.join(strDirectoryName, f);
            return fs.statSync(fullpath).ctime;
        });
    }

    //For Time Difference in Seconds in Fusion VM. Time zone is in PDT
    public static async getPDTTimeDifference(dtDate1:Date, dtDate2:Date){

        let time1 = dtDate1.getTime();
        let time2 = dtDate2.getTime();

        let seconds = Math.abs((time1-time2)/1000);
        console.log("seconds: " + seconds);
        // await this.logMessage(null, "INFO", "Time difference in secoonds is: " + seconds);
        return seconds;
    }

    public static async getDateInFormat(dtDate:Date, strFormat:string){
        let strDate = dateFormat(dtDate, strFormat);
        console.log("Formatted date: " + strDate);
        // await this.logMessage(null, "INFO", "Formatted date: " + strDate);
        return strDate;
    }

    public static async verifyIfTextExistsInFile(strFileName: string, strKey: string): Promise<string> {
        return new Promise(function (resolve, reject) {
            let rl = readline.createInterface({
                input: fs.createReadStream(strFileName)
            });

            let isFound:boolean = false;
            rl.on('line', function (line) {
                if (line.includes(strKey)) {
                    isFound = true;
                    resolve("true");
                }
            });

            rl.on('close', function(){
                if(!isFound){
                    reject("false");
                }
            });
        });
    }

    public static async readDataFromXMLFile(strFileName: string) {
        return new Promise(function (resolve, reject) {
            var fs = require('fs');
            var xml2js = require('xml2js');
    
            var parser = new xml2js.Parser();
            fs.readFile(strFileName, function (err:any, data:any) {
                if (err) {
                    console.log(err);
                }
                parser.parseString(data, function (err:any, result:any) {
                    if (err) {
                        console.log(err);
                    }
                    let jsonRes = JSON.stringify(result);
                    // console.dir("JSON result: " + jsonRes);
                    resolve(jsonRes);
                });
            });
        });
    }

    public static async updateDataInCsv(strSrcFilePath:string, strColumnsToUpdate:string, strDataToUpdate:string,
        strNewFilePath:string){
        let fs = require('fs');

        fs.readFile(strSrcFilePath, 'utf8', function(err:any, data:any){
            if(err){
                throw err;
            }
            let arrData = data.split('\n');
            let lineCount = arrData.length;

            let arrColumns = arrData[1].split(",");
            let columnsCount = arrColumns.length;

            let arrColsToUpdate = strColumnsToUpdate.split(",");
            let k = 0;

            for(var i=3; i<lineCount-1; i++){
                for(var j=0; j<columnsCount; j++){
                    if(arrColumns[j] == arrColsToUpdate[k]){
                        let arrLineData = arrData[i].split(",");
                        let temp = arrLineData[j] + strDataToUpdate;
                        arrLineData[j] = temp;
                        arrData[i] = arrLineData.join(',');
                        k++;
                    }
                    if(k == arrColsToUpdate.length){
                        break;
                    }
                }
                k=0;
            }

            let updatedData = arrData.join("\n");

            fs.writeFile(strNewFilePath, updatedData, function(err:any){
                if(err){
                    throw err;
                }
            })
        })
        return true;
    }

    public static async getCountOfOccurances(strparentString:string, strRegularExpression:string){
        let len = strparentString.match(new RegExp(strRegularExpression, "g"))?.length;
        let count = (len == undefined)? 0 : len;
        console.log("count: " + count);
        return count;
    }

    public static async getDataFromCSVFile(strFileName:string){
        return new Promise(function (resolve, reject) {
            var fs = require('fs');
    
            fs.readFile(strFileName, 'utf-8', function (err:any, data:any) {
                if (err) {
                    console.log(err);
                }

                let arrData:string[] = data.split('\n');
                resolve(arrData);
            });
        });
    }

}
