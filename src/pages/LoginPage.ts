import { WebElement, WebDriver, By, until, Key } from "selenium-webdriver";
import { Page } from '../util/Page';

export class LoginPage extends Page{

    private sTitle = "";

    private lbUsername = By.xpath('//input[@name="txtUsername"]');
    private lbPassword = By.xpath('//input[@name="txtPassword"]');
    private btnLogin = By.xpath('//input[@value="LOGIN"]');
    
    public async isPageLoaded(){
        await this.waitUntilPageTitleContains(this.sTitle);
    }

    public async setUserName(sUserName:any){
        await this.isPageLoaded();
        await this.doEnterText(this.lbUsername,sUserName,"Entering User Name: "+sUserName);
    }

    public async setPassword(sPassword:any){
        await this.doEnterText(this.lbPassword,sPassword,"Entering Password: "+sPassword);
    }

    public async clickLogin(){
        await this.doClick(this.btnLogin,"Click Login");
    }

    public async login(sUserName:any,sPassword:any){
        await this.setUserName(sUserName);
        await this.setPassword(sPassword);
        await this.clickLogin();
    }
    
}