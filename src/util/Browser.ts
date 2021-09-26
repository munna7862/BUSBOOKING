import { Builder, WebDriver, WebElement } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

export class Browser{
    public static async getDriver(strBrowser:string){
        let driver:WebDriver;
        let sBrowser:string = strBrowser.toLowerCase();

        switch(sBrowser){
            case "chrome":
                driver = await this.getChromeDriver();
                break;
            case "firefox":
                driver = await this.getFireforDriver();
                break;
            case "edge":
                driver = await this.getEdgeDriver();
                break;
            default:
                driver = await this.getChromeDriver();
                break;
        }

        await driver.manage().window().maximize();
        return driver;
    }

    public static async getChromeDriver(){
        let driver:WebDriver;
        driver = await new Builder().forBrowser("chrome").build(); 
        return driver;
    }
    public static async getFireforDriver(){
        let driver:WebDriver;
        driver = await new Builder().forBrowser("firefox").build(); 
        return driver;
    }
    public static async getEdgeDriver(){
        let driver:WebDriver;
        driver = await new Builder().forBrowser("MicrosoftEdge").build(); 
        return driver;
    }
}