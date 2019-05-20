import constants from '../constants/index'
import http from './http'

let appPrefix = constants.appPrefix

export default {
    // 获取当前天气
    getNowWeather(postData, suc, fail, complete) {
        return http.post(appPrefix + '/api/weather/now', postData, suc, fail, complete)
    },
    // 获取未来天气
    getWeekWeather(postData, suc, fail, complete) {
        return http.post(appPrefix + '/api/weather/future', postData, suc, fail, complete)
    } 
}