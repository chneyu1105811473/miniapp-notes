// pages/setting/setting.js
import Page from '../../common/page'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      username:'',
      avatarUrl:'',
      gender:'',
      language:'',
      city:'',
      province:'',
      country:'',
      title:'个人中心'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const {userInfo} = app.globalData
    this.setData({
      username: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender:userInfo.gender === 1?'男':userInfo.gender === 2?'女':'未知',
      language:userInfo.language,
      city:userInfo.city,
      province:userInfo.province,
      country:userInfo.country
    })

  },
  handleClick: function (res) {
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
})