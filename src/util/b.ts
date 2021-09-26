import { CommonFunctions } from "./CommonFunctions";
import { WebDriver } from "selenium-webdriver";
​
var path = require('path');
const fs = require('fs');
​
export class Constants
{
    public static OTM_RESOURCE_LIST_SERVERS         = "http://slc12bgf.us.oracle.com/servers/servers.html"; 
    public static OTM_RESOURCE_LIST_TEST_SERVERS    = "http://slc12bgf.us.oracle.com/servers/servers-test.html"; 
​
    public static EMAIL_IMAP_URL        = "imaps://stbeehive.oracle.com";  // Dont give slash (/) at the end
​
    public static SCRIPT_TIMEOUT        = 100000; 
    public static PAGE_LOAD_TIMEOUT     = 100000; 
    public static OBJECT_LOAD_TIMEOUT   = 80000; 
    public static PAGE_TITLE_TIMEOUT    = 60000; 
    
    public static CHROME_POPUP_WAITTIME = 8000; 
    public static FIREFOX_POPUP_WAITTIME= 8000; 
​
    public static BROWSER : string;
​
    private static strTempPath = __filename;
    public static PROJECT_FOLDER = Constants.strTempPath.substring(0, Constants.strTempPath.indexOf("UIAutomation") + 12);
​
    public static envConfig:any;
    public static sURL:string;
    public static sBROWSER:string;
    public static driver:WebDriver;
    public static INSTANCE_TYPE:string;
    public static nRetries:number;
    public static DBA_USERNAME:string;
    public static DBA_PASSWORD:string;
    public static ZIMBRA_EMAIL_USER:string;
    public static ZIMBRA_EMAIL_PASSWORD:string;
​
    public static TEST_CONFIG_FILE:any;
    public static TEST_DATA_FOLDER:string;
    public static TEST_LOG_FOLDER:string;
    public static TEST_LOG_FILE:string;
    public static TEST_SUMMARY_FILE:string;
    public static TEST_DATA_FILE:string;
    public static TEST_DATA_FILE_IN_JSON :string;
    public static TEST_SCREENSHOT_FOLDER:string;
    public static TESTCASE_NAME:string;
    public static TEST_OBJECT:Object;
    public static JSON_DATA :any;
​
    public static async init_TestConfig(sParentFolderPath:string, sFilePath:string, testObj:Object, customTestConfig:string=""){
        let sParentFolder = await path.dirname(sParentFolderPath).split(path.sep).pop();
        this.TESTCASE_NAME = sFilePath.slice(sParentFolderPath.lastIndexOf(path.sep) + 1, sFilePath.length - 3);
        this.TEST_DATA_FOLDER = await path.join(this.PROJECT_FOLDER, "Testdata", sParentFolder);
        if(customTestConfig==""){
          this.TEST_CONFIG_FILE = await require(await path.join(this.TEST_DATA_FOLDER, "TestConfig.json"));
        }
        else{
          this.TEST_CONFIG_FILE = await require(await path.join(this.TEST_DATA_FOLDER, customTestConfig+".json"));
        }
        
        this.TEST_LOG_FOLDER = await path.join(this.PROJECT_FOLDER, "Results", sParentFolder, "Logs");
        this.TEST_LOG_FILE = await path.join(this.TEST_LOG_FOLDER, this.TESTCASE_NAME + ".log");
        this.TEST_SUMMARY_FILE = await path.join(this.PROJECT_FOLDER, "Results", sParentFolder, "Testsummary.txt");
        this.TEST_DATA_FILE = await path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".txt");
        this.TEST_DATA_FILE_IN_JSON =  await path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".json");
        try {
            if (fs.existsSync(Constants.TEST_DATA_FILE_IN_JSON)) {
                this.JSON_DATA = await require(Constants.TEST_DATA_FILE_IN_JSON);
            }
          } catch(err) {
            console.error(err)
          }
        this.TEST_SCREENSHOT_FOLDER = await path.join(this.PROJECT_FOLDER, "Results", sParentFolder, "Screenshots");
​
        await CommonFunctions.createFolder(path.join("Results",sParentFolder), "Logs,Screenshots");
​
        this.TEST_OBJECT = testObj;
​
        this.envConfig = await require(Constants.PROJECT_FOLDER + "\\EnvironmentConfig.json");
        let strInstance:string = this.TEST_CONFIG_FILE.INSTANCE_TYPE;
        let useResourceList:boolean = await this.envConfig.USE_RESOURCE_LIST;
        this.sURL = await this.getURL(useResourceList, strInstance);
        this.sBROWSER = await this.getBrowser();
        this.nRetries = parseInt(await this.envConfig.RETRIES);
        this.DBA_USERNAME = await this.envConfig[strInstance + "_DBA_USERNAME"];
        this.DBA_PASSWORD = await this.envConfig[strInstance + "_DBA_PASSWORD"];
        this.ZIMBRA_EMAIL_USER = await this.envConfig.ZIMBRA_EMAIL_USER;
        this.ZIMBRA_EMAIL_PASSWORD = await this.envConfig.ZIMBRA_EMAIL_PASSWORD;
        this.driver = await CommonFunctions.getDriver(this.sBROWSER);
        this.INSTANCE_TYPE = await this.getInstance(strInstance);
        await this.driver.manage().setTimeouts({ implicit: this.OBJECT_LOAD_TIMEOUT, pageLoad: this.PAGE_LOAD_TIMEOUT, script: this.SCRIPT_TIMEOUT });
    }
​
    private static async getInstance(strInstance: string){
      let strEnvInstance: string = "";
      switch(strInstance){
        case "QACLOUD_DAILY":
        case "QACLOUD_MIG":
        case "QACLOUD_WEEKLY":
        case "QACLOUD":
          strEnvInstance = "QACLOUD";
          break;
​
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
      return strEnvInstance;
    }
​
    private static async getURL(useResourceList:boolean, strInstance:string){
      let strURL:string = "";
​
      if(useResourceList){
        strURL = await Constants.envConfig.QAMAIN_RESOURCE_LIST_NAME;
      } else{
        strURL = await Constants.envConfig[strInstance + "_URL"];
      }
      return strURL;
    }
​
    public static async setTimeouts(intObjectLoadTimeOut:any = "", intPageLoadTimeout:any = "", intScriptTimeout:any = ""){
      if(intObjectLoadTimeOut != ""){
        this.OBJECT_LOAD_TIMEOUT = intObjectLoadTimeOut;
      }
      if(intPageLoadTimeout != ""){
        this.PAGE_LOAD_TIMEOUT = intPageLoadTimeout;
      }
      if(intScriptTimeout != ""){
        this.SCRIPT_TIMEOUT = intScriptTimeout;
      }
      await this.driver.manage().setTimeouts({ implicit: this.OBJECT_LOAD_TIMEOUT, pageLoad: this.PAGE_LOAD_TIMEOUT, script: this.SCRIPT_TIMEOUT });
    }
​
    public static async getTestLogFile(){
      let strTestLogFile = await Constants.TEST_LOG_FILE;
      return strTestLogFile;
    }
​
    public static async getTestObject(){
      let strTestObject = await Constants.TEST_OBJECT;
      return strTestObject;
    }

    public static async getBrowser(){
      let strBrowser = await this.envConfig.BROWSER;
      if(strBrowser.toLowerCase() == "random"){
        var dtDate = new Date();
        let strDay = dtDate.getDate();
        let val = strDay/7;

        if(Math.ceil(val) == 1){
          strBrowser = "chrome";
        }else if(Math.ceil(val) == 2){
          strBrowser = "firefox";
        }else if(Math.ceil(val) == 3){
          strBrowser = "edge";
        }else{
          strBrowser = "chrome";
        }
      }
      return strBrowser;
    }
​
}