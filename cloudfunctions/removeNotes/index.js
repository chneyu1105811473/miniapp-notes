const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'notes-test-940318'
})
const db = cloud.database()

exports.main = async (event, context) => {
  const {noteId,openid} = event

  if(!noteId){
    return {
      code:0,
      message:'移除notes,noteId 不能为空'
    }
  }
  try{
    await db.collection('notes').where({
      _id:noteId,
      openid
    }).update({
      data:{
        deleted:true
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
