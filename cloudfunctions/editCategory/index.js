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
  let {categoryId,name,openid} = event
  name&&name.replace(/^\s*|\s*$/,'')

  if(!id||!name){
    return {
      code:0,
      message:'修改category，id和name不能为空'
    }
  }else{
    try{
      await db.collection('categories').where({_id:categoryId,openid}).update({
        data:{
          name,
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
}
