// pages/home/home.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index.js')
const config = require('../../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /* 获取电影详情信息 */
  getDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.movieDetail,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            movieDetail: result.data.data
          })
        } else {
          wx.showToast({
            title: '加载失败',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    });
  },

  /* 打开actionsheet */
  openActionsheet(e) {
    wx.showActionSheet({
      itemList: ['文字','音频'],
      itemColor: '#007aff',
      success(res) {
        // 跳转到编辑影评页面
        wx.navigateTo({
          url: '../../comments/list/list?type=' + res.tapIndex
        });
      }
    })
    console.log(e.currentTarget.dataset['index']);
  }
})