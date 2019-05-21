//index.js
//获取应用实例

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
    barList: barList
  },
  onLoad () {

  },
  // 点击
  onTapBar(e) {
    console.log('code: ', e.currentTarget.dataset.code);
  }
})
