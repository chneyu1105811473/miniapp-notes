// pages/login/login.js
import Page from '../../common/page'
import request from '../../common/request'
import Toast from '../../dist/toast/toast'

const app = getApp()

Page({
  data:{
  },
  getUserInfo(){
    request({
      name:'login'
    }).then(res=>{
      wx.setStorageSync('token', res.openid);
      wx.getUserInfo({
        success(res){
          app.globalData.userInfo = res.userInfo
        }
      })
      wx.switchTab({
        url: '/pages/index/index',
      });
    }).catch(err=>{
      console.log(err.message||err.errMsg)
      Toast({
        message:err.message||err.errMsg
      });
    })
  }
})
