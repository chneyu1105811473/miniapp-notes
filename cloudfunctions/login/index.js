// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'notes-test-940318'
})

const db = cloud.database()
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {

  const {OPENID} = cloud.getWXContext()

  console.log(OPENID)
  const {token} = event
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  
  if(!token||token===OPENID){
    //写入用户token
    const res = await db.collection('users').where({token:OPENID}).get()
    if(!res.data.length){
      await db.collection('users').add({
        data:{
          token:OPENID,
          createTime:new Date()
        }
      })
    }
    //返回数据
    return {
      code:200,
      data:{
        openid:OPENID
      }
    }
  }else{
    return {
      code:0,
      message:'token异常，请重新登录'
    }
  }
}

