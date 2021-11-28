import { Constants } from "./Constants";
import { logging, WebDriver } from "selenium-webdriver";
import { Browser } from "./Browser";
import * as readline from 'readline';
var dateFormat = require('dateformat');
var jsonPath = require('jsonpath');
var path = require('path');
const fs = require('fs');

export class CommonFunctions{

    public static strBrowserName:string="";

    public static async getBrowserDriver(strBrowser:string){
        this.strBrowserName = strBrowser;
        let driver:WebDriver =  await Browser.getBrowserDriver(strBrowser);
        return driver;
    }

    public static async loadURL(driver:WebDriver,sURL:string){
        await console.log("Launching URL: " + sURL);
        await driver.get(sURL);
        let sTitle:string = await driver.getTitle();
        await console.log("Page Title is: "+sTitle);
        await driver.manage().window().maximize();
        return driver;
    }

    public static async getTimeStamp(){
        return await new Date().toLocaleString().replace(/\//g, "").replace(/,/,"").replace(/ /g,"_").replace(/:/g,"");
    }

    public static async createFolder(sFileParentFolder:string, sFolderNames:string){
        let arrFolder:string[] = sFolderNames.split(",");
        for(let i=0;i<arrFolder.length;i++){
            fs.mkdir(path.join(Constants.PROJECT_FOLDER, sFileParentFolder, arrFolder[i]),{ recursive: true },function(err:any){
                if(err){console.log("Results directory NOT created. "+err);}
                else{console.log("Results directory successfully created.");
                }
            })
        }
    }

    public static async logMessage(sLogLevel: any, sMessage: any) {
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

    public static async takeScreenShot(driver: WebDriver, strScreenShotFolder: string): Promise<string> {
        try{
        let strTimeStamp = await CommonFunctions.getTimeStamp();
        let strFileName = await path.join(strScreenShotFolder, strTimeStamp + ".png");
        await console.log(strFileName);

        let sBrowserName: string = await driver.executeScript("return navigator.userAgent", "");
        if (await sBrowserName.toUpperCase().includes("FIREFOX")) {
            let logs = await driver.manage().logs().get("browser");
            await console.log(logs);
        }

        await driver.takeScreenshot().then(async function (data) {
            let base64Data: string = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFile(strFileName, base64Data, 'base64', function (error: any) {
                if (error) console.log(error);
            });
        });

        if(await this.strBrowserName.toUpperCase().includes("CHROME")){
            let logs = await Constants.driver.manage().logs().get(logging.Type.BROWSER);
            await console.log("Capturing Browser Logs");
            for(let i=0;i<logs.length;i++){
                let jsonLog = logs[i].toJSON();
                await console.log(JSON.stringify(jsonLog));
            }
        }
        await this.logMessage("INFO", "Screenshot Path: " + strFileName);

        var addContext = require('mochawesome/addContext');
        addContext(Constants.TEST_OBJECT, { title: 'Screenshot', value: strFileName});

        return await strFileName;
    }
    catch(err){
        return "unable to take Screenshot";
    }

    }

    public static async appendToTestSummary(sTestSummaryFile: string = "", sTestCase: string = "", sStatus: any) {
        if ((sStatus == "FAILED") || (sStatus == false)) { sStatus = "FAILED" + "***"; }
        else { sStatus = "PASSED"; }
        await fs.appendFile(sTestSummaryFile, sTestCase.padEnd(35) + "\t" + sStatus + "\n", (err: any) => {
            if (err) console.log(err);
        });
    }

    public static async appendToFile(filename: string, data: string) {
        const fs = require('fs');
        fs.appendFile(filename, data, 'utf8', (err: any) => {
            if (err) console.log(err);
            console.log("Successfully Appended to File.");
        });
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

    public static async getObjectID(sObjectName: string): Promise<string> {
        let sObjFile = await path.join(__dirname, "..", "ObjectRepository");
        await console.log(sObjFile);
        let sObjID = await this.readDataFromFile(sObjFile, sObjectName);
        return sObjID as string;
    }

    public static async writeToFile(fileName: string, data: string) {
        const fs = require('fs');
        function writingToFile() {
            fs.writeFile(fileName, data, 'utf8', (err: any) => {
                if (err) console.log(err);
            });
        }
        await setTimeout(writingToFile, 7000);
        await console.log("Successfully Written to File.");
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
        await console.log("Lines Count: " + array.length);
        return array.length;
    }

    public static async sleep(time: number) {
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {
            ;
        }
    }

    public static async removeFile(strFilePath:string){
        let isFileRemoved:boolean = false;
        try {
            await console.info('Removing file: ' + strFilePath);
            fs.unlinkSync(strFilePath);
            await console.info('File Removed successfully');
            isFileRemoved = true;
        } catch(err) {
            await console.error("Error occurred while trying to remove file");
        }
        return isFileRemoved;
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

    public static async getDataFromFileAsDictionary(strFileName:string): Promise<{[key:string]:string}>{
        let arrData: { [key: string]: string } = {};
        let strTemp:string = fs.readFileSync(strFileName, 'utf-8');
        let lines:Array<string> = strTemp.split("\n");
        await this.logMessage("INFO", "Reading data from file " + strFileName);
        console.log("Reading data from file " + strFileName);
        for(let line of lines){
            let arrTemp:Array<string> = line.split("=");
            let strKey:string = arrTemp[0].trim();
            let strValue:string = arrTemp[1].trim();
            await this.logMessage("INFO", "key: " + strKey + ", " + "value: " + strValue);
            console.log("key: " + strKey + ", " + "value: " + strValue);
            arrData[strKey] = strValue;
        }
        return arrData;
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

    public static async readJSONDataFromFile(fileName: string, key:string): Promise<any> {
        var fs = require("fs");
        var contents = await fs.readFileSync(fileName);
        var jsonContent = await JSON.parse(contents);
        return await jsonContent[key];
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
                await this.logMessage("INFO",strChildData[j]+"*****************Value NOT PRESENT***************** ++ INDEX VALUE :::: "+j)
            }       
        }
        await this.logMessage("INFO","Result :: "+result);
        if(result.includes(false)){
            return false;
        }
        else{
            return true;
        }
    }

    public static async getValueFromResponse(strResponse:string, strQuery:string){
        let strRes = await jsonPath.query(strResponse,strQuery.toString());
        return await strRes;
    }

    public static async runCommand(strCommand:string){
        var child_process = require('child_process');
        var resp = await child_process.execSync(strCommand);
        var result = await resp.toString('UTF8');        
        await CommonFunctions.logMessage("INFO", "Command Output :: " + result);
        return await result;
    }

    public static async getCountOfOccurances(strparentString:string, strRegularExpression:string){
        let len = strparentString.match(new RegExp(strRegularExpression, "g"))?.length;
        let count = (len == undefined)? 0 : len;
        console.log("count: " + count);
        return count;
    }

    //Need to have a look on below functions-----------------------------------------------------------------------------------------------------

    public static async getUTCTime(): Promise<string> {
        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -5;
        let EST = utc + (3600000 * offset);
        let ESTTime = new Date(EST);    
        var dateFormat = require('dateformat');
        ESTTime= dateFormat(ESTTime, "yyyy-mm-dd hh:MM:ss");
        let dt = ESTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }

    
    public async convertLocalTimeToUTC(date:string){
        let dSplit = date.split(" ");
        let newDate:string="";
        if(dSplit[2]=='America/Chicago'){
            newDate = dSplit[0]+" "+dSplit[1]+"  CST";
        }
        if(dSplit[2]=='America/New_York'){
            newDate = dSplit[0]+" "+dSplit[1]+"  EST"
        }
        else{
            newDate = dSplit[0]+" "+dSplit[1]+" "+dSplit[2];
        }
        var isoDate = new Date(newDate).toISOString();//this will return the UTC Time :: UTC - Coordinated Universal Time})
        // await this.logMessage("INFO","UTC Time :: "+isoDate);
        return isoDate;
    }
  
    public static async subHoursFromUTCTime(intHours: number): Promise<string> {
        let d = new Date();
        d.setHours(d.getHours() - intHours);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -0;
        let EST = utc + (3600000 * offset);
        let ESTTime = new Date(EST);
        ESTTime = dateFormat(ESTTime,'yyyy-mm-dd hh:MM:ss');
        let dt = ESTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }


    public static async addOrSubDaystoDate(date: string, days: number, action: string) {
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
        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -7;
        let PDT = utc + (3600000 * offset);
        let PDTTime = new Date(PDT);
        PDTTime = dateFormat(PDTTime,'yyyy-mm-dd hh:MM:ss');
        let dt = PDTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }


    public static async afterTest(TEST_STATUS: any, driver: any = null, TEST_SCREENSHOT_FOLDER: string = "", TEST_SUMMARY_FILE: string = "", TESTCASE_NAME: string = ""){
        // if(await this.strBrowserName.toUpperCase().includes("CHROME")){
        //     let logs = await Constants.driver.manage().logs().get(logging.Type.BROWSER);
        //     await console.log("Capturing Browser Logs");
        //     for(let i=0;i<logs.length;i++){
        //         let jsonLog = logs[i].toJSON();
        //         await console.log(JSON.stringify(jsonLog));
        //     }
        // }
    }

    public static async subHoursFromPDTTime(intHours: number): Promise<string> {
        let d = new Date();
        d.setHours(d.getHours() - intHours);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = -7;
        let PDT = utc + (3600000 * offset);
        let PDTTime = new Date(PDT);
        PDTTime = dateFormat(PDTTime,'yyyy-mm-dd hh:MM:ss');
        let dt = PDTTime.toLocaleString('en-US', { hour12: false }).replace(/\//g, "-").replace(/,/g, "");
        return dt;
    }


    public static async getDaysDiffFromCurrentDate(dtDate:Date):Promise<number>{
        let dtCurrdate = new Date();
        await this.logMessage("INFO", "Current date: " + dtCurrdate);
        let diff = Math.abs(dtDate.getTime() - dtCurrdate.getTime());
        await this.logMessage("INFO", "diff: " + diff);
        var daysDiff = Math.ceil(diff / (1000 * 3600 * 24)); 
        await this.logMessage("INFO", "Days difference between date and Current date: " + daysDiff);
        return daysDiff;
    }

    public static async validateIfDateFormatIsYYYYMMDD(dtDate:any, strDelimiter:string) {
        var temp = dtDate.split(strDelimiter);
        var d = new Date(dtDate);
        await this.logMessage("INFO", "Verifying if date is in YYYYMMDD format");
        return ((d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0]));
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
        

}