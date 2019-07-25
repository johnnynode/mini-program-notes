// pages/comment/comment.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const _ = require('../../../utils/util')
const windowWidth = wx.getSystemInfoSync().windowWidth
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    commentObj: {
      text: '',
      voice: ''
    },
    editObj: {},
    movieTopWidth: 0.3 * windowWidth,
    movieTopHeight: 0.46 * windowWidth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editObj = {
      num: options.num - 0,
      id: options.id,
      title: options.title,
      image: options.image
    }
    this.setData({editObj})
  },

  // textarea 的输入监听
  textInput(e) {
    this.setData({
      commentObj:{text: e.detail.value, voice: this.data.commentObj.voice}
    })
  },

  /* 完成按钮的点击 */
  toPreview() {
    // 相关校验程序
    if(!this.data.userInfo) {
      console.log('未登录!')
      return;
    }
    let commentObj = this.data.commentObj
    let editObj = this.data.editObj
    let num = editObj.num
    let isText = num === 0
    let text = commentObj.text
    let voice = commentObj.voice
    let content = (isText ? text : voice).trim()
    if(!content) {
      console.log('未' + (isText ? '填写' : '口述') + '影评!')
      return;
    }
    let id = editObj.id
    let title = editObj.title
    let image = editObj.image
    // 符合条件后跳转
    wx.navigateTo({
      url: '../preview/preview?num=' + num + '&id=' + id + '&title=' + title + '&image=' + image + '&text=' + text + '&voice=' + voice
   })
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
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        
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