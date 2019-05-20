export default {
    // Get 提交
    get (url, data, suc, fail, complete) {
        wx.request({
            url: url,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值 
            },
            success (res) {
                suc && suc(res)
            },
            fail() {
                fail && fail()
            },
            complete() {
                complete && complete()
            }
        })
    },
    // Post 提交
    post (url, data, suc, fail, complete) {
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success (res) {
                suc && suc(res)
            },
            fail() {
                fail && fail()
            },
            complete() {
                complete && complete()
            }
        })
    }
}