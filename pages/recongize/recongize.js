const app = getApp()
import {login} from '../../utils/asyncwx'
import {http} from '../../request/index'
Page({
  data:{
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad(){
    if(app.globalData.userInfo){
      this.setData({hasUserInfo: true})
    }else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo(event){
    app.globalData.userInfo = event.detail.userInfo
    if(!app.globalData.userInfo)return
    this.setData({hasUserInfo: true})
    login().then(res =>{
      console.log(res.code)
      let params = {
        url: '/login',
        data: {
          code: res.code,
          encryptedData: event.detail.encryptedData,
          iv: event.detail.iv
        },
        method: 'POST'
      }
      http(params).then(res=>{
        console.log(res)
      })
    })
  },

  bindChooseFile() {
    // if (app.globalData.userInfo) {
      wx.chooseImage({
        success: res => {
          const tempFilePaths = res.tempFilePaths[0]
          wx.navigateTo({
            url: '/pages/index/index?tempFilePaths=' + tempFilePaths,
          })
        }
      })
    // }
  }

})