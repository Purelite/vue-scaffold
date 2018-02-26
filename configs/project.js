const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, '../src')
const DIST_PATH = path.resolve(ROOT_PATH, '../build')

module.exports = {
    projectName: 'Demo', //项目名称 即：服务器对应项目文件夹

    namePattern: {
        js: '[name].[hash:8].js'
    },
    path: {
        root: ROOT_PATH,
        src: SRC_PATH,
        dist: DIST_PATH,
        test: DIST_PATH,
        preprod: DIST_PATH
    },
    
    cdnPath: 'https://s.cdn.com/', //cdn域名
    preCdnPath: 'https://s.pre.cdn.com/', //预发cdn域名
    testCdnPath: 'https://s.daily.cdn.com/', //测试cdn域名

    devHost: 'xx.xxx.com', //本地开发host

    devPort: 8090, //本地开发域名 80端口要使用sudo

    //开发环境配置
    apiDomain: {
        development: {
            API:'"//api.xx.com"',
        },
        testing: {
            API:'"//api.xx.com"',
        },
        production: {
            API:'"//api.xx.com"',
        },
        preprod: {
            API:'"//api.xx.com"',
        }
    }
}
