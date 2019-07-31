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
      innerAudioContext: {
        type: Object,
        value: null,
      },
      disabled: {
        type: Boolean,
        value: false
      }
    },
    data: {
      isPlaying: false
    },
    ready() {
        // 初始化值
        let innerAudioContext = this.properties.innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = this.properties.src
        // 开始监听
        this.audioListener()
    },
    methods: {
      // 这里是一个自定义方法
      play() {
        if(this.properties.disabled) {
          return;
        }
        this.properties.innerAudioContext[this.data.isPlaying ? 'pause' : 'play'](); // 播放 或 暂停
      },
      audioListener() {
        let innerAudioContext = this.properties.innerAudioContext;
        // 播放状态
        innerAudioContext.onPlay(() => {
          this.setData({isPlaying: true})
        })
        // 暂停状态
        innerAudioContext.onPause(() => {
          this.setData({isPlaying: false})
        });
        // 播放错误
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
  