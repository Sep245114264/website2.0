const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      // [process.env.VUE_APP_BASE_API]: {
      // '/test': {
      //   target: 'http://127.0.0.1:3000',
      //   pathRewrite: {
      //     [`^${process.env.VUE_APP_BASE_API}`]: 'test',
      //   },
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // after: require('./mock/mock-server'),
  },
  chainWebpack(config) {
    // 脚手架默认通过file-loader处理svg文件
    // 所以需要先把存放svg icon的文件夹排除在外
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/icons'))
      .end();
    // 再添加一个新的loader
    config.module
      .rule('icons') // 规则名
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/icons')) // 检查路径
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
