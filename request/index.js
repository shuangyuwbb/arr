let ajaxTimes = 0

export const http = (params) =>{
    // ajaxTimes ++
    // wx.showLoading({
    //     title: '加载中',
    //     mask: true
    // })
    const baseUrl = 'http://10.1.40.77:5000'
    return new Promise((resolve, reject)=>{
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: res =>{
                resolve(res)
            },
            fail: err =>{
                reject(err)
            },
            complete: () =>{
                // ajaxTimes --
                // if(ajaxTimes === 0){
                //     wx.hideLoading()
                // }
            }
        })
    })
}