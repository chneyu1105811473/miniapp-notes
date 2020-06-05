// pages/login/login.js
import Page from '../../common/page'
import request from '../../common/request'
import Toast from '../../dist/toast/toast'

const app = getApp()

Page({
  data:{
  },
  getUserInfo(){
    wx.getUserInfo({
      success(res){
        request({
          name:'login',
        }).then(result=>{
          wx.setStorageSync('token', result.openid);
          app.globalData.userInfo = res.userInfo
          app.globalData.openid = result.openid
          wx.switchTab({
            url: '/pages/index/index',
          });
        }).catch(err=>{
          Toast({
            message:err.message||err.errMsg
          });
        })
      }
    })
    
  }
})
