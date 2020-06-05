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
  let {name,openid} = event
  name && name.replace(/^\s+|\s+$/,'')

  try{
    let res
  if(name){
     res = await db.collection('categories').where({name,openid,deleted:false}).orderBy('createTime','desc').get()
  }else{
     res = await db.collection('categories').where({openid,deleted:false}).orderBy('createTime','desc').get()
  }
    return {
      code:200,
      data:res.data
    }
  }catch(err){
    return {
      code:0,
      message:err.message
    }
  }
  
}
