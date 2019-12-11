module.exports = {
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    hotOnly: false
    // proxy: {// 设置代理
    //   // '/api': {
    //   //   // 代理路径 例如 https://baidu.com
    //   //   target: 'http://47.96.163.127:3001/',
    //   //   // 将主机标头的原点更改为目标URL
    //   //   changeOrigin: true,
    //   //   ws: true,
    //   //   pathRewrite: {
    //   //     '^/api': ''
    //   //   }
    //   // }
    // }
  }
}
