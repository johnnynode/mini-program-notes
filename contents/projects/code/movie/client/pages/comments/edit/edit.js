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

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src
    let urls = target.dataset.urls

    wx.previewImage({
      current: src,
      urls: urls
    })
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList,
      data: {
        product_id: id
      },
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            commentList: data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = _.formatTime(itemDate)
              item.images = item.images ? item.images.split(';;') : []
              return item
            })
          })
        }
      },
    })
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

  /* 完成按钮的点击 */
  submit() {
    if(!this.data.userInfo) {
      console.log('未登录!')
      return;
    }
    let isText = this.data.num === 0
    let postData = {
      movie_id: this.data.editObj.movie_id,
      type: this.data.editObj.num,
      content: isText ? this.data.commentObj.text : this.data.commentObj.voice,
      user: this.data.userInfo.openId,
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl
    }
    // 相关校验程序
    postData.content = postData.content.trim();
    if(!postData.content) {
      console.log('未' + (isText ? '填写' : '口述') + '影评!')
      return;
    }
    // 请求后台
    qcloud.request({
      url: config.service.addMovieComment,
      login: true,
      method: 'POST',
      data: postData,
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (!data.code) {
          wx.showToast({
            title: '评价成功',
          })

          // 跳转到预览页面
          
        } else {
          wx.showToast({
            icon: 'none',
            title: '评价失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '评价失败',
        })
      }
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