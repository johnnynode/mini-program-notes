//index.js
//获取应用实例

import Api from '../../api/index'
import Util from '../../utils/util'

Page({
  data: {
    detail: {}
  },
  onLoad (options) {
    console.log(options.id);
    this.getDetail(options.id);
  },
  // 获取详情数据
  getDetail (id) {
    wx.showLoading() // loading
    Api.getNewsDetail({id:id}, (res)=>{
      if(res.data.code !== 200) {
        return
      }
      let result = res.data.result
      result.date = Util.getHourAndMinutes(result.date)
      this.setData({
        detail: result
      })
    }, null, () =>{
      wx.hideLoading()
    })
  }
})
