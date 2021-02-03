import { http,baseUrl } from '../../request/index'
Page({
  data: {
    tempFilePaths: '',
    baseUrl: baseUrl,
    new_url: '',
    tipShow: true,
    scanShow: true,
    btnShow: false,
    imgUrl: '../../images/rectify.gif',
    tipTitle: '正在矫正图片信息...',

    new_name: '',
    demarcateUrl: ''
  },

  onLoad(event){
    let {tempFilePaths} = event
    this.setData({
      tempFilePaths
    })
    this.updateFile()
  },

  createDrawing() {
    wx.navigateTo({
      url: '/pages/produce/produce?name='+this.data.new_name
    })
  },

  reRecongize() {
    this.setData({
      new_url: '',
      scanShow: true,
      tipTitle: '正在扫描图片...'
    })
    this.loadRecongize()
  },

  updateFile() {
    wx.uploadFile({
      url: baseUrl + '/upload',
      filePath: this.data.tempFilePaths,
      name: 'img',
      formData: {
        filetype: 'image'
      },
      success: res => {
        const data = res.data
        if (data) {
          let res = JSON.parse(data)
          this.setData({
            new_name: res.data
          })
          this.loadDemarcate()
        }
      },
      fail: err => {
        wx.showToast({
          title: err,
          icon: 'none'
        })
      }
    })
  },

  /**获取矫正图 */
  loadDemarcate() {
    let params = {
      data: {
        name: this.data.new_name
      },
      url: '/demarcate',
      method: 'GET'
    }
    http(params).then(res => {
      // 扫描中
      this.setData({
        demarcateUrl: res.data,
        imgUrl: '../../images/scan.gif',
        tipTitle: '正在扫描图片...'
      })
      this.loadRecongize()
    })
  },

  loadRecongize() {
    let params = {
      url: '/recongize',
      data:{
        name: this.data.new_name
      }
    }
    http(params).then(res => {
      this.setData({
        new_url: res.data,
        scanShow: false,
        tipTitle: '识别效果图',
        btnShow: true
      })
    })
  }
})
