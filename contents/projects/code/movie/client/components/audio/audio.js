const innerAudioContext = wx.createInnerAudioContext()
Component({
    properties: {
      src: {
        type: String,
        value: '',
      },
      time: {
        type: Number,
        value: 0,
      },
      className: {
        type: String,
        value: '',
      },
      type: {
        type: String,
        value: '',
      },
      audio: {
        type: Object,
        value: null
      }
    },
    data: {
      isPlaying: false
    },
    ready() {
        // 在组件实例进入页面节点树时执行
        // this.properties.innerAudioContext.src = this.properties.src.value;
        // this.audioListener();
        // 初始化值
        innerAudioContext.src = this.properties.src
        // 开始监听
        this.audioListener()
    },
    methods: {
      // 这里是一个自定义方法
      play() {
        innerAudioContext[this.data.isPlaying ? 'pause' : 'play'](); // 播放 或 暂停
      },
      audioListener() {
        innerAudioContext.onPlay(() => {
          this.setData({isPlaying: true})
        })
    
        innerAudioContext.onPause(() => {
          this.setData({isPlaying: false})
        });
        
        // 测试播放
        innerAudioContext.onError((res) => {
          this.setData({isPlaying: false})
          // 提示用户
          wx.showToast({
            icon: "none",
            title: "播放错误：" + res.errCode + "-" + res.errMsg,
          })
        })
      },
    }
  })
  