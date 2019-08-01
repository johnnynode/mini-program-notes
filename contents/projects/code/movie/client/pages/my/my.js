// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */

  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    collectionList: []
  },

  // 获取收藏列表
  getCollectionList(callback) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.userCollection,
      success: result => {
        let data = result.data
        wx.hideLoading()
        if (!data.code) {
          let collectionList = data.data.data
          // 循环处理数据
          collectionList.map((item)=>{
            if(item.content && item.type === 1) {
              let contentArray = item.content.split(';');
              item.contentUrl = contentArray[0];
              item.contentTime = (contentArray[1] / 1000).toFixed(2);
            }
          })
          this.setData({
            collectionList
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
      },
      complete() {
        callback && callback()
      }
    });
  },

  // 点击登录
  onTapLogin: function () {
    app.login({
      success: ({userInfo}) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
        // 获取收藏列表
        this.getCollectionList()
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  // 跳转到首页
  toHome() {
    // 直接跳转到首页
    wx.reLaunch({
      url: '/pages/home/home'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
      // 同步授权状态
      this.setData({
        locationAuthType: app.data.locationAuthType
      })
      app.checkSession({
        success: ({ userInfo }) => {
          this.setData({
            userInfo
          })
          // 获取收藏列表
          this.getCollectionList()
        }
      })
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
    this.getCollectionList(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})