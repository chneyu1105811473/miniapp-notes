function request({name,data}){
  return new Promise((resolve,reject)=>{
    wx.cloud.callFunction({
      name,
      data
    }).then(res=>{
      const {result} = res
      if(result.code===200){
        resolve(result.data)
      }else{
        reject(new Error(result.message||JSON.stringify(result)))
      }
    }).catch(err=>{
      reject(err)
    })
  })
}

export default request