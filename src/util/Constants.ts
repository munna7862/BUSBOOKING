import { CommonFunctions } from "./CommonFunctions";
import { WebDriver } from "selenium-webdriver";
var path = require('path');
const fs = require('fs');


export class Constants{
    
    private static sTSFilePath = __filename;
    public static PROJECT_FOLDER = Constants.sTSFilePath.substring(0, Constants.sTSFilePath.indexOf("Project1") + 8);
    private static TESTCASE_NAME:string;
    private static TEST_DATA_FOLDER:string;
    private static TEST_CONFIG_FILE:any;
    private static TEST_LOG_FOLDER:any;
    private static TEST_LOG_FILE:any;
    private static TEST_SUMMARY_FILE:any;
    private static TEST_DATA_FILE:any;
    private static TEST_DATA_FILE_IN_JSON:any;
    private static TEST_SCREENSHOT_FOLDER:any;

    public static async init_TestConfig(sFilePath:string,testObj:Object,customTestConfig:string=""){
        let sFileParentFolder = await path.dirname(sFilePath).split(path.sep).pop();
        this.TESTCASE_NAME = await sFilePath.slice(sFilePath.lastIndexOf(path.sep)+1,sFilePath.length-3);
        this.TEST_DATA_FOLDER = await path.join(this.PROJECT_FOLDER, "testdata", sFileParentFolder);
        if(customTestConfig==""){
            this.TEST_CONFIG_FILE = await require(await path.join(this.TEST_DATA_FOLDER, "TestConfig.json"));
          }
          else{
            this.TEST_CONFIG_FILE = await require(await path.join(this.TEST_DATA_FOLDER, customTestConfig+".json"));
          }
        this.TEST_LOG_FOLDER = await path.join(this.PROJECT_FOLDER, "results", sFileParentFolder, "Logs");
        this.TEST_LOG_FILE = await path.join(this.TEST_LOG_FOLDER, this.TESTCASE_NAME + ".log");
        this.TEST_SUMMARY_FILE = await path.join(this.PROJECT_FOLDER, "results", sFileParentFolder, "Testsummary.txt");
        this.TEST_DATA_FILE = await path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".txt");
        this.TEST_DATA_FILE_IN_JSON =  await path.join(this.TEST_DATA_FOLDER, this.TESTCASE_NAME + ".json");

        this.TEST_SCREENSHOT_FOLDER = await path.join(this.PROJECT_FOLDER, "results", sFileParentFolder, "Screenshots");
        await CommonFunctions.createFolder(path.join("results",sFileParentFolder),"Logs,Screenshots");


    }
}