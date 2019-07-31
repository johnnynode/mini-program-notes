// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = 'http://mpge.5nd.com/2019/2019-6-28/92325/1.mp3'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieHotList: [],
    isPlaying: false
  },

  // 录音说话
  say(e) {
    console.log('e ....')
    console.log(e);
    console.log('......')
    var Timestart = e.timeStamp
    const options = {
      duration: Timestart,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options) 
    this.setData({ Timestart: Timestart })
  },

  // 手指移除
  sayOver(e) {
    console.log('say over!');
    var Timestart = this.data.Timestart;
    var Timeout = e.timeStamp;
    var TimeIng = Timeout - Timestart;
    this.setData({
      TimeIng
    })
    recorderManager.stop();
  },

  // 播放或暂停音频
  play() {
    innerAudioContext[this.data.isPlaying ? 'pause' : 'play'](); // 播放 或 暂停
  },
  
  // 文件上传
  uploadFile(tempFilePath, time, size) {
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
      success: function (res) {
        console.log('res =>>> ')
        console.log(res)
        console.log(' ======== ')
        // 成功获取结果后, 将结果拼接起来 path;time;size 组成新字符串传递
        
      }
    })
  },

  rmListener() {
    // 开始时间监听处理
    recorderManager.onError((res) => {
      console.log('小伙砸你录音失败了！');
    })

    recorderManager.onStop((res) => {
      console.log('2 res')
      console.log(res);
      console.log('....')
      var tempFilePath = res.tempFilePath;// 文件临时路径
      let size = res.size;
      let timing = this.data.TimeIng
      // var temp = tempFilePath.replace('.mp3', '')
      console.log('劳资获取到文件了，开始上传');
      this.uploadFile(tempFilePath, TimeIng, size);
    })
  },

  audioListener() {
    innerAudioContext.onPlay(() => {
      console.log('开始播放...!')
      this.setData({isPlaying: true})
    })

    innerAudioContext.onPause(() => {
      console.log('开始暂停...!')
      this.setData({isPlaying: false})
    });
    
    // 测试播放
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      this.setData({isPlaying: false})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rmListener()
    this.audioListener()
  }
})