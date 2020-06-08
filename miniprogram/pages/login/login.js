// pages/login/login.js
import Page from '../../common/page'
import request from '../../common/request'

const app = getApp()

Page({
  data:{
  },
  getUserInfo(){
    console.log(111)
    request({
      name:'login',
    }).then(result=>{
      wx.setStorageSync('token', result.openid);
      app.globalData.openid = result.openid
      wx.switchTab({
        url: '/pages/index/index',
      });
    }).catch(err=>{
      wx.showToast({
        title: err.message||err.errMsg,
        icon: 'none',
        duration: 2000
      })
    })
  }
})
