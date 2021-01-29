import { http } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
  },

  bindChooseFile() {
    wx.chooseImage({
      success: res => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          tempFilePaths,
          tipShow: false
        })
        this.updateFile()
      }
    })
  },

  updateFile() {
    wx.uploadFile({
      url: this.data.baseUrl + '/upload',
      filePath: this.data.tempFilePaths[0],
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
          icon: 'error'
        })
      },
      complete:()=>{
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
    })
  },

})