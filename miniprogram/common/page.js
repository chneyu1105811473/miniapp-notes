export default function(options){
  return Page({
    onShareAppMessage(e){
      console.log('share',e)
      return {
        title:'分享我的笔记'
      }
    },
    ...options
  })
}