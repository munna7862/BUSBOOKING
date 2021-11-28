import { WebElement, WebDriver, By, until, Key } from "selenium-webdriver";
import { CommonFunctions } from "./CommonFunctions";
import * as fs from 'fs';
import { Constants } from "./Constants";
const path = require('path');

export class Page {
    public driver: WebDriver;
    public logFile: any;
    public screenShotsFolder: any;

    constructor(driver: WebDriver, LogFile: string) {
        this.driver = driver;
        this.logFile = LogFile;
        this.screenShotsFolder = path.join(this.logFile, '..\\..\\Screenshots\\');
    }

    public async loadUrl(sUrl: string) {
        await this.driver.get(sUrl);
    }

    public async logMessage(sLogLevel: any, sMessage: any) {
        CommonFunctions.logMessage(sLogLevel, sMessage);
    }

    public async waitUntilElementLocated(Locator: By) {
        await this.driver.wait(await until.elementLocated(Locator), Constants.PAGE_TITLE_TIMEOUT);
    }

    public async waitUntilPageTitleContains(sTitle: string) {
        await this.driver.wait(await until.titleContains(sTitle), Constants.PAGE_TITLE_TIMEOUT);
        await this.logMessage("INFO", "Page title :: " + await this.driver.getTitle());
    }

    public async doSwitchToDefaultContent() {
        await this.driver.switchTo().defaultContent();
    }

    public async doSwitchToFrame(sNameIndex: number | By) {
        if (typeof (sNameIndex) == "number") await this.driver.switchTo().frame(sNameIndex);
        else if (typeof (sNameIndex) == "object") await this.driver.switchTo().frame(this.driver.findElement(sNameIndex));
    }

    public async ischeckBoxSelected(sLocator : By){
        await this.waitUntilElementLocated(sLocator);
        let isSelected = await this.driver.findElement(sLocator).isSelected();
        return isSelected;
    }
    
    public async isDisplayed(byLocator:By){
        let webElement;
        let isDisplayed = false;
        try{
            webElement = await this.driver.findElement(byLocator);
            isDisplayed = await webElement.isDisplayed();
            await this.logMessage("INFO", "isDisplayed: " + isDisplayed);
        }catch(error){
            await this.logMessage("WARNING", "Element is not present");
        }
        return isDisplayed;
    }

    public async getAlertText(){
        try{
            let alert = await this.driver.switchTo().alert();
            let strText = await alert.getText();
            await this.logMessage("INFO", "Alert Text: " + strText);
            await alert.accept();
            return strText;
        }catch(error){
            await this.logMessage("WARNING", error);
            return null;
        }
    }

    public async doGetAttribute(sLocatorID: By, sAttribute: string, sLogMessage: string): Promise<string> {
        await this.logMessage("INFO", sLogMessage);
        let WebElement = await this.driver.findElement(sLocatorID);
        return await WebElement.getAttribute(sAttribute);
    }

    public async doGetText(sLoctorID: By, sLogMessage: string) {
        if(sLogMessage!="")
        await this.logMessage("INFO", sLogMessage);
        let WebElement = await this.driver.findElement(sLoctorID);
        await this.driver.wait(until.elementIsVisible(WebElement), Constants.PAGE_TITLE_TIMEOUT);      
        return await WebElement.getAttribute("textContent");
    }

    public async doEnterText(sLoctorID: By, sValue: string, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);
        await this.waitUntilElementLocated(sLoctorID);
        let WebElement = await this.driver.findElement(sLoctorID);
        await this.driver.wait(await until.elementIsVisible(WebElement), 30000);
        await WebElement.clear();
        await WebElement.sendKeys(sValue);
    }

    public async doEnterTextUsingJSExecutor(sLocatorID:By,sValue:string,sLogMessage:string){
        await this.logMessage("INFO", sLogMessage);
        let webElement = await this.driver.findElement(sLocatorID);
        await this.driver.executeScript("arguments[0].removeAttribute('value')", webElement);
        await this.driver.executeScript("arguments[0].setAttribute('value', '" + sValue +"')", webElement);
    }

    public async doGetElementsByLocator(byLocator:By, switchToFrame:any = null){
        if(switchToFrame != null){
            await this.doSwitchToFrame(switchToFrame);
        }
        let elements:WebElement[] = await this.driver.findElements(byLocator);
        await this.doSwitchToDefaultContent();
        return elements;
    }

    public async doClick(sLoctorID: By, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);
        await this.waitUntilElementLocated(sLoctorID);
        let WebElement = await this.driver.findElement(sLoctorID);
        await this.driver.wait(await until.elementIsVisible(WebElement), 120000);
        await WebElement.click();
        await this.driver.sleep(1000);
    }

    public async doScrollToView(elementXpath: By) {
        let element = await this.driver.findElement(elementXpath);
        await this.driver.executeScript("arguments[0].scrollIntoView()", element);
        await this.driver.sleep(3000);
    }

    public async doSelect(sLocatorID: By, sValue: string, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage); 
        await this.waitUntilElementLocated(sLocatorID);
        await this.doScrollToView(sLocatorID)      
        await this.driver.sleep(5000);
        await this.driver.findElement(sLocatorID).sendKeys(sValue);
        await this.driver.sleep(5000);
        await this.driver.findElement(sLocatorID).click();
        await this.driver.sleep(5000);
    }

    public async doMultipleSelect(sLoctorID: By, sValues:string, sLogMessage : string){
        await this.logMessage ("INFO", sLogMessage);
        await this.driver.wait(await until.elementIsVisible(await this.driver.findElement(sLoctorID)), 30000);
        let isMultipleON:string = await this.doGetAttribute(sLoctorID, "multiple", "");
        await console.log("isMultipleON: " + isMultipleON);
        if(isMultipleON){
            let actions = await this.driver.actions({ bridge: true });
            await actions.keyDown(Key.CONTROL).perform();
            let valuestoSelect:any = sValues.split(",");
            for(var value of valuestoSelect){
                console.log("value: " + value);
                await this.doScrollToView(By.xpath("//option[text()='" + value + "']"));
                await this.doClick(By.xpath("//option[text()='" + value + "']"), "Selecting Element " + value);
            }
            await actions.keyUp(Key.CONTROL).perform();
        }
    }       
           
    public async doSelect_withClicks(sLocatorID: By, sValue: string, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);     
        await this.waitUntilElementLocated(sLocatorID);
        await this.doScrollToView(sLocatorID)
        await this.driver.sleep(5000);
        await this.doClick(sLocatorID,"Clicking on the DropDown Selector");
        await this.driver.sleep(5000);
        try {
            await this.doClick(By.xpath("(//option[@value='"+sValue+"'] | //option[@title='"+sValue+"'] | //option[text()='"+sValue+"'])"),"Clicking/Selecting on the DropDown Value :: "+sValue);
        } catch (error) {
            await this.doClick(By.xpath("//option[contains(text(),'"+sValue+"')]"),"Clicking/Selecting on the DropDown Value :: "+sValue);
        }
        await this.driver.sleep(5000);
    }

    public async doDragAndDrop(fromElementLocator: By, toElementLocator: By, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);
        await this.doScrollToView(fromElementLocator);
        await this.doScrollToView(toElementLocator);
        let fromSource = await this.driver.findElement(fromElementLocator);
        let toDestination = await this.driver.findElement(toElementLocator);
        let actions = await this.driver.actions({ bridge: true });
        await actions.dragAndDrop(fromSource, toDestination).perform();
        await this.driver.manage().setTimeouts({ implicit: 30000, pageLoad: 30000, script: 30000 });
    }

    public async doGetElement(sTagName: string, sText: string): Promise<WebElement[]> {
        let sObjectId = '//' + sTagName + '[text()="' + sText + '"]';
        return this.driver.findElements(By.xpath(sObjectId));
    }

    public async takeScreenShot(): Promise<string> {
        let ScreenShotName = await CommonFunctions.getTimeStamp();
        let sFileName = await path.join(this.screenShotsFolder, ScreenShotName + ".png");
        await this.logMessage("INFO", sFileName);
        await this.driver.takeScreenshot().then(function (data) {
            let base64Data: string = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFile(sFileName, base64Data, 'base64', function (error: any) {
                if (error) console.log(error);
            });
        });
        return await sFileName;
    }

    public async takeScreenShotOfWebElement(webElement: WebElement, sScreenShotFolder: string): Promise<string> {
        let ScreenShotName = await CommonFunctions.getTimeStamp();
        let sFileName = await path.join(sScreenShotFolder, ScreenShotName + ".png");
        await this.logMessage("INFO","File Stored at :: "+sFileName);
        await webElement.takeScreenshot().then(async function (data) {
            let base64Data: string = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFile(sFileName, base64Data, 'base64', function (error: any) {
                if (error) console.log(error);
            });
        });
        var addContext = require('mochawesome/addContext');
        addContext(Constants.TEST_OBJECT, { title: 'Screenshot', value: sFileName});
        return await sFileName;
    }

    public async doDoubleClick(sLoctorID: WebElement, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);
        await this.driver.wait(until.elementIsVisible(sLoctorID), 30000);
        let actions = await this.driver.actions({ bridge: true });
        await actions.doubleClick(sLoctorID).perform();
    }

    public async doDoubleClick1(sLoctorID: By, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);
        let WebElement = this.driver.findElement(sLoctorID);
        await this.driver.wait(until.elementIsVisible(WebElement), 30000);
        let actions = await this.driver.actions({ bridge: true });
        await actions.doubleClick(WebElement).perform();
    }

    public async doClear(sLoctorID: By, sLogMessage: string) {
        await this.logMessage("INFO", sLogMessage);
        let WebElement = this.driver.findElement(sLoctorID);
        await this.driver.wait(until.elementIsVisible(WebElement), 30000);
        await WebElement.clear();
    }

    
    //Moves cursor to the Locator Coordinates 
    public async doMoveByOffsetCanvas(XCordOffset: any, YCordOffset: any, sLogMessage: string) {
        let actions = await this.driver.actions({ bridge: true });
        await actions.move({ x: parseInt(XCordOffset), y: parseInt(YCordOffset) }).pause(3000).perform();
        await this.logMessage("INFO", "Mouse pointer moved to coordinates" + sLogMessage);
        await this.takeScreenShot();
    }

    //Performs Drag and drop with the coordinates both at source and destination
    public async doDragnDropByOffsetCanvas(XCordOffset: any, YCordOffset: any, newXCordOffset: any, newYCordOffset: any, sLogMessage1: string, sLogMessage2: string) {
        await this.logMessage("INFO", "Moving the element from Source Coordinates " + sLogMessage1);
        let actions = await this.driver.actions({ bridge: true });
        await actions.move({ x: parseInt(XCordOffset), y: parseInt(YCordOffset) }).pause(3000).press().perform();
        await this.logMessage("INFO", "Dropping the element from Destination Coordinates " + sLogMessage2);
        await actions.move({ x: parseInt(newXCordOffset), y: parseInt(newYCordOffset) }).pause(3000).release().perform();
        await this.takeScreenShot();
    }

    public async doDragnDropByOffsetCanvas1(XCordOffset: any, YCordOffset: any, newXCordOffset: any, newYCordOffset: any, sLogMessage1: string, sLogMessage2: string) {
        await this.logMessage("INFO", "Moving the element from Source Coordinates " + sLogMessage1);
        let actions = await this.driver.actions({ bridge: true });
        await actions.mouseMove({ x: parseInt(XCordOffset), y: parseInt(YCordOffset) }).pause(3000).press().perform();
        await this.logMessage("INFO", "Dropping the element from Destination Coordinates " + sLogMessage2);
        await actions.mouseMove({ x: parseInt(newXCordOffset), y: parseInt(newYCordOffset) }).pause(3000).release().perform();
        await this.takeScreenShot();
    }

    //double clicks at the given coordinates position
    public async dodblClickByOffsetCanvas(XCordOffset: any, YCordOffset: any, sLogMessage: string) {
        let actions = await this.driver.actions({ bridge: true });
        await actions.move({ x: parseInt(XCordOffset), y: parseInt(YCordOffset) }).pause(3000).doubleClick().perform();
        await this.logMessage("INFO", "Double Clicked at the Screen Coordinates " + sLogMessage);
        await this.takeScreenShot();
    }

    public async getBackgroundColorOfLocator(byLocator:By, switchToFrame:any = null){
        if(switchToFrame != null){
            await this.doSwitchToFrame(switchToFrame);
        }
        let element:WebElement = await this.driver.findElement(byLocator);
        let color:string = await element.getCssValue("background-color");
        await this.logMessage("INFO", "color: " + color);
        await this.doSwitchToDefaultContent();
        return color;
    }

    public async doSetDateUsingCalendar(year: string, month: any, date: string) {
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let monthName: string = "";
        await this.waitUntilElementLocated(By.xpath("//td[text()='Select Date and Time']"));
        await this.doEnterText(By.xpath("//input[contains(@id,'::popChooseDate::ys::content')]"), year, "Entering year " + year);
        if (typeof month == "number") {
            monthName = months[month];
        } else if (typeof month == "string") {
            monthName = month;
        }
        await this.doSelect(By.xpath("//select[contains(@id,'::popChooseDate::ms')]"), monthName, "Selecting month " + monthName);
        await this.doClick(By.xpath("//table[contains(@id,'::popChooseDate::cg')]//td[not(contains(@id,'::popChooseDate::dpm')) and not(contains(@id,'::popChooseDate::dnm')) and text()='" + date + "']"), "Selecting Date : " + date);
    }

    public async doSetDateUsingCalendarLocator(sLocatorID: By, year: string, month: any, date: string) {
        await this.doClick(sLocatorID,"Clicking the Calendar Icon");
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let monthName: string = "";
        await this.waitUntilElementLocated(By.xpath("//td[text()='Select Date and Time']"));
        await this.doEnterText(By.xpath("//input[contains(@id,'::popChooseDate::ys::content')]"), year, "Entering year " + year);
        if (typeof month == "number") {
            monthName = months[month];
        } else if (typeof month == "string") {
            monthName = month;
        }
        await this.doSelect(By.xpath("//select[contains(@id,'::popChooseDate::ms')]"), monthName, "Selecting month " + monthName);
        await this.doClick(By.xpath("//table[contains(@id,'::popChooseDate::cg')]//td[not(contains(@id,'::popChooseDate::dpm')) and not(contains(@id,'::popChooseDate::dnm')) and text()='" + date + "']"), "Selecting Date : " + date);
    }

}