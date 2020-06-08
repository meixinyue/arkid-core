import login
from config import base_url

token = login.login()            

httpurl_data = [                   #存放所有测试用例的列表，每一条字典类型数据是一个测试用例
    # 1.登录接口 第一条用例
    {'tittle': '登录接口',  # 用例的名称
     'skip': False,  # 跳过用例，bool类型，False，空，0，不存在skip为不跳过，其余均为跳过
     'url': '{}siteapi/oneid/ucenter/login/'.format(base_url),
     'headers':{
         'Content-Type': 'application/json;charset=UTF-8'    
     },
     'payload': {
         'password': 'admin',
         'username': 'admin'
     },
     'type': 'post',  # 请求的类型，支持'get','post','options','head','delete','put','connect' 这条是 post 类型
     'time': 1 , # 用例等待的时间 秒 1就是等待1秒后执行
     'assert':['admin']     #断言，列表类型，可添加多个判断条件，与接口返回值对比
     },
    {'tittle': '应用信息接口',  # 用例的名称
     'skip': False,  
     'url': '{}siteapi/oneid/ucenter/apps/'.format(base_url),
     'headers':{
         'Content-Type': 'application/json',
         'Authorization': 'token ' + token
     },
     'type': 'get',  # 请求的类型 get 或者post，这条是 get 类型
     'time': 1 , # 用例等待的时间 秒 1就是等待1秒后执行
     'assert':['百度']   #断言内容，与接口返回值对比
     },
     {'tittle': '节点信息接口',  # 用例的名称
     'skip': 0,  # 前置条件 写skip 跳过这个用例
     'url': '{}siteapi/oneid/meta/node/'.format(base_url),
     'headers':{
         'Authorization': 'token ' + token
     },
     'type': 'get',  # 请求的类型 get 或者post，这条是 get 类型
     'time': 1, # 用例等待的时间 秒 1就是等待1秒后执行
     'assert':['部门']   #断言内容，与接口返回值对比
     }
]