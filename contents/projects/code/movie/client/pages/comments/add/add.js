// pages/comment/comment.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const _ = require('../../../utils/util')
const windowWidth = wx.getSystemInfoSync().windowWidth
const app = getApp()
const recorderManager = wx.getRecorderManager()

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
    movieTopHeight: 0.46 * windowWidth,
    timestart: 0,
    timing: 0,
    tempShortAudio: '',
    isRecording: false
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
    // 监听 录音
    this.rmListener()
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

  // 录音说话
  say(e) {
    let timestart = e.timeStamp
    // 配置信息
    const options = {
      duration: 60000,
      sampleRate: 8000,
      numberOfChannels: 1,
      encodeBitRate: 26000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options) 
    this.setData({
      timestart,
      isRecording: true
     })
  },

  // 手指移除
  sayOver(e) {
    let timing = e.timeStamp - this.data.timestart;
    this.setData({
      timing,
      isRecording: false
    })
    recorderManager.stop();
  },

  // 文件上传
  uploadFile(tempFilePath, time, size) {
    // loading 处理
    wx.showLoading({
      title: '上传中...',
    })
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: tempFilePath,
      name: 'file',
      header: {
        contentType: "multipart/form-data", // 按需求增加
      },
      formData: {
        file: tempFilePath
      },
      success: (res) => {
        if(!(res.statusCode === 200 && res.errMsg === 'uploadFile:ok')) {
          wx.showToast({
            icon: 'none',
            title: '上传失败：' + res.errMsg,
          })
          return
        }
        wx.showToast({
          title: '上传成功!'
        })
        // 成功获取结果后, 将结果拼接起来 path;time;size 组成新字符串传递
        let data = JSON.parse(res.data)
        let url = data.data.imgUrl;
        this.setData({
          commentObj: {
            text: this.data.commentObj.text, // 保持原样
            voice: url + ';' + time + ';' + size
          },
          tempShortAudio: url.substr(url.lastIndexOf('/') + 1, url.length - 1)
        })
      },
      complete() {
        wx.hideLoading() // 隐藏loading
      }
    })
  },
  
  // 录音 监听
  rmListener() {
    // 开始时间监听处理
    recorderManager.onError((res) => {
      wx.showToast({
        icon: 'none',
        title: '录音失败：' + res.errMsg,
      })
    })

    recorderManager.onStop((res) => {
      console.log('文件开始上传!');
      this.uploadFile(res.tempFilePath, res.duration, res.fileSize);
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