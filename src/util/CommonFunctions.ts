import { Constants } from "./Constants";
import { WebDriver } from "selenium-webdriver";
import { Browser } from "./Browser";
var path = require('path');
const fs = require('fs');

export class CommonFunctions{

    public static async getDriver(strBrowser:string){
        let driver:WebDriver =  await Browser.getDriver(strBrowser);
        return driver;
    }

    public static async loadURL(driver:WebDriver,sURL:string){
        await console.log("Launching URL: " + sURL);
        await driver.get(sURL);
        let sTitle:string = await driver.getTitle();
        await console.log("Page Title is: "+sTitle);
        return driver
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

}