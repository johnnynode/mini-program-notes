// pages/comment/comment.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const _ = require('../../../utils/util')
const windowWidth = wx.getSystemInfoSync().windowWidth

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentDetail: {}, // 评论详情
    movieTopWidth: 0.3 * windowWidth,
    movieTopHeight: 0.46 * windowWidth
  },

  // 查询影评详情
  getCommentDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.commentDetail + id,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            commentDetail: result.data.data
          })
          console.log(this.data.commentDetail)
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

  // 弹出 openActionsheet
  openActionsheet: function(e) {
    wx.showActionSheet({
      itemList: ['文字','音频'],
      itemColor: '#007aff',
      success(res) {
        // 跳转到编辑影评页面
        wx.navigateTo({
          url: '../../comments/edit/edit?type=' + res.tapIndex
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommentDetail(options.id)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})