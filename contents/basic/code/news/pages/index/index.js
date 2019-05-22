//index.js
//获取应用实例
import Api from '../../api/index'
import Util from '../../utils/util'

const barList = [
  {name:'国内', code: 'gn'},
  {name:'国际', code: 'gj'},
  {name:'财经', code: 'cj'},
  {name:'娱乐', code: 'yl'},
  {name:'军事', code: 'js'},
  {name:'体育', code: 'ty'},
  {name:'其他', code: 'other'}
]

Page({
  data: {
    barList: barList,
    code: barList[0].code,
    itemList: []
  },
  onLoad () {
    this.getList(); // 获取首页数据
  },
  // 获取首页列表数据
  getList (callback) {
    wx.showLoading() // loading
    Api.getNewsList({type:this.data.code}, (res)=>{
      let result = res.data.result;
      result.map((item)=>{
        item.date = Util.getHourAndMinutes(item.date)
      })
      this.setData({
        itemList: result
      })
    }, null, () => {
      wx.hideLoading()
      callback && callback()
    })
  },
  // 点击
  onTapBar(e) {
    this.setData({
      code: e.currentTarget.dataset.code
    })
    this.getList(); // 获取首页数据
  },
  // 跳转
  jumpTo(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getList(()=>{
        wx.stopPullDownRefresh()
    })
  }
})
