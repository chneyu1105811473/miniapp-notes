const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'notes-test-940318'
})
const db = cloud.database()

exports.main = async (event, context) => {
  const {name,openid} = event
  name&&name.replace(/^\s*|\s*$/,'')
  console.log(event)
  if(!name){
    return {
      code:0,
      message:'添加category,name不能为空'
    }
  }
  try{
    await db.collection('categories').add({
      data:{
        name,
        openid,
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
