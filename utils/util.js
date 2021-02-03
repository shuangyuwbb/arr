const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const isValidation = e =>{
  let {value} = e.detail
  let re=/^\w+@[a-z0-9]+\.[a-z]{2,4}$/
  this.setData({
    email: value,
    errorMsgShow: !re.test(value),
    disabled: !re.test(value)
  })
}

const getWxSetting = () =>{
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: res => {
            console.log(res)
            app.globalData.userInfo = res
          }
        })
      } 
    }
  })
}

module.exports = {
  formatTime,
  getWxSetting
}
