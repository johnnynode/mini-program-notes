//index.js
//获取应用实例
import Api from '../../api/index'

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

const locationAuthList = [
  {type: 0, text: '点击获取当前位置'},
  {type: 1, text: '点击开启位置权限'},
  {type: 2, text: ''}
]

const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

Page({
  data: {
    nowTemp: '14°',
    nowWeather: '阴天',
    nowWeatherBackground: "",
    forecast: [],
    city: '北京市',
    locationTipsText: "点击获取当前位置",
    locationTipsText: locationAuthList[0].text,
    locationAuthType: locationAuthList[0].type
  },
  onLoad: function () {
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B' // key 是 https://lbs.qq.com/qqmap_wx_jssdk/index.html 申请的秘钥
    })
    // 根据设置来处理
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation']
        let locationAuthType = auth ? locationAuthList[2].type
          : (!auth) ? locationAuthList[1].type : locationAuthList[0].type
        let locationTipsText = auth ? locationAuthList[2].text
          : (!auth) ? locationAuthList[1].text : locationAuthList[0].text
        this.setData({
          locationAuthType,
          locationTipsText
        })
        // 根据auth获取天气
        auth && this.getCityAndWeather()
        !auth && this.getNowWeather()
      },
      fail: ()=>{
        this.getNowWeather() //使用默认城市
      }
    })
    this.getNowWeather();
  },
  // 获取现在天气
  getNowWeather(callback) {
    Api.getNowWeather({city: this.data.city}, (res)=>{
      let result = res.data.result
      this.setNowWeather(result) // 设置当前天气
      this.setForecastWeather(result) // 设置天气预报
      this.setTodayPanel(result); // 设置今天面板
    }, null, ()=>{
      callback && callback()
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
    this.getCityAndWeather()
  },
  // 根据城市获取天气
  getCityAndWeather() {
    wx.getLocation({
      success: res=>{
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res=>{
            let city = res.result.address_component.city
            this.setData({
              city:city,
              locationAuthType: locationAuthList[2].type,
              locationTipsText: locationAuthList[2].text
            })
            this.getNowWeather()
          }
        })
      },
      fail: () => {
        this.setData({
          locationAuthType: locationAuthList[1].type,
          locationTipsText: locationAuthList[1].text
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
