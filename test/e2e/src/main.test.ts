import { UserAction } from './actions/user';
import {Page, launch} from 'puppeteer';
import {personalSetAction} from './actions/personalSetting';
import {appSearchAction} from './actions/appSearch';
import {organizationAction} from './actions/organization';
import {setAction} from './actions/setting';
import {accountAction} from './actions/account';
import config from './config';
import expectPuppeteer = require('expect-puppeteer');
import { appMessageAction } from './actions/appMessage';
import {groupAction} from './actions/group';
import {configManageAction} from './actions/configManage';
import {appsManageAction} from './actions/appsManage';
import {managerSettingAction} from './actions/managerSetting';

describe('一账通-登录测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch({headless:false});
        page = await browser.newPage();
        await page.goto(config.url);

    },30000)

    afterEach ( async () => {
       // await page.close();
    })

    test('TEST_001:验证标题' , async() => {
        const pageTitle = await page.$eval('title', elem => {
            return elem.innerHTML;
        });
        await expect(pageTitle).toEqual('ArkID');

        await page.close();
    },30000);

    test('TEST_002:验证登录跳转链接' , async() => {

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/workspace/apps');

    },40000);

    

})

/*describe('一账通-退出登录测试', () => {
    let page: Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(config.url);

        

    },30000)
    afterEach ( async () => {
        //await page.close();
    })

    test('TEST_001:验证退出链接' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let personalSetaction = new personalSetAction();
        await personalSetaction.exit(page);

        const url = await page.url();
        await expect(url).toContain('https://192.168.200.115:8989/');
    },30000);

})

describe('一账通-修改密码测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei123', 'mei123');
        let personalSetaction = new personalSetAction();
        await personalSetaction.changePassword(page, "mei123", "meixinyue123", "meixinyue123");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改密码手否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'mei123', 'meixinyue123');

        const url = await page.url();
        await expect(url).toContain('https://192.168.200.115:8989/#/workspace/apps');
    },30000);

})
*/
describe('一账通-我的应用信息测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
  
        let appmessageaction = new appMessageAction();
        await appmessageaction.appinformation(page);
        
    },30000)
    afterEach ( async () => {
        //await page.close();
    })


    test('TEST_001:验证我的应用页面应用名称' , async() => {
        const appName1 = await page.$eval('.card-list.flex-row>li:first-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName1).toEqual('猎聘');

        const appName2 = await page.$eval('.card-list.flex-row>li:nth-child(2) .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName2).toEqual('测试应用');

        const appName3 = await page.$eval('.card-list.flex-row>li:last-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName3).toEqual('百度');

    },30000);

    test('TEST_002:验证我的应用页面应用备注' , async() => {
        const appPs1 = await page.$eval('.card-list.flex-row>li:first-child .intro', elem => {
            return elem.innerHTML;
        });
        await expect(appPs1).toBe("");

        const appPs2 = await page.$eval('.card-list.flex-row>li:nth-child(2) .intro', elem => {
            return elem.innerHTML;
        });
        await expect(appPs2).toBe("");

        const appPs3 = await page.$eval('.card-list.flex-row>li:last-child .intro', elem => {
            return elem.innerHTML;
        });
        await expect(appPs3).toEqual('百度搜索');

    },30000);

    // test('TEST_003:验证我的应用页面应用链接' , async() => {
    //     let browser = await launch()
    //     page = await browser.newPage();
    //     await page.goto(config.url);

    //     let useraction = new UserAction();
    //     await useraction.login(page, 'admin', 'admin');
  
    //     let appmessageaction = new appMessageAction();
    //     await appmessageaction.appinformation(page);

    //     //const newPagePromise = new Promise(x => browser.once('targetcreated', (target: { page: () => unknown; }) => x(target.page())));
        
    //     const appBtn = await page.waitForSelector('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto');
    //     await appBtn.click();

    //     await page.waitFor(5000);

    //     const target = await browser.waitForTarget(t=>t.url() == 'https://www.baidu.com/')
    //     const newPage = await target.page();

    //     //const url = await page.url();
    //     await expect(newPage).toBe('https://www.baidu.com/');

    // },30000);

})



describe('一账通-我的应用搜索框测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
  
        let appsearchaction = new appSearchAction();
        await appsearchaction.appinformation(page, 'bing');
        
    },30000)
    afterEach ( async () => {
        //await page.close();
    })

    test('TEST_001:验证我的应用页面搜索框' , async() => {
        const appName = await page.$eval('.ws-apps--app-box.flex-col .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('bing test');

       // await page.close();
    },30000);

    

})


describe('一账通-通讯录测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let organizationaction = new organizationAction();
        await organizationaction.origanization(page);
        
    },30000)
    afterEach ( async () => {
        //await page.close();
    })

    test('TEST_001:验证通讯录页面链接' , async() => {
        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/workspace/contacts');
    },30000);

    test('TEST_002:验证通讯录页面的部门分类' , async() => {
        const departmentName1 = await page.$eval('.dept-list>li:first-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName1).toEqual('部门一 (0人)');

        const departmentBtn1 = await page.waitForSelector('.dept-list>li:first-child');
        await departmentBtn1.click();

        const departmentName11 = await page.$eval('.dept-list .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName11).toEqual('部门一1 (0人)');

        const departRetBtn1 = await page.waitForSelector('.path-name');
        await departRetBtn1.click();

        const departmentName2 = await page.$eval('.dept-list>li:nth-child(2) .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName2).toEqual('部门二 (1人)');

        const departmentBtn2 = await page.waitForSelector('.dept-list>li:nth-child(2)');
        await departmentBtn2.click();

        const departmentName21 = await page.$eval('.user-list .flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName21).toEqual('bumen2user');

        const departRetBtn2 = await page.waitForSelector('.path-name');
        await departRetBtn2.click();

        const departmentName3 = await page.$eval('.dept-list>li:last-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName3).toEqual('部门三 (1人)');

        const departmentBtn3 = await page.waitForSelector('.dept-list>li:last-child');
        await departmentBtn3.click();

        const departmentName31 = await page.$eval('.flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName31).toEqual('部门三1 (0人)');


        const departmentName32 = await page.$eval('.user-list .flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName32).toEqual('bumen3user');

        //await departRetBtn1.click();
        
    },30000);

    // test('TEST_003:验证通讯录页面的直属成员' , async() => {
    //     const directBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
    //     await directBtn.click();

    //     const membersNum = document.getElementsByTagName(".user-list").length;
    //     //const membersNum = await page.$$('.user-list').children("li").length;
    //     await expect(membersNum).toEqual('19');

    //     const directName1 = await page.$eval('.org-main.flex-col>ul>li:first-child .name', elem => {
    //         return elem.innerHTML;
    //     });
    //     await expect(directName1).toEqual('mei333');

    //     const directName2 = await page.$eval('.org-main.flex-col>ul>li:nth-child(2) .name', elem => {
    //         return elem.innerHTML;
    //     });
    //     await expect(directName2).toEqual('123123');

    //     const directName3 = await page.$eval('.org-main.flex-col>ul>li:last-child .name', elem => {
    //         return elem.innerHTML;
    //     });
    //     await expect(directName3).toEqual('请尽快修改密码或更改主管理员');

        
    // },30000);

    test('TEST_004:验证通讯录页面自定义分类的项目组' , async() => {
        const departmentBtn = await page.waitForSelector('.ui-contact-page--side>li:last-child');
        await departmentBtn.click();

        await page.waitFor(2000);

        const departmentName1 = await page.$eval('.dept-list>li:first-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName1).toEqual('A项目组 (1人)');

        const departmentBtn1 = await page.waitForSelector('.dept-list>li:first-child');
        await departmentBtn1.click();

        const departmentName11 = await page.$eval('.dept-list>li:first-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName11).toEqual('分组一 (0人)');

        const userName11 = await page.$eval('.user-list .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName11).toEqual('axiangmuzuuser');

        const departRetBtn1 = await page.waitForSelector('.path-name');
        await departRetBtn1.click();

        const departmentName2 = await page.$eval('.dept-list>li:nth-child(2) .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName2).toEqual('B项目组 (1人)');

        const departmentBtn2 = await page.waitForSelector('.dept-list>li:nth-child(2)');
        await departmentBtn2.click();

        const departmentName21 = await page.$eval('.user-list .flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName21).toEqual('bxiangmuzuuser');

        const departRetBtn2 = await page.waitForSelector('.path-name');
        await departRetBtn2.click();

        const departmentName3 = await page.$eval('.dept-list>li:last-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName3).toEqual('C项目组 (1人)');

        const departmentBtn3 = await page.waitForSelector('.dept-list>li:last-child');
        await departmentBtn3.click();

        
        const departmentName31 = await page.$eval('.flex-row .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName31).toEqual('C项目组分组 (0人)');

        const departmentName32 = await page.$eval('.user-list .flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(departmentName32).toEqual('cxiangmuzuuser');
        
    },30000);   

})

describe('一账通-个人资料测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        
    },30000)
    afterEach ( async () => {
        await page.close();
    })


    test('TEST_001:验证个人资料页面链接' , async() => {
        let setaction = new setAction();
        await setaction.setting(page);

        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/workspace/userinfo');
    },30000);

    test('TEST_002:验证个人资料页面添加手机号' , async() => {
        let setaction = new setAction();
        await setaction.setting(page);

        const addMobileBtn = await page.waitForSelector('.mobile .ivu-btn.ivu-btn-default');
         await addMobileBtn.click();

        const phoneTitle1 = await page.$eval('.ui-workspace-userinfo-verify-password .title', elem => {
            return elem.innerHTML;
        });
        await expect(phoneTitle1).toEqual('修改个人邮箱/手机号需要验证密码');

        const pwdInput = await page.waitForSelector('input[placeholder="输入密码"]');
        await pwdInput.type("admin");

        const phoneBtn = await page.waitForSelector('.ivu-btn.ivu-btn-primary.ivu-btn-large');
        await phoneBtn.click();

        await page.waitFor(3000);

        const phoneTitle2 = await page.$eval('.ui-workspace-userinfo-reset-mobile .title', elem => {
            return elem.innerHTML;
        });
        await expect(phoneTitle2).toEqual('修改手机号');

    },30000);

    test('TEST_003:验证个人资料页面添加邮箱' , async() => {
        let setaction = new setAction();
        await setaction.setting(page);

        const addEmailBtn = await page.waitForSelector('.email .ivu-btn.ivu-btn-default');
         await addEmailBtn.click();

        const emailTitle1 = await page.$eval('.ui-workspace-userinfo-verify-password .title', elem => {
            return elem.innerHTML;
        });
        await expect(emailTitle1).toEqual('修改个人邮箱/手机号需要验证密码');

        const pwdInput = await page.waitForSelector('input[placeholder="输入密码"]');
        await pwdInput.type("admin");

        const emailBtn = await page.waitForSelector('.ivu-btn.ivu-btn-primary.ivu-btn-large');
        await emailBtn.click();

        await page.waitFor(3000);

        const emailTitle2 = await page.$eval('.ui-workspace-userinfo-reset-email .title', elem => {
            return elem.innerHTML;
        });
        await expect(emailTitle2).toEqual('修改个人邮箱');

    },30000);


    // test('TEST_004:验证个人资料页面修改姓名' , async() => {
    //     let setaction = new setAction();
    //     await setaction.setting(page);

    //     const nameInput = await page.waitForSelector('input[placeholder="请输入 姓名"]');
    //     await nameInput.type("111");

    //     const saveBtn = await page.waitForSelector('.flex-row.flex-auto .ivu-btn.ivu-btn-primary');
    //      await saveBtn.click();

    //      let browser = await launch()
    //     page = await browser.newPage();
    //     await page.goto(config.url);

    //     let useraction = new UserAction();
    //     await useraction.login(page, 'admin', 'admin');

    //     const setBtn = await page.waitForSelector('a[href="#/workspace/userinfo"]');
    //         await setBtn.click();

    //     const personName1 = await page.$eval('.ui-workspace-userinfo--summary h4', elem => {
    //         return elem.innerHTML;
    //     });
    //     await expect(personName1).toEqual('ad111');

    //     const personName2 = await page.$eval('.ui-user-info li[data-label="姓名"]', elem => {
    //         return elem.innerHTML;
    //     });
    //     await expect(personName2).toEqual('ad111');

    // },30000);

})

describe('一账通-账号管理测试', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin'); 

    },30000)
    afterEach ( async () => {
        //await page.close();
    })

    test('TEST_001:验证账号管理页面链接' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();
        await page.waitFor(3000);
        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/admin/account');
    },30000);

    test('TEST_002:验证账号管理页面添加新账号' , async() => {
        let accountaction = new accountAction();
        await accountaction.addAccount(page, "meixinyue", "meixinyue", "mei123456", "mei123456", "15822186268", "1821788073@qq.com", "meixinyue11@163.com", "部门一");         

        const userName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toEqual('meixinyue');

    },40000);

    test('TEST_003:验证账号管理页面添加新账号后是否生效' , async() => {
        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:first-child');
        await groupBtn.click();

        const name = await page.$eval('.user-list .flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(name).toEqual('meixinyue');

        const usereBtn = await page.waitForSelector('.flex-row.active .name');
        await usereBtn.click();

        const userName = await page.$eval('li[data-label="用户名"]', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toEqual('meixinyue');

        const name2 = await page.$eval('li[data-label="姓名"]', elem => {
            return elem.innerHTML;
        });
        await expect(name2).toEqual('meixinyue');

        const phoneNum = await page.$eval('li[data-label="电话"]', elem => {
            return elem.innerHTML;
        });
        await expect(phoneNum).toEqual('15822186268');

    },30000);
})
/*

describe('一账通-账号管理搜索账号', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let accountaction = new accountAction();
        await accountaction.searchAccount(page, "meixinyue");          

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证账号管理的搜索框' , async() => {
        const name = await page.$eval('.ivu-table-row>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(name).toEqual('meixinyue');

    },30000);

})

describe('一账通-账号管理编辑账号', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let accountaction = new accountAction();
        await accountaction.searchAccount(page, "meixinyue");
        await accountaction.reviseAccount(page, "11", "meixinyue", "meixinyue", "新建测试12");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改是否生效' , async() => {

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:nth-child(2)');
        await groupBtn.click();

        const name = await page.$eval('.user-list>li:last-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(name).toEqual('梅新悦11');

        const usereBtn = await page.waitForSelector('.flex-row.active .name');
        await usereBtn.click();

        const name2 = await page.$eval('li[data-label="姓名"]', elem => {
            return elem.innerHTML;
        });
        await expect(name2).toEqual('梅新悦11');

    },30000);

})

describe('一账通-账号管理编辑账号密码', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'meixinyue', 'meixinyue');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改密码后能否登录' , async() => {
        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/workspace/apps');
        
    },30000);

})

describe('一账通-账号管理删除账号', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let accountaction = new accountAction();
        await accountaction.searchAccount(page, "mei111");
        await accountaction.deleteAccount(page);

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证删除账号' , async() => {
        const userName = await page.$eval('.ivu-table-tbody>tr:nth-child(4)>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toEqual('mei222');

        
    },30000);

})

describe('一账通-验证分组管理', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addGroup(page, "部门四");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证分组管理页面链接' , async() => {
        const url = await page.url();
        await expect(url).toContain('http://192.168.200.115:8989/#/admin/group');
    },30000);

    test('TEST_002:验证分组管理页面添加分组' , async() => {
        const groupName1 = await page.$eval('.ui-group-tree.ivu-tree>ul:last-child .ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(groupName1).toEqual('部门四 ( 0 人 )');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupName2 = await page.$eval('.dept-list>li:last-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(groupName2).toEqual('部门四 ( 0 人 )');
    },30000);

})

describe('一账通-验证分组管理分组可见性', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei123', 'mei123');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证分组管理分组可见性' , async() => {
        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupName = await page.$eval('.dept-list>li:last-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(groupName).toEqual('部门三 (1人)');

    },30000);

})

describe('一账通-验证分组管理编辑部门', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await  groupaction.editGroup(page, "一");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改是否生效' , async() => {

        const groupName1 = await page.$eval('.ui-group-tree.ivu-tree>ul:last-child .ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(groupName1).toEqual('部门一一 ( 0 人 )');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupName = await page.$eval('.dept-list>li:first-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(groupName).toEqual('部门一一 ( 0 人 )');

    },30000);

})

describe('一账通-验证分组管理编辑部门可见性', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei333', 'mei333');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改部门可见性是否生效' , async() => {

        const groupName1 = await page.$eval('.dept-list>li:first-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(groupName1).toEqual('部门二 (1人)');

    },30000);

})

describe('一账通-验证分组管理添加下级部门', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addLowGroup(page, "部门一2");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证分组管理添加下级部门是否生效' , async() => {

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:first-child');
        await groupBtn.click();

        const groupName = await page.$eval('.org-main.flex-col .dept-list>li:last-child .name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(groupName).toEqual('部门一2 (0人)');

    },30000);

})

describe('一账通-验证分组管理添加账号', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addUser(page, "mei22222", "mei22222", "mei22222", "mei22222");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证分组管理添加账号是否生效' , async() => {

        const userName1 = await page.$eval('.ivu-table-row>td:nth-child(2) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(userName1).toEqual('mei22222');

        const accountBtn = await page.waitForSelector('a[href="#/admin/account"]');
        await accountBtn.click();

        const userName2 = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName2).toEqual('mei22222');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:first-child');
        await groupBtn.click();

        const userName3 = await page.$eval('.user-list .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toEqual('mei22222');

    },30000);

})

describe('一账通-分组管理编辑账号', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.editUser(page, "3", "mei222223", "mei222223");
       
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改是否生效' , async() => {

        const userName1 = await page.$eval('.ivu-table-row>td:nth-child(2) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(userName1).toEqual('mei222223');

        const accountBtn = await page.waitForSelector('a[href="#/admin/account"]');
        await accountBtn.click();

        const userName2 = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName2).toEqual('mei222223');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:first-child');
        await groupBtn.click();

        const userName3 = await page.$eval('.user-list .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toEqual('mei222223');

    },30000);

})

describe('一账通-分组管理编辑账号密码', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei222223', 'mei222223');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改密码后能否登录' , async() => {
        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/workspace/apps');
        
    },30000);

})

describe('一账通-分组管理调整分组', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.editUserGroup(page, "部门四");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证调整分组后是否生效' , async() => {
        const groupUserBtn = await page.waitForSelector('.ui-group-tree.ivu-tree>ul:nth-child(5) .ui-tree-item-title span');
        await groupUserBtn.click();

        const userName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(5) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toEqual('mei222223');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:nth-child(5)');
        await groupBtn.click();

        const userName3 = await page.$eval('.user-list>li:last-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toEqual('mei222223');


        
    },30000);

})

describe('一账通-分组管理移出分组是否生效', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.removeUserGroup(page);

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证移出分组后是否生效' , async() => {
        const userName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(5) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toBeNull();

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:nth-child(5)');
        await groupBtn.click();

        const userName3 = await page.$eval('.user-list>li:last-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toBeNull();
        
    },30000);

})

describe('一账通-分组管理删除账号是否生效', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.deleteUserGroup(page);

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证分组管理删除账号后是否生效' , async() => {
        const userName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toBeNull();

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li:nth-child(2)');
        await groupBtn.click();

        const userName3 = await page.$eval('.user-list>li:last-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toBeNull();
        
    },30000);

})


// describe('一账通-分组管理添加直属成员分组', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'admin', 'longguikeji');

//         let groupaction = new groupAction();
//         await groupaction.groupAddress(page);
//         await groupaction.directUserGroup(page, "直属成员分组一");

//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证添加直属成员分组后是否生效' , async() => {
//         const dirUserGroupName1 = await page.$eval('.ui-tree-item-title span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirUserGroupName1).toEqual('直属成员分组一 (0人)');

//         const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
//         await returnDeskBtn.click();

//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
//         await groupBtn.click();

//         const dirUserGroupName2 = await page.$eval('.org-main.flex-col .flex-row .name.flex-auto', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirUserGroupName2).toEqual('直属成员分组一 (0人)');
        
//     },30000);

// })

// describe('一账通-分组管理添加直属成员分组可见性', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'mei123', 'mei123');

//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证添加直属成员分组后可见性是否生效' , async() => {
//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
//         await groupBtn.click();

//         const dirUserGroupName2 = await page.$eval('.org-main.flex-col .flex-row .name.flex-auto', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirUserGroupName2).toBeNull();

//     },30000);

// })

// describe('一账通-分组管理编辑直属成员分组', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'admin', 'longguikeji');

//         let groupaction = new groupAction();
//         await groupaction.groupAddress(page);
//         await groupaction.editGroup(page, "1");

//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证编辑直属成员分组后是否生效' , async() => {
//         const dirUserGroupName1 = await page.$eval('.ui-tree-item-title span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirUserGroupName1).toEqual('直属成员分组一1 (0人)');

//         const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
//         await returnDeskBtn.click();

//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
//         await groupBtn.click();

//         const dirUserGroupName2 = await page.$eval('.org-main.flex-col .flex-row .name.flex-auto', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirUserGroupName2).toEqual('直属成员分组一1 (0人)');
        
//     },30000);

// })

// describe('一账通-分组管理直属成员分组添加下级分组', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'admin', 'longguikeji');

//         let groupaction = new groupAction();
//         await groupaction.groupAddress(page);
//         await groupaction.addDirLowGroup(page, "分组一");

//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证直属成员分组添加下级分组是否生效' , async() => {
//         const dirLowGroupName1 = await page.$eval('ul[visible="visible"] .ivu-tree-children .ui-tree-item-title span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirLowGroupName1).toEqual('分组一 (0人)');

//         const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
//         await returnDeskBtn.click();

//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
//         await groupBtn.click();

//         const dirUserBtn = await page.waitForSelector('.org-main.flex-col .flex-row');
//         await dirUserBtn.click();

//         const dirLowGroupName2 = await page.$eval('.dept-list .name.flex-auto', elem => {
//             return elem.innerHTML;
//         });
//         await expect(dirLowGroupName2).toEqual('分组一 (0人)');
        
//     },30000);

// })

// describe('一账通-分组管理直属成员分组添加成员', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'admin', 'longguikeji');

//         let groupaction = new groupAction();
//         await groupaction.groupAddress(page);
//         await groupaction.addDirUser(page, "directuser", "directuser", "directuser", "directuser");
//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证直属成员分组添加成员是否生效' , async() => {
//         const userName1 = await page.$eval('.ivu-table-row>td:nth-child(2) .ivu-table-cell span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName1).toEqual('directuser');

//         const accountBtn = await page.waitForSelector('a[href="#/admin/account"]');
//         await accountBtn.click();

//         const userName2 = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName2).toEqual('directuser');

//         const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
//         await returnDeskBtn.click();

//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const dirGroupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
//         await dirGroupBtn.click();

//         const groupBtn = await page.waitForSelector('.dept-list>li:first-child');
//         await groupBtn.click();

//         const userName3 = await page.$eval('.user-list .name', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName3).toEqual('directuser');
        
//     },30000);

// })

// describe('一账通-分组管理直属成员分组编辑账号', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'admin', 'longguikeji');

//         let groupaction = new groupAction();
//         await groupaction.groupAddress(page);
//         await groupaction.editDirUser(page, "1", "directuser1", "directuser1");
       
//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证修改是否生效' , async() => {

//         const userName1 = await page.$eval('.ivu-table-row>td:nth-child(2) .ivu-table-cell span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName1).toEqual('directuser1');

//         const accountBtn = await page.waitForSelector('a[href="#/admin/account"]');
//         await accountBtn.click();

//         const userName2 = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName2).toEqual('directuser1');

//         const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
//         await returnDeskBtn.click();

//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const dirGroupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(3)');
//         await dirGroupBtn.click();

//         const groupBtn = await page.waitForSelector('.dept-list>li:first-child');
//         await groupBtn.click();

//         const userName3 = await page.$eval('.user-list .name', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName3).toEqual('directuser');

//     },30000);

// })

// describe('一账通-分组管理直属分组编辑账号密码', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'directuser', 'directuser1');

//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证修改密码后能否登录' , async() => {
//         const url = await page.url();
//         await expect(url).toBe('https://arkid.demo.longguikeji.com/#/workspace/apps');
        
//     },30000);

// })

// describe('一账通-分组管理直属分组调整分组', () => {
//     let page : Page;
    
//     beforeEach( async () => {
//         let browser = await launch({headless:false, defaultViewport:{width:1366,height:768}})
//         page = await browser.newPage();
//         await page.goto(cofig.url);

//         let useraction = new UserAction();
//         await useraction.login(page, 'admin', 'longguikeji');

//         let groupaction = new groupAction();
//         await groupaction.groupAddress(page);
//         await groupaction.editDirUserGroup(page, "zxzx");

//     },30000)
//     afterEach ( async () => {
//         await page.close();
//     })

//     test('TEST_001:验证调整分组后是否生效' , async() => {
//         const apartBtn = await page.waitForSelector('.default-list>li');
//         await apartBtn.click();

//         const userName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName).toEqual('directuser1');

//         const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
//         await returnDeskBtn.click();

//         const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
//         await orgBtn.click();

//         const groupBtn = await page.waitForSelector('.dept-list>li:nth-child(1)');
//         await groupBtn.click();

//         const groupzxzxBtn = await page.waitForSelector('.dept-list>li');
//         await groupzxzxBtn.click();

//         const userName3 = await page.$eval('.user-list>li:last-child .name', elem => {
//             return elem.innerHTML;
//         });
//         await expect(userName3).toEqual('directuser1');
        
//     },30000);

// })


describe('一账通-分组管理添加自定义分组', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addPersonalGroup(page, "政治面貌");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证添加自定义分组是否生效' , async() => {

        const groupName1 = await page.$eval('.flex-col.ui-group-meta-page-side.ui-group-meta-page-base-group>ul:last-child span', elem => {
            return elem.innerHTML;
        });
        await expect(groupName1).toEqual('政治面貌');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupName2 = await page.$eval('.ui-contact-page--side>li:nth-child(7)', elem => {
            return elem.innerHTML;
        });
        await expect(groupName2).toEqual('政治面貌');
        
    },30000);

})

describe('一账通-自定义分类添加分组分组', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.personalUserGroup(page, "团员");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证自定义分类添加分组后是否生效' , async() => {
        const perUserGroupName1 = await page.$eval('.ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(perUserGroupName1).toEqual('团员 ( 0 人 )');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(7)');
        await groupBtn.click();

        const perUserGroupName2 = await page.$eval('.name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(perUserGroupName2).toEqual('团员 ( 0 人 )');
        
    },30000);

})

describe('一账通-分组管理自定义分类添加分组可见性', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei333', 'mei333');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证自定义分类添加分组后可见性是否生效' , async() => {
        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(7)');
        await groupBtn.click();

        const perUserGroupName = await page.$eval('.name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(perUserGroupName).toBeNull();

    },30000);

})


describe('一账通-分组管理编辑自定义分类下分组', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.editPerGroup(page, "A");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证编辑自定义分类下分组后是否生效' , async() => {
        const perUserGroupName1 = await page.$eval('.ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(perUserGroupName1).toEqual('团员A ( 0 人 )');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(7)');
        await groupBtn.click();

        const perUserGroupName2 = await page.$eval('.name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(perUserGroupName2).toEqual('团员A ( 0 人 )');
        
    },30000);

})

describe('一账通-分组管理自定义分类分组添加下级分组', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addPerLowGroup(page, "分组一");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证自定义分类分组添加下级分组是否生效' , async() => {
        const dirLowGroupName1 = await page.$eval('.ivu-tree-children .ivu-tree-children .ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(dirLowGroupName1).toEqual('分组一 ( 0 人 )');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const groupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(7)');
        await groupBtn.click();

        const dirUserBtn = await page.waitForSelector('.dept-list>li');
        await dirUserBtn.click();

        const dirLowGroupName2 = await page.$eval('.name.flex-auto', elem => {
            return elem.innerHTML;
        });
        await expect(dirLowGroupName2).toEqual('分组一 ( 0 人 )');
        
    },30000);

})

describe('一账通-分组管理自定义分类分组添加成员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addPerUser(page, "perectuser", "perectuser", "perectuser", "perectuser");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证自定义分类分组添加成员是否生效' , async() => {
        const userName1 = await page.$eval('.ivu-table-row>td:nth-child(2) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(userName1).toEqual('perectuser');

        const accountBtn = await page.waitForSelector('a[href="#/admin/account"]');
        await accountBtn.click();

        const userName2 = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName2).toEqual('perectuser');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const dirGroupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(7)');
        await dirGroupBtn.click();

        const dirUserBtn = await page.waitForSelector('.dept-list>li');
        await dirUserBtn.click();

        const userName3 = await page.$eval('.user-list .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toEqual('perectuser');
        
    },30000);

})

describe('一账通-分组管理自定义分类分组编辑账号', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.editPerUser(page, "1", "perectuser1", "perectuser1");
       
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改是否生效' , async() => {

        const userName1 = await page.$eval('.ivu-table-row>td:nth-child(2) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(userName1).toEqual('perectuser1');

        const accountBtn = await page.waitForSelector('a[href="#/admin/account"]');
        await accountBtn.click();

        const userName2 = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(userName2).toEqual('perectuser1');

        const returnDeskBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await returnDeskBtn.click();

        const orgBtn = await page.waitForSelector('a[href="#/workspace/contacts"]');
        await orgBtn.click();

        const dirGroupBtn = await page.waitForSelector('.ui-contact-page--side>li:nth-child(7)');
        await dirGroupBtn.click();

        const groupBtn = await page.waitForSelector('.dept-list>li');
        await groupBtn.click();

        const userName3 = await page.$eval('.user-list .name', elem => {
            return elem.innerHTML;
        });
        await expect(userName3).toEqual('perectuser1');

    },30000);

})

describe('一账通-分组管理自定义分类分组编辑账号密码', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'perectuser', 'perectuser1');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改密码后能否登录' , async() => {
        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/workspace/apps');
        
    },30000);

})

describe('一账通-分组管理编辑部门的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.groupPower(page, "百度");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改权限后是否生效' , async() => {
        
        const powerResult = await page.$eval('.ivu-table-row>td:nth-child(4) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(powerResult).toEqual('是');
       
        
    },30000);

})

describe('一账通-分组管理编辑部门的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'bumen2user', 'bumen2user');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改权限后是否生效' , async() => {

        const appNameInput = await page.waitForSelector('input[placeholder="搜索应用"]');
        await appNameInput.type("百度");

        const appName = await page.$eval('.flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('百度');
       
        
    },30000);

})

describe('一账通-分组管理编辑自定义分组的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.personalGroupPower(page, "百度");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改权限后是否生效' , async() => {
        
        const powerResult = await page.$eval('.ivu-table-row>td:nth-child(4) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(powerResult).toEqual('是');
       
        
    },30000);

})

describe('一账通-分组管理编辑自定义分组的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'axiangmuzuuser', 'axiangmuzuuser');

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改权限后是否生效' , async() => {

        const appNameInput = await page.waitForSelector('input[placeholder="搜索应用"]');
        await appNameInput.type("街道OA");

        const appName = await page.$eval('.flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('百度');
       
        
    },30000);

})

describe('一账通-配置管理登录页面', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let configmanageaction = new configManageAction();
        await configmanageaction.loginSetting(page,"北京龙归科技");
        let personalsettingaction = new personalSetAction();
        await personalsettingaction.exit(page);

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证修改公司面名称是否生效' , async() => {
        const companyName = await page.$eval('.org-name', elem => {
            return elem.innerHTML;
        });
        await expect(companyName).toEqual('北京龙归科技');
        
    },30000);

    test('TEST_002:验证配置管理页面链接' , async() => {
        let configmanageaction = new configManageAction();
        await configmanageaction.urlTest(page);

        const url = await page.url();
        await expect(url).toBe('http://192.168.200.115:8989/#/admin/account');
        
    },30000);


})

describe('一账通-应用管理添加应用', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let appsmanageaction = new appsManageAction();
        await appsmanageaction.addApps(page, "携程", "https://www.ctrip.com/", "携程应用");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证添加应用是否生效' , async() => {
        const appName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('携程');

        const mark = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(3) span', elem => {
            return elem.innerHTML;
        });
        await expect(mark).toEqual('携程应用');
    },30000);

})

describe('一账通-应用管理添加应用在我的应用是否生效', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证添加应用是否生效' , async() => {
        const appName = await page.$eval('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('携程');

        const mark = await page.$eval('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto .intro', elem => {
            return elem.innerHTML;
        });
        await expect(mark).toEqual('携程应用');
    },30000);

    test('TEST_002:验证添加应用的链接是否正确' , async() => {
        const appUrlBtn = await page.waitForSelector('.card-list.flex-row>li:last-child');
        await appUrlBtn.click();

        const appUrl = await page.url();
        await expect(appUrl).toBe('https://www.ctrip.com/');
    },30000);
})


describe('一账通-应用管理编辑应用', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let appsmanageaction = new appsManageAction();
        await appsmanageaction.editAppMassage(page, "111",  "111");

    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证编辑应用是否生效' , async() => {
        const appName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('携程111');

        const mark = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(3) span', elem => {
            return elem.innerHTML;
        });
        await expect(mark).toEqual('携程应用111');
    },30000);

})

describe('一账通-应用管理编辑应用在我的应用是否生效', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证添加应用是否生效' , async() => {
        const appName = await page.$eval('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('携程111');

        const mark = await page.$eval('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto .intro', elem => {
            return elem.innerHTML;
        });
        await expect(mark).toEqual('携程应用111');
    },30000);

})


describe('一账通-应用管理删除应用', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let appsmanageaction = new appsManageAction();
        await appsmanageaction.deleteApp(page);
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证删除应用是否生效' , async() => {
        const appName = await page.$eval('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('百度');

        const mark = await page.$eval('.card-list.flex-row>li:last-child .name-intro.flex-col.flex-auto .intro', elem => {
            return elem.innerHTML;
        });
        await expect(mark).toEqual('百度搜索');
    },30000);

})

describe('一账通-应用管理账号的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let appsmanageaction = new appsManageAction();
        await appsmanageaction.userPower(page, "mei333");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证账号的权限是否生效' , async() => {
        const resultNameBtn = await page.waitForSelector('.perm-results span');
        await resultNameBtn.click();

        const resultName = await page.$eval('.ivu-modal-content .ivu-cell-group.name-list .ivu-cell-main .ivu-cell-title', elem => {
            return elem.innerHTML;
        });
        await expect(resultName).toEqual('mei333');
    },30000);

})

describe('一账通-应用管理账号的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei333', 'mei333');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证账号的权限是否生效' , async() => {
        const appName = await page.$eval('.flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('猎聘');
    },30000);

})

describe('一账通-应用管理部门的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let appsmanageaction = new appsManageAction();
        await appsmanageaction.departmentPower(page, "部门三");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证部门的权限是否生效' , async() => {
        const resultNameBtn = await page.waitForSelector('.perm-results span');
        await resultNameBtn.click();

        const resultName = await page.$eval('.ivu-modal-content .ivu-cell-group.name-list .ivu-cell-main .ivu-cell-title', elem => {
            return elem.innerHTML;
        });
        await expect(resultName).toEqual('部门三');
    },30000);

})

describe('一账通-应用管理部门的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'bumen3user', 'bumen3user');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证账号的权限是否生效' , async() => {
        const appName = await page.$eval('.flex-row .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('猎聘');
    },30000);

})

describe('一账通-应用管理自定义分组的权限', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let appsmanageaction = new appsManageAction();
        await appsmanageaction.personalGroupPower(page, "A项目组");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证自定义分组的权限是否生效' , async() => {
        const resultNameBtn = await page.waitForSelector('.perm-results span');
        await resultNameBtn.click();

        const resultName = await page.$eval('.ivu-modal-content .ivu-cell-group.name-list .ivu-cell-main .ivu-cell-title', elem => {
            return elem.innerHTML;
        });
        await expect(resultName).toEqual('A项目组');
    },30000);

    test('TEST_001:验证自定义分组的权限是否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'axiangmuzuuser', 'axiangmuzuuser');

        const appName = await page.$eval('.card-list.flex-row>li .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('猎聘');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSetting(page, "部门");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('mei333');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei333', 'mei333');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const groupBtn = await page.waitForSelector('.header-middle a[href="#/admin/group"]');
        await groupBtn.click();

        const groupName = await page.$eval('.ui-tree-item.active .ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(groupName).toContain('部门 一1');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSettinga(page, "mei111");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('mei111');
    },30000);

})

//////////////////////////////////////////////////////

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei111', 'mei111');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const groupBtn = await page.waitForSelector('.header-middle a[href="#/admin/group"]');
        await groupBtn.click();

        const xinjianGroupBtn = await page.waitForSelector('.ui-group-tree.ivu-tree>ul:nth-child(2) .ui-tree-item-bg');
        await xinjianGroupBtn.click();

        const addLowGroupBtn = await page.waitForSelector('.ui-group-page-detail-header.flex-row>button:nth-child(3)');
        await addLowGroupBtn.click();

        const groupNameInput = await page.waitForSelector('input[placeholder="请输入一账通-部门名称"]');
        await groupNameInput.type("测试部门");

        const addBtn = await page.waitForSelector('.drawer-footer.flex-row.flex-auto .ivu-btn.ivu-btn-primary');
        await addBtn.click();

        const groupName = await page.$eval('.ui-group-tree.ivu-tree>ul:nth-child(2)>li>ul:last-child .ui-tree-item-title span', elem => {
            return elem.innerHTML;
        });
        await expect(groupName).toEqual('测试部门 ( 0 人 )');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'longguikeji');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSettingb(page, "mei222");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('mei222');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei222', 'mei222');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员添加应用是否生效' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const appBtn = await page.waitForSelector('.header-middle a[href="#/admin/app"]');
        await appBtn.click();

        const addAppBtn = await page.waitForSelector('.ui-admin-apps-app-list--toolbar.flex-row .ivu-btn.ivu-btn-default');
        await addAppBtn.click();

        const addLowGroupBtn = await page.waitForSelector('.ui-group-page-detail-header.flex-row>button:nth-child(3)');
        await addLowGroupBtn.click();

        const groupNameInput = await page.waitForSelector('input[placeholder="请输入一账通-部门名称"]');
        await groupNameInput.type("测试部门");

        const appNameInput = await page.waitForSelector('input[placeholder="填写应用名称"]');
        await appNameInput.type("测试应用");

        const urlInput = await page.waitForSelector('input[placeholder="填写主页地址"]');
        await urlInput.type("https://www.baidu.com/");

        const remarksInput = await page.waitForSelector('input[placeholder="自定义备注"]');
        await remarksInput.type("ceshiyingyong");

        const addBtn = await page.waitForSelector('.buttons-right .ivu-btn.ivu-btn-primary');
        await addBtn.click();

        const cutPageBtn = await page.waitForSelector('.page.flex-row.ivu-page>li[title="4"]');
        await cutPageBtn.click();

        const appName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('测试应用');

        const remarks = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(3) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(remarks).toEqual('ceshiyingyong');
    },30000);


    test('TEST_001:验证设置子管理员查看日志' , async() => {

        const lookLogBtn = await page.waitForSelector('.header-middle a[href="#/admin/oplog"]');
        await lookLogBtn.click();

        const appName = await page.$eval('.ivu-table-row.table-normal-row>td:last-child>div>div', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('查看详细日志');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'longguikeji');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员添加应用是否生效' , async() => {
        const appName = await page.$eval('.card-list.flex-row>li:last-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('测试应用');

        const remarks = await page.$eval('.card-list.flex-row>li:last-child .intro', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('ceshiyingyong');

    },30000);

    test('TEST_001:验证设置子管理员添加应用是否生效' , async() => {

        const appBtn = await page.waitForSelector('.card-list.flex-row>li:last-child');
        await appBtn.click();

        const appUrl = await page.url();
        await expect(appUrl).toContain('https://www.baidu.com/');

    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'longguikeji');
        let managersettingaction  = new managerSettingAction();
        await managersettingaction.managerSettingc(page, "ffffff");
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员公司基础信息配置' , async() => {
        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('ffffff');

    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'ffffff', 'ffffff');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员公司信息配置' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const companySetBtn = await page.waitForSelector('.header-middle a[href="#/admin/config"]');
        await companySetBtn.click();

        const companyNameInut = await page.waitForSelector('input[placeholder="请输入公司名称"]');
        await companyNameInut.type("测试名称");

        const colorSelectBtn = await page.waitForSelector('.ivu-select-selection');
        await colorSelectBtn.click();

        const keepBtn = await page.waitForSelector('.admin-button-area.flex-col .admin-save-button.ivu-btn.ivu-btn-primary span');
        await keepBtn.click();

        let personalSetaction = new personalSetAction();
        await personalSetaction.exit(page);

        const companyName = await page.$eval('.org-name', elem => {
            return elem.innerHTML;
        });
        await expect(companyName).toEqual('测试名称');
    },30000);

    test('TEST_001:验证设置子管理员文件存储' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'ffffff', 'ffffff');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const companySetBtn = await page.waitForSelector('.header-middle a[href="#/admin/config"]');
        await companySetBtn.click();

        const saveSetBtn = await page.waitForSelector('.side-menu.ivu-menu.ivu-menu-light.ivu-menu-vertical>li:nth-child(2)');
        await saveSetBtn.click();

        const saveSetSelect = await page.$eval('.ivu-radio-group.ivu-radio-group-default.ivu-radio-default>label', elem => {
            return elem.innerHTML;
        });
        await expect(saveSetSelect).toEqual('本地存储');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'longguikeji');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSettingd(page, "222222"); 
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员应用权限' , async() => {
        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('ffffff');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, '222222', '222222');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证设置子管理员应用权限' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const appSetBtn = await page.waitForSelector('.header-middle a[href="#/admin/app"]');
        await appSetBtn.click();

        const appName1 = await page.$eval('.ivu-table-row>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(appName1).toEqual('111');

        const editBtn = await page.waitForSelector('.ivu-table-row .flex-row>span:nth-child(2)');
        await editBtn.click();

        const appNameInput = await page.waitForSelector('input[placeholder="填写应用名称"]');
        await appNameInput.type("222");

        const keepBtn = await page.waitForSelector('.buttons-right .ivu-btn.ivu-btn-primary');
        await keepBtn.click();

        const appName2 = await page.$eval('.ivu-table-row>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(appName2).toEqual('111222');

    },30000);

    test('TEST_001:验证设置子管理员文件存储' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, '222222', '222222');

        const appName = await page.$eval('.card-list.flex-row>li .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('111222');
    },30000);

})

describe('一账通-测试编辑子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch()
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, '222222', '222222');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证编辑子管理员应用权限' , async() => {
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const logBtn = await page.waitForSelector('.header-middle a[href="#/admin/oplog"]');
        await logBtn.click();

        const editLog = await page.$eval('.ivu-table-tbody>tr>td:last-child>div>div', elem => {
            return elem.innerHTML;
        });
        await expect(editLog).toEqual('查看详细日志');

    },30000);

})

describe('一账通-测试删除子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        let browser = await launch();
        page = await browser.newPage();
        await page.goto(cofig.url);

        let useraction = new UserAction();
        await useraction.login(page, '222222', '222222');
    },30000)
    afterEach ( async () => {
        await page.close();
    })

    test('TEST_001:验证删除子管理员' , async() => {

        const manageBtn = await page.$eval('.workspace-btn.ivu-btn.ivu-btn-default span', elem => {
            return elem.innerHTML;
        });
        await expect(manageBtn).toBeNull();

    },30000);

})
*/