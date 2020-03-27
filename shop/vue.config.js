module.exports = {
    chainWebpack: (config) => {
        config.module.rule('js').test(/\.js$/).use('babel-loader').loader('babel-loader')
    }, //babel-loader 配置
    configureWebpack: config => {
        config.entry.app = ["babel-polyfill", "./src/main.js"];
    },//babel-polyfill 配置  由于按需引入，所以这里不用手动引入,但是ie 不兼容
    devServer: {
        proxy: { //开发环境代理
            ['api/']: {
                //目标代理地址，最终发送到 http://dingdong-api.nodebook.top/h5/nottoken
                target: 'http://dingdong-api.nodebook.top/h5',
                changeOrigin: true, //开启代理服务器
                pathRewrite: {
                    //将/dev-api替换为' '
                    '^/api': ''
                }
            },
            //     ['apii/']: {
            //         //目标代理地址，最终发送到 http://dingdong-api.nodebook.top/h5/nottoken
            //         target: ' http://mengxuegu.com:7300/mock/5e104d1b334bc65f75e23cd1',
            //         changeOrigin: true, //开启代理服务器
            //         pathRewrite: {
            //             //将/dev-api替换为' '
            //             '^/apii': ''
            //         }
            //     }
        }
    },
}