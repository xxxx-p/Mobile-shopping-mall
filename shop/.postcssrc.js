module.exports = {
  plugins: {
    //...
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5, //vant-UI的官方根字体大小是37.5,css里的px单位按照37.5这个值进行转换，0.1rem就是3.75px
      propList: ['*']
    }
  }
}