const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'notes-test-940318'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const {category,amount=0,time,des,type,openid} = event

  if(!category){
    return {
      code:0,
      message:'添加notes,categoryId 不能为空'
    }
  }
  try{
    await db.collection('notes').add({
      data:{
        category,
        amount,
        time,
        openid,
        des,
        type,
        deleted:false,
        editTime:new Date(),
        createTime:new Date()
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
