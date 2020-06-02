import Page from '../../common/page'
import Toast from '../../dist/toast/index'

const app = getApp()

Page({
  data:{},
  getUserInfo(){
    wx.getUserInfo({
      success(res){
        console.log(res)
        wx.setStorage({
          key:'userInfo',
          data:JSON.stringify(res.userInfo)
        })
        wx.navigateTo({
          url: '../board/board',
          fail: (err)=>{
            Toast.fail(err.errMsg)
          },
        });
      },
      fail(error){
        Toast.fail(error.errMsg)
      }
    })
  }
})
