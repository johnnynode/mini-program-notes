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
        innerAudioContext.src = this.properties.src
        console.log(this.properties.audio)
    },
    methods: {
      // 这里是一个自定义方法
      play() {
        console.log('here!')
        innerAudioContext[this.data.isPlaying ? 'pause' : 'play'](); // 播放 或 暂停
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
    }
  })
  