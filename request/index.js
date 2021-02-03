let ajaxTimes = 0
export const baseUrl = 'https://binbin-dev.bcjgy.com'

export const http = (params) => {
    // ajaxTimes ++
    // wx.showLoading({
    //     title: '加载中',
    //     mask: true
    // })
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: res => {
                if (res.data.status === 0) {
                    resolve(res.data)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                // ajaxTimes --
                // if(ajaxTimes === 0){
                //     wx.hideLoading()
                // }
            }
        })
    })
}