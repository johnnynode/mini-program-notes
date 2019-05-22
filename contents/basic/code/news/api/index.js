import constants from '../constants/index'
import http from './http'

let appPrefix = constants.appPrefix

export default {
    // 获取当前天气
    getNewsList(postData, suc, fail, complete) {
        return http.post(appPrefix + '/api/news/list', postData, suc, fail, complete)
    },
    // 获取未来天气
    getNewsDetail(postData, suc, fail, complete) {
        return http.get(appPrefix + '/api/news/detail', postData, suc, fail, complete)
    } 
}