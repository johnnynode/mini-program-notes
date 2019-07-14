// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'http://img3.redocn.com/tupian/20150530/daqigerenjianlifengmian_4388852.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeList()
  },

  /* 首页 获取所有电影中的三条电影 暂时不联查推荐的表 */
  getHomeList() {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.homeList,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            homeList: result.data.data
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

  addToTrolley(event) {
    let productId = event.currentTarget.dataset.id
    let productList = this.data.productList
    let product

    for (let i = 0, len = productList.length; i < len; i++) {
      if (productList[i].id === productId) {
        product = productList[i]
        break
      }
    }

    if (product) {
      qcloud.request({
        url: config.service.addTrolley,
        login: true,
        method: 'PUT',
        data: product,
        success: result => {
          let data = result.data

          if (!data.code) {
            wx.showToast({
              title: '已添加到购物车',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '添加到购物车失败',
            })
          }
        },
        fail: () => {
          wx.showToast({
            icon: 'none',
            title: '添加到购物车失败',
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})