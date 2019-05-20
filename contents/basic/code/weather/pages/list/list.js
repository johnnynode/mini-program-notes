// list.js
import Api from '../../api/index'

const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({
  date: {
    city: '北京市',
    weekWeather: []
  },
  onLoad(options) {
    // console.log(options.city)
    this.setData({
      city: options.city
    });
    this.getWeekWeather()
  },
  onPullDownRefresh() {
    this.getWeekWeather(()=>{
      wx.stopPullDownRefresh()
    })
  },
  getWeekWeather(callback){
    Api.getWeekWeather({
      time: new Date().getTime(),
      city: this.data.city
    }, (res)=>{
      let result = res.data.result
      this.setWeekWeather(result)
    }, null, ()=>{
      callback && callback()
    })
  },
  setWeekWeather(result){
    let weekWeather = []
    for (let i=0; i<7; i++){
      let date = new Date()
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    weekWeather[0].day = '今天'
    this.setData({
      weekWeather:weekWeather
    })
  }
})