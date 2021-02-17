// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const platform = process.platform;
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    // 解决node_modules中包含svg文件导致编译出错的问题
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icon'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        // symbolId: 'icon-[name]'
        symbolId: function(paths) {
          const res = paths.substr(path.join(__dirname, 'src/assets/icon').length + 1).split(platform === 'linux' ? '/' : '\\');
          let symbolId = '';
          res.forEach((item, index) => {
            if (index === 0) {
              symbolId += item;
            } else {
              symbolId += item.replace(/^./, item.slice(0, 1).toUpperCase());
            }
          })
          return `icon-${path.basename(symbolId, '.svg')}`;
        }
      });
  }
}
