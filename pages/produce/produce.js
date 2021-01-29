import { http } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: 'http://10.1.40.77:5000',
    loading: true,
    drawingName: '20210121-1.dxf',
    disabled: true,
    errorMsgShow: false,
    email: '',
    photo: ''


  },

  onLoad(e){
    console.log(e.name)
    this.loadDxf(e.name)
  },


  loadDxf(name){
    let params = {
      url: '/dxf',
      data:{
        name
      }
    }
    http(params).then(res=>{
      console.log(res)
      this.setData({
        loading: false,
        url: res.data.data.dxf,
        photo: res.data.data.photo
      })
    })
  },


  isValidation(e){
    let {value} = e.detail
    let re=/^\w+@[a-z0-9]+\.[a-z]{2,4}$/
    this.setData({
      email: value,
      errorMsgShow: !re.test(value),
      disabled: !re.test(value)
    })

  },

  submit(){
    wx.navigateTo({
      url: '/pages/success/success',
    })
  }
})