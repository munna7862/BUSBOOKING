import { By, WebDriver } from "selenium-webdriver";
import { CommonFunctions } from "./CommonFunctions";
import { LoginPage } from "../pages/LoginPage";

export class TestUtil {
    public driver: WebDriver;
    public CURRENT_URL: string;
    public TEST_LOG_FOLDER: any;
    public TEST_SUMMARY_FILE: string;
    public TEST_LOG_FILE: string;
    public TEST_SCREENSHOT_FOLDER: string;
    public isAlreadyLoggedIn: boolean;
    public strURL:string = "";

    public constructor(driver: WebDriver, URL: string, TEST_LOG_FOLDER: any, TESTCASE_NAME: string, TEST_SUMMARY_FILE: any) {
        var path = require("path");
        this.isAlreadyLoggedIn = false;
        this.driver = driver;
        this.CURRENT_URL = URL;
        this.TEST_LOG_FOLDER = TEST_LOG_FOLDER;
        this.TEST_SUMMARY_FILE = TEST_SUMMARY_FILE;
        this.TEST_SCREENSHOT_FOLDER = path.join(this.TEST_LOG_FOLDER, '..\\Screenshots\\');
        this.TEST_LOG_FILE = path.join(TEST_LOG_FOLDER, TESTCASE_NAME + ".log");
    }

    public async loadURL(sURL: string) {
        this.strURL = sURL;

    }

    public async login(USERNAME: string, PASSWORD: string, INSTANCE_TYPE: string) {
        if(INSTANCE_TYPE.includes("MAIN")){
            await CommonFunctions.loadURL(this.driver, this.strURL);
            let loginPage = await new LoginPage(this.driver,this.TEST_LOG_FILE);
            await loginPage.login(USERNAME,PASSWORD);
        }
    }

    public async logMessage(sLevel: string, sMessage: string) {
        await CommonFunctions.logMessage(sLevel, sMessage);
    }

    public async doMaximizeWindow() {
        await this.driver.manage().window().maximize();
    }

    public async moveFocusToPopup() {
        await this.driver.sleep(5000);
        let AllWindows = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(AllWindows[AllWindows.length - 1]);
        await this.driver.manage().window().maximize();
    }

    public async moveFocusToParentWindow() {
        let AllWindows = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(AllWindows[0]);
    }

    public async closePopUp() {
        let AllWindows = await this.driver.getAllWindowHandles();
        await this.logMessage("INFO", "Closing Popup!");
        await this.driver.close();
        await this.driver.sleep(2 * 1000);
        await this.driver.switchTo().window(AllWindows[AllWindows.length - 2]);
    }

    public async closeAllPopUpsAndSwitchToHomePage(){
        let allWindows = await this.driver.getAllWindowHandles();
        for(var i=allWindows.length-1;i>0;i--){
            await this.driver.switchTo().window(allWindows[i]);
            await this.logMessage("INFO","Closing the Popup Having Title :: "+await this.driver.getTitle());
            await this.driver.close();
        }
        await this.driver.switchTo().window(allWindows[0]);
        await this.logMessage("INFO","Moving the Focus on to the WebPage Having Title :: "+await this.driver.getTitle());
    }

    public async getTitleOfWebPageInsideFrames(){
        await this.driver.sleep(10000);
        await this.moveFocusToPopup();
        await this.driver.switchTo().frame(1);
        //get title of inner frame
        let sTitle = await (await this.driver.findElement(By.tagName("title"))).getAttribute("innerHTML");
        await console.log(sTitle);
        await this.driver.switchTo().defaultContent();
        return await sTitle;
    }

    public async changeDataInFile(filename: string, sValue: string, sRepaceWith: string) {
        await this.driver.sleep(5000);
        await CommonFunctions.changeDataInFile(filename, sValue, sRepaceWith);
        await this.driver.sleep(5000);
        await CommonFunctions.readingFile(filename);
        await this.driver.sleep(5000);
        return await true;
    }

    public async removeLinesFromFile(filename: string, keyword: string) {
        await this.driver.sleep(5000);
        await CommonFunctions.removeLinesFromFile(filename, keyword);
        await this.driver.sleep(5000);
        await CommonFunctions.readingFile(filename);
        await this.driver.sleep(5000);
        return await true;
    }

    public async screenshotCompare(filename1: string, filename2: string, diff_var: string) {
        const fs = require('fs');
        const PNG = require('pngjs').PNG;
        const pixelmatch = require('pixelmatch');
        await this.logMessage("INFO", 'Comparing screenshot ... ');
        const img1 = await PNG.sync.read(fs.readFileSync(filename1));
        await this.driver.sleep(5000);
        const img2 = await PNG.sync.read(fs.readFileSync(filename2));
        await this.driver.sleep(5000);
        const { width, height } = img1;
        let diff = await pixelmatch(img1.data, img2.data, null, img1.height, img1.width, { threshold: 0.10 });
        await this.logMessage("INFO", diff);
        let i: number = parseInt(diff_var);
        await this.logMessage("INFO", 'Comparing Screenshot Completed!!!');
        if (diff <= i) {
            await this.logMessage("INFO", "Screenshot Matched");
            return true;
        }
        else {
            await this.logMessage("INFO", "Screenshot not matched");
            return false;
        }
    }


    public async imageResize(filename: string, height: number, width: number): Promise<string> {
        let file = filename.split(".");
        let file_Name = file[0];
        let sf1 = file_Name.replace(/\\/g, "/");

        await this.logMessage("INFO", 'Reducing image size ... ');
        const sharp = require('sharp');
        let inputFile = sf1 + ".png";
        await console.log("input file is: " + inputFile);
        let outputFile = sf1 + "_copy" + ".png";

        //for screenshots standard height: 876, width: 1920

        //for image standard height: 80, width: 156

        await this.driver.sleep(7000);
        sharp(inputFile).png().resize({ height: height, width: width, fit: 'fill' }).toFile(outputFile,
            function (err: any) {
                if (err) {
                    console.log("Error at reducing size / converting picture : ");
                    console.log(err);
                    return;
                }
            });

        await this.driver.sleep(7000);
        await this.logMessage("INFO", 'Image reduction completed.');

        return outputFile;
    }

    public async cropImage(filename: string, xco: string, yco: string, width: string, height: string): Promise<string> {
        let file = filename.split(".");
        let file_Name = file[0];
        let sf1 = file_Name.replace(/\\/g, "/");
        await this.logMessage("INFO", 'Cropping image size ... ');

        let originalImage = sf1 + ".png";
        let outputImage = sf1 + "_copy" + ".png";
        await this.driver.sleep(5000);

        var Jimp = require('jimp');
        const image = await Jimp.read(originalImage);
        await this.driver.sleep(5000);
        let xcord: number = parseInt(xco);
        let ycord: number = parseInt(yco);
        let imgwidth: number = parseInt(width);
        let imgheight: number = parseInt(height);
        image.crop(xcord, ycord, imgwidth, imgheight, function (err: any) {
            if (err) {
                console.log("An error occured");
                console.log("-------" + err);
            }
        })
            .write(outputImage);
        await this.driver.sleep(7000);
        await this.logMessage("INFO", 'Image cropping completed.');
        return outputImage;
    }

    public async compareTwoValues(actualValue: string, expectedValue: string, message:string) {
        await this.logMessage("INFO", "Actual Value : " + actualValue);
        await this.logMessage("INFO", "Expected Value : " + expectedValue);
        if (actualValue == expectedValue) {
            await this.logMessage("INFO", message+" :Success and the value is: "+actualValue);
            return true;
        }
        else {
            await this.logMessage("INFO", message+" Failed");
            return false;
        }
    }

    public async compareArrayValues(actualArray:any, expectedArray:any, message:string) {
        await this.logMessage("INFO", "Actual Array : " + actualArray);
        await this.logMessage("INFO", "Expected Array : " + expectedArray);
        if(actualArray.length!=expectedArray.length){
            await this.logMessage("INFO", message+" Failed")
            return false;
        }
        for(let i=0, len=actualArray.length;i<len;i++){
            if(actualArray[i]!=expectedArray[i]){
                await this.logMessage("INFO", message+" Failed")
                return false;
            }
        }
        await this.logMessage("INFO", message+" :Success and the value is: "+actualArray);
        return true;
    }

}