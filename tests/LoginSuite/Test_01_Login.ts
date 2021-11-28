import { TestUtil } from '../../src/util/TestUtil';
import { CommonFunctions } from '../../src/util/CommonFunctions';
import { Constants } from '../../src/util/Constants';
import { assert } from 'chai';
import { LoginPage } from '../../src/pages/LoginPage';

describe('Test_01_Login',function(){

    let testUtil:TestUtil, loginPage:any;
    let TEST_STATUS = true;

    before(async function () {
        await Constants.init_TestConfig(__filename,this);
        testUtil = new TestUtil(Constants.driver,Constants.sURL,Constants.TEST_LOG_FOLDER,Constants.TESTCASE_NAME,Constants.TEST_SUMMARY_FILE);
        loginPage = await new LoginPage(Constants.driver,Constants.TEST_LOG_FILE);

    });

    it('1.Login', async function(){
        let i=0;
        while(i<=Constants.nRetries){
            try{
                await testUtil.loadURL(Constants.sURL);
                await testUtil.login(Constants.TEST_CONFIG_FILE.USERNAME, Constants.TEST_CONFIG_FILE.PASSWORD,Constants.INSTANCE_TYPE);
                TEST_STATUS = await TEST_STATUS && true;
                break;
            }
            catch(err:any){ await testUtil.logMessage("INFO", err); await CommonFunctions.takeScreenShot(Constants.driver,Constants.TEST_SCREENSHOT_FOLDER); if(i==Constants.nRetries){ TEST_STATUS =await TEST_STATUS && false; await assert.equal(true,false,"Test Failed");}i++;}
        }
    })

    after(async function () {
        await CommonFunctions.afterTest(TEST_STATUS);
        //await CommonFunctions.appendToTestSummary(Constants.TEST_SUMMARY_FILE,Constants.TESTCASE_NAME,TEST_STATUS);
        await Constants.driver.quit();
        await Constants.driver.sleep(5000);
    });
});