Component({
    properties: {
      innerText: {
        type: String,
        value: '',
      },
      icon: {
        type: String,
        value: '',
      },
      className: {
        type: String,
        value: '',
      },
      to: {
        type: String,
        value: '',
      },
      type: {
        type: String,
        value: '',
      }
    },
    data: {
      // 这里是一些组件内部数据
      someData: {}
    },
    methods: {
      // 这里是一个自定义方法
      jump() {
        let type = +this.properties.type
        let to = this.properties.to
        // 根据不同的type来选择不同的跳转方式：1、navigateTo 2、redirectTo 3、navigateBack 4、switchTab 5、reLaunch
        // tip: wx.navigateTo 和 wx.redirectTo 不允许跳转到 tabbar 页面，只能用 wx.switchTab 跳转到 tabbar 页面
        let method = 'navigateTo'
        switch(type) {
          case 1:
              method = 'navigateTo'
            break;
          case 2:
              method = 'redirectTo'
            break;
          case 3:
              method = 'navigateBack'
            break;
          case 4:
              method = 'switchTab'
            break;
          case 5:
              method = 'reLaunch'
            break;
          default:
            // do nothing
        }
        // 跳转
        wx[method]({
          url: to
        })
      }
    }
  })
  