//https://www.tsrtconline.in/oprs-web/

import {Builder, By, WebDriver, WebElement} from 'selenium-webdriver'
import {Browser} from './../../src/util/Browser'
import {CommonFunctions} from './../../src/util/CommonFunctions'

(async function () {

    await console.log("Starting is: "+ await CommonFunctions.getTimeStamp());
    
    let driver:WebDriver = await Browser.getDriver("edge");
    await driver.manage().setTimeouts({implicit:10000,pageLoad:20000});
    driver = await CommonFunctions.loadURL(driver,"https://opensource-demo.orangehrmlive.com/");

    await Promise.all([
        driver.findElement(By.id("txtUsername")).sendKeys("Admin"),
        driver.findElement(By.id("txtPassword")).sendKeys("admin123")
    ]).then(function(){
        console.log("Entered data in all data fields");
    });

    let loginBtn:WebElement = await driver.findElement(By.id("btnLogin"));

    await loginBtn.click();

    await console.log("Ending is: "+ await CommonFunctions.getTimeStamp());

    await driver.close();
})();

