// pages/comment/comment.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const _ = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    commentList: [], // 评论列表
    commentExsit: true // 默认有评论
  },

  /**
   * 获取评论列表
   */
  getCommentList(id, callback) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.comment + id,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            commentList: result.data.data,
            commentExsit: !!result.data.data.length
          })
        } else {
          wx.showToast({
            title: '加载失败',
          })
          this.setData({
            commentExsit: false
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
        this.setData({
          commentExsit: false
        })
      },
      complete() {
        callback && callback()
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({id})
    this.getCommentList(id)
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
    this.getCommentList(this.data.id, ()=>{
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