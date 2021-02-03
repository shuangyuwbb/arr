import { http, baseUrl } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: baseUrl,
    loading: true,
    drawingName: 'contour.dxf',
    photo: '',
    url: ''
  },

  onLoad(event){
    let {name} = event
    this.loadDxf(name)
  },


  loadDxf(name){
    let params = {
      url: '/dxf',
      data:{ name }
    }
    http(params).then(res=>{
      this.setData({
        loading: false,
        url: res.data.dxf,
        photo: res.data.photo
      })
    })
  },

  submit(){
    wx.setClipboardData({
      data: baseUrl + this.data.url,
      success:()=> {
        wx.showToast({
          title: '复制成功！',
          icon: 'success'
        })
      }
    })
  }
})