//https://www.tsrtconline.in/oprs-web/

import {Builder, By, WebDriver, WebElement} from 'selenium-webdriver'
import {Browser} from '../../src/util/Browser'

(async function () {

    let driver:WebDriver = await Browser.getDriver("edge");
    //let driver:WebDriver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({implicit:10000,pageLoad:20000});
    await driver.get("https://opensource-demo.orangehrmlive.com/");
    let title:string = await driver.getTitle();
    console.log("opened page title is"+ title);

    await Promise.all([
        driver.findElement(By.id("txtUsername")).sendKeys("Admin"),
        driver.findElement(By.id("txtPassword")).sendKeys("admin123")
    ]).then(function(){
        console.log("Entered data in all data fields");
    });

    let loginBtn:WebElement = await driver.findElement(By.id("btnLogin"));
    await loginBtn.click();
 
    await driver.close();
})();

