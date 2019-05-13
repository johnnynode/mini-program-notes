//index.js
//获取应用实例

const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
 }

Page({
  data: {
    nowTemp: '14°',
    nowWeather: '阴天',
    nowWeatherBackground: ""
  },
  onLoad: function () {
    this.getNowWeather();
  },
  getNowWeather: function(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //仅为示例，并非真实的接口地址
      data: {
        city: '北京市' 
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        // 更新天气数据
        this.setData({
            nowTemp: temp,
            nowWeather: weatherMap[weather],
            nowWeatherBackground: '/images/' + weather + '-bg.png'
        })
        // 同步设置导航条
        wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: weatherColorMap[weather],
        })
      },
      complete: ()=> {
        callback && callback()
      }
    })
  },
  onPullDownRefresh: function() {
    // wx.stopPullDownRefresh()
    this.getNow(()=>{
        wx.stopPullDownRefresh()
    })
  }
})
