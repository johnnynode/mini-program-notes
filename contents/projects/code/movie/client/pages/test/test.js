// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieHotList: [],
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
    recorderManager.stop();
  },

  // 播放音频
  play() {
    // innerAudioContext.autoplay = false
    innerAudioContext.play(); // 播放
    // innerAudioContext.src = this.tempFilePath, todo
  },

  pause() {
    innerAudioContext.pause(); // 暂停
  },
  
  // 文件上传
  uploadFile(tempFilePath) {
    wx.uploadFile({
      url:'这里填写路径地址',
      filePath: tempFilePath,
      name: temp,
      header: {
        contentType: "multipart/form-data",//按需求增加
      },
      formData: {
        file: tempFilePath,
        //看后台需要什么传什么过去，这里我传两个，一个是临时路径，一个是录音时长
        time: TimeIng,
      },
      success: function (res) {
        //这里你可以根据后台传过来的res进行任性的操作，是的。。任性！！！
        console.log('res =>>> ')
        console.log(res)
        console.log(' ======== ')
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
      // var temp = tempFilePath.replace('.mp3', '')
      console.log('劳资获取到文件了，开始上传');
      // this.uploadFile();
    })
  },

  audioListener() {
    /*
    innerAudioContext.onPlay(() => {
      console.log('开始播放...!')
    })
    */
    
    // 测试播放
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
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