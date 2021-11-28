import { CommonFunctions } from "./CommonFunctions";
import { WebDriver } from "selenium-webdriver";
var path = require('path');
const fs = require('fs');

export class Constants{

  public static SCRIPT_TIMEOUT = 60000;
  public static PAGE_LOAD_TIMEOUT = 100000;
  public static OBJECT_LOAD_TIMEOUT = 100000;
  public static PAGE_TITLE_TIMEOUT = 100000;

  private static sTSFilePath = __filename;
  public static PROJECT_FOLDER = Constants.sTSFilePath.substring(0, Constants.sTSFilePath.indexOf("UIAutomation") + 12);

  public static EnvConfig:any;
  public static sURL:string;
  public static sBROWSER:string;
  public static driver:WebDriver;
  public static INSTANCE_TYPE:any;
  public static nRetries:any;

  public static TESTCASE_NAME:string;
  public static TEST_DATA_FOLDER:string;
  public static TEST_CONFIG_FILE:any;
  public static TEST_LOG_FOLDER:any;
  public static TEST_LOG_FILE:any;
  public static TEST_SUMMARY_FILE:any;
  public static TEST_DATA_FILE:any;
  public static TEST_DATA_FILE_IN_JSON:any;
  public static TEST_SCREENSHOT_FOLDER:any;
  public static TEST_OBJECT:any;

    public static async init_TestConfig(sFilePath:string, testObj:object, customTestConfig:string=""){
      let sFileParentFolder = await path.dirname(sFilePath).split(path.sep).pop();
      this.TESTCASE_NAME = await sFilePath.slice(sFilePath.lastIndexOf(path.sep)+1,sFilePath.length-3);
      this.TEST_DATA_FOLDER = await path.join(this.PROJECT_FOLDER, "Testdata", sFileParentFolder);
      if(customTestConfig==""){
          this.TEST_CONFIG_FILE = await require(await path.join(this.TEST_DATA_FOLDER, "TestConfig.json"));
        }
        else{
          this.TEST_CONFIG_FILE = await require(await path.join(this.TEST_DATA_FOLDER, customTestConfig+".json"));
        }
      this.TEST_LOG_FOLDER = await path.join(this.PROJECT_FOLDER, "Results", sFileParentFolder, "Logs");
      this.TEST_LOG_FILE = await path.join(this.TEST_LOG_FOLDER, this.TESTCASE_NAME + ".log");
      this.TEST_SUMMARY_FILE = await path.join(this.PROJECT_FOLDER, "Results", sFileParentFolder, "Testsummary.txt");
      this.TEST_DATA_FILE = await path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".txt");
      this.TEST_DATA_FILE_IN_JSON =  await path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".json");
      //JSON  
      this.TEST_SCREENSHOT_FOLDER = await path.join(this.PROJECT_FOLDER, "Results", sFileParentFolder, "Screenshots");
      await CommonFunctions.createFolder(path.join("Results",sFileParentFolder),"Logs,Screenshots");
      this.TEST_OBJECT = testObj;
      this.EnvConfig = await require(Constants.PROJECT_FOLDER+"\\EnvironmentConfig.json");
      let strInstance:string = this.TEST_CONFIG_FILE.INSTANCE_TYPE;
      this.sURL = await this.getURL(strInstance);
      this.sBROWSER = await this.getBrowser();
      this.nRetries = await this.EnvConfig.RETRIES;
      this.driver = await CommonFunctions.getBrowserDriver(this.sBROWSER);
      this.INSTANCE_TYPE = await this.getInstance(strInstance);
      await this.driver.manage().setTimeouts({implicit: this.OBJECT_LOAD_TIMEOUT, pageLoad: this.PAGE_LOAD_TIMEOUT, script: this.SCRIPT_TIMEOUT});
    }

    private static async getURL(strInstance:string){
      let strURL:string="";
      strURL = await Constants.EnvConfig[strInstance+"_URL"];
      return strURL;
    }

    private static async getBrowser(){
      let strBrowser:string = await this.EnvConfig.BROWSER;
      return strBrowser;
    }

    private static async getInstance(strInstance:string){
      let strEnvInstance:string = "";
      if(strInstance=="QAMAIN"){
        strEnvInstance = "QAMAIN"
      }
      return strEnvInstance;
    }

    public static async getTestLogFile(){
      let strTestLogFile:string = await Constants.TEST_LOG_FILE;
      return strTestLogFile;
    }

    public static async getTestObject(){
      let strTestObject:string = await Constants.TEST_OBJECT;
      return strTestObject;
    }

}