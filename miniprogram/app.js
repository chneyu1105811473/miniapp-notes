//app.js
import request from './common/request'

App({
  onLaunch() {
    //判断是否有用户信息，如果以获取用户信息，直接跳转到首页，否则调到登录页面
    const that = this

    //判断登录
    const token = wx.getStorageSync('token')
    console.log(token)
    if(token){
      that.globalData.openid = token
      wx.navigateTo({
        url: '/pages/index/index',
      });
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        //测试环境id : notes-test-940318
        //正式环境id : notes-940318
        env: 'notes-test-940318',
        traceUser: true,
      })
    }
  },
  globalData:{
    userInfo:{},
    openid:'oQYZ35DlT3FGw4gSkk_ILiVvkJVI'
  }
})
