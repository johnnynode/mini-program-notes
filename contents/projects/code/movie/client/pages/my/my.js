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
    list: [],
    toggleList: ["收藏的影评", "发布的影评"],
    toggleIndex: 0
  },

  // 切换选择
  toggle() {
    wx.showActionSheet({
      itemList: this.data.toggleList,
      itemColor: '#007aff',
      success: (res) => {
        if(this.data.toggleIndex === res.tapIndex) {
          return;
        }
        // 存在不同则设置
        this.setData({
          toggleIndex: res.tapIndex
        })
        // 开始请求数据
        this.getList()
      }
    })
  },

  // 获取收藏列表 或 获取发布列表
  getList(callback) {
    wx.showLoading({
      title: '加载中',
    })
    // 重置数据
    this.setData({
      list:[]
    })
    qcloud.request({
      url: config.service[this.data.toggleIndex ? 'userPublish' : 'userCollection'],
      success: result => {
        let data = result.data
        wx.hideLoading()
        if (!data.code) {
          let list = data.data.data
          // 循环处理数据
          list.map((item)=>{
            if(item.content && item.type === 1) {
              let contentArray = item.content.split(';');
              item.contentUrl = contentArray[0];
              item.contentTime = (contentArray[1] / 1000).toFixed(2);
            }
          })
          this.setData({
            list
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
        this.getList()
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
          this.getList()
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
    this.getList(()=>{
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