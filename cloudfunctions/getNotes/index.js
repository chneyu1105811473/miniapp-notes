const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'notes-test-940318'
})

/**
   * 如果有type值(0或者1)，则查询对应type的notes,1表示收入，0表示支出
   * 如果没有types则查询所有的notes
   */
const db = cloud.database()

exports.main = async (event, context) => {

  let {type,openid,pageSize,pageNum} = event

  const query = {
    openid,
    deleted:false
  }
  if(type===0){
    query.amount = _.lt(0)
  }else if(type===1){
    query.amount = _.gt(0)
  }

  console.log(query)

  try{
    const res = await db.collection('notes')
                        .where(query)
                        .skip((pageSize-1)*pageNum)
                        .limit(pageNum)
                        .orderBy('time','desc')
                        .get()
    const count = await db.collection('notes')
                          .where(query)
                          .count()
    const hasNew = !!(count > pageSize*pageNum)
    return {
      code:200,
      data:{
        list:res.data,
        hasNew
      }
    }
  }catch(err){
    return {
      code:0,
      message:err.message
    }
  }
  
}
