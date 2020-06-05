const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'notes-test-940318'
})
/**
   * 如果有name值，则查询name对应的category
   * 如果name没有值，则查询所有的category
   */
const db = cloud.database()
exports.main = async (event, context) => {
  let {amount,category,noteId,openid,type,time,des} = event
  
  try{
    await db.collection('notes').where({
      _id:noteId,
      openid,
    }).update({
      data:{
        amount,
        category,
        type,
        time,
        des,
        editTime:new Date()
      }
    })
    return {
      code:200,
      data:{}
    }
  }catch(err){
    return {
      code:0,
      message:err.message
    }
  }
  
}
