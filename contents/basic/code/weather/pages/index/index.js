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

const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

Page({
  data: {
    nowTemp: '14°',
    nowWeather: '阴天',
    nowWeatherBackground: "",
    forecast: [],
    city: '北京市',
    locationTipsText: "点击获取当前位置"
  },
  onLoad: function () {
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B' // key 是 https://lbs.qq.com/qqmap_wx_jssdk/index.html 申请的秘钥
    })
    this.getNowWeather();
  },
  // 获取现在天气
  getNowWeather(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //仅为示例，并非真实的接口地址
      data: {
        city: this.data.city
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        let result = res.data.result
        this.setNowWeather(result) // 设置当前天气
        this.setForecastWeather(result) // 设置天气预报
        this.setTodayPanel(result); // 设置今天面板
      },
      complete: ()=> {
        callback && callback()
      }
    })
  },
  // 设置当前天气
  setNowWeather(result) {
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
  // 设置今天的面板
  setTodayPanel(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 今天`
    })
  },
  // 设置预报天气
  setForecastWeather(result) {
    let forecast = []
    let _forecast = result.forecast
    let nowHour = new Date().getHours()
    for (let i = 0; i < 8; i += 1) {
      forecast.push({
        time: (i * 3 + nowHour) % 24 + "时",
        iconPath: '/images/' + _forecast[i].weather + '-icon.png',
        temp: _forecast[i].temp + '°'
      })
    }
    _forecast[0].time = '现在' // 第一项 强制设置为现在
    this.setData({
      forecast
    })
  },
  // 今日面板的点击事件
  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list?city=' + this.data.city
    })
  },
  // 获取地理位置
  onTapLocation() {
    wx.getLocation({
      success: res =>{
          // console.log(res.latitude, res.longitude)
          this.qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: res=>{
              // console.log(city)
              let city = res.result.address_component.city
              this.setData({
                city:city,
                locationTipsText: ""
              })
              this.getNowWeather(); // 获取当前天气
            }
          })
      }
    })
  },
  // 设置预报天气
  onPullDownRefresh() {
    this.getNowWeather(()=>{
        wx.stopPullDownRefresh()
    })
  }
})
