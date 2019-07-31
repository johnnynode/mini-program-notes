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
      innerAudioContext: {
        type: Object,
        value: wx.createInnerAudioContext(),
      }
    },
    data: {
      // 这里是一些组件内部数据
      innerAudioContext : wx.createInnerAudioContext(),
      isPlaying: false
    },
    lifetimes: {
      ready: function() {
        console.log('this.properties.innerAudioContext');
        console.log(this.properties.innerAudioContext);
        console.log('....')
        // 在组件实例进入页面节点树时执行
        this.properties.innerAudioContext.src = this.properties.src.value;
        this.audioListener();
      },
      detached: function() {
        // 在组件实例被从页面节点树移除时执行
      },
    },
    methods: {
      // 这里是一个自定义方法
      play() {
        this.properties.innerAudioContext[this.data.isPlaying ? 'pause' : 'play'](); // 播放 或 暂停
      },
      audioListener() {
        let innerAudioContext = this.properties.innerAudioContext
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
  