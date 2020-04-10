const puppeteer = require('puppeteer');
  
test('一账通-退出登录', async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://192.168.200.115:8989');

    const usernameInput = await page.waitForSelector('input[type = "text"]');
    await usernameInput.type("admin");
    const passwordInput = await page.waitForSelector('input[type = "password"]');
    await passwordInput.type("admin");
        
    const loginBtn = await page.waitForSelector('button[type = "button"]');
    await loginBtn.click();

    await page.waitFor(4000);

    const settingBtn = await page.waitForSelector('.ivu-icon.ivu-icon-md-arrow-dropdown');
    await settingBtn.click();

    await page.evaluate(()=> {
        document.querySelector('.ivu-dropdown-menu>li').click()
    });
    await page.waitFor(3000);

    const url = await page.url();
    await expect(url).toBe('http://192.168.200.115:8989/#/oneid/login?backPath=%2Fworkspace%2Fapps');
},30000);

test('一账通-修改密码', async () => {
    const browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.goto('http://192.168.200.115:8989');

    const usernameInput = await page.waitForSelector('input[type = "text"]');
    await usernameInput.type("bumen3user");
    const passwordInput = await page.waitForSelector('input[type = "password"]');
    await passwordInput.type("bumen3user");
        
    const loginBtn = await page.waitForSelector('button[type = "button"]');
    await loginBtn.click();

    await page.waitFor(4000);

    const settingBtn = await page.waitForSelector('body > div.lg-layout > header > div.header-right > div');
    await settingBtn.click();

    await page.evaluate(()=> {
        document.querySelector('.ivu-dropdown-menu>li:nth-child(2)').click()
    });
    await page.waitFor(3000);

    const oldPwdInput = await page.waitForSelector('input[placeholder="输入原密码"]');
    await oldPwdInput.type("bumen3user");

    const newPwdInput = await page.waitForSelector('input[placeholder="输入新密码"]');
    await newPwdInput.type("bumen3111");

    const renewPwdInput = await page.waitForSelector('input[placeholder="再次输入新密码"]');
    await renewPwdInput.type("bumen3111");

    const defineBtn = await page.waitForSelector('.right-button.ivu-btn.ivu-btn-primary');
    await defineBtn.click();

    await page.waitFor(2000);

    const usernameInput1 = await page.waitForSelector('input[type = "text"]');
    await usernameInput1.type("bumen3user");
    const passwordInput1 = await page.waitForSelector('input[type = "password"]');
    await passwordInput1.type("bumen3111");
        
    const loginBtn1 = await page.waitForSelector('button[type = "button"]');
    await loginBtn1.click();

    await page.waitFor(3000);

    const url = await page.url();
    await expect(url).toBe('http://192.168.200.115:8989/#/workspace/apps');
},50000);
