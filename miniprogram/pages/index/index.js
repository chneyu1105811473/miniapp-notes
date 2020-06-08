// pages/index/index.js
import Page from '../../common/page'
import request from '../../common/request'
import formatTime from '../../utils/index'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

const app = getApp()

Page({
  data:{
    isEdit:false,
    show:false,
    showCategoryForm:false,
    notes:[],
    categories:[],
    types:['支出','收入'],
    typeIndex:0,
    categoryIndex:0,
    time:formatTime("YYYY-MM-DD"),
    categoryName:'',//新建类目使用
    des:'',
    noteId:'',
    pageSize:1,
    pageNum:20,
    finished:false
  },
  onLoad(){
    this.getNotes()
    this.getCategories()
  },
  showNotesForm(){
    this.getCategories()
    //弹出添加账单的页面
    this.setData({
      show:true
    })
  },
  getNotes(isNew=false){
    if(isNew){
      this.setData({
        finished:false,
        pageSize:1
      })
    }
    if(this.data.finished)return
    
    const that = this
    request({
      name:'getNotes',
      data:{
        openid:app.globalData.openid,
        pageSize:that.data.pageSize,
        pageNum:that.data.pageNum,
      }
    }).then(res=>{
      const notes = that.data.notes
      if(isNew){
        notes.splice(0,notes.length,...res.list)
      }else{
        notes.splice(notes.length,0,...res.list)
      }
      const pageSize = that.data.pageSize+1
      that.setData({
        notes,
        pageSize,
        finished:!res.hasNext
      })
    })
  },
  getCategories(){
    const that = this
    request({
      name:'getCategories',
      data:{
        openid:app.globalData.openid
      }
    }).then(res=>{
      that.setData({
        categories:res
      })
    })
  },
  bindDateChange(e){
    console.log(e)
    this.setData({
      time:e.detail.value
    })
  },
  bindTypeChange(e){
    console.log(e)
    this.setData({
      typeIndex:Number(e.detail.value)
    })
  },
  bindCategoryChange(e){
    this.setData({
      categoryIndex:Number(e.detail.value)
    })
  },
  onClose(){
    this.setData({
      show:false,
      isEdit:false,
      amount:'',
      typeIndex:0,
      categoryIndex:0,
      time:formatTime("YYYY-MM-DD"),
      des:'',
      noteId:''
    })
  },
  showCategoryForm(){
    this.setData({
      showCategoryForm:true
    })
  },
  onCloseCategryForm(){
    this.setData({
      showCategoryForm:false,
      categoryName:''
    })
  },
  changeCategory(e){
    this.setData({
      categoryName:e.detail.value
    })
  },
  changeAmount(e){
    this.setData({
      amount:e.detail.value
    })
  },
  changeDes(e){
    this.setData({
      des:e.detail.value
    })
  },
  addCategory(){
    if(!this.data.categoryName){Toast('类目不能为空！');return}

    const that = this
    const {categoryName} = this.data

    request({
      name:'addCategory',
      data:{
        name:categoryName,
        openid:app.globalData.openid
      }
    }).then(()=>{
      that.setData({
        showCategoryForm:false
      })
      that.getCategories()
    }).catch(err=>{
      Toast(err.message)
    })

  },
  addNotes(){
    console.log(this.data)
    if(!this.data.amount) {Toast('金额不能为空！');return}
    if(!this.data.categories.length) {Toast('类目不能为空！');return}

    const {categoryIndex,typeIndex,amount,time,des,categories} = this.data
    const category = categories[categoryIndex]
    const {isEdit} = this.data
    const that = this

    request({
      name:isEdit?'editNotes':'addNotes',
      data:{
        noteId:that.data.noteId,
        type:typeIndex,
        amount,
        time,
        des,
        category,
        openid:app.globalData.openid
      }
    }).then(()=>{
      that.setData({
        show:false,
        isEdit:false,
        finished:false
      })
      that.getNotes(true)
    }).catch(err=>{
      Toast(err.message)
    })
  },
  removeNotes(item){
    //是否确认删除
    const {current} = item.mark
    const that = this
    const type = current.type===0?'支付':'收入'
    Dialog.confirm({
      title:`是否删除?`,
      message:`${type}账单：${current.category.name} ${current.amount}元`
    }).then(()=>{
      request({
        name:'removeNotes',
        data:{
          noteId:current._id,
          openid:app.globalData.openid
        }
      }).then(()=>{
        that.getNotes(true)
      })
      .catch((err)=>Toast(err.message))
    }).catch(err=>{
      console.log(err)
    })
  },
  editNotes(item){
    const {current} = item.mark
    const categoryIndex = this.data.categories.findIndex(cate=>cate._id===current.category._id)
    this.setData({
      isEdit : true,
      typeIndex:current.type,
      amount:current.amount,
      des:current.des,
      time:current.time,
      categoryIndex,
      show:true,
      noteId:current._id
    })
  }
})