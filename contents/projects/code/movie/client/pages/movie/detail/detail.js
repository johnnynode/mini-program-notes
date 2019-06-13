// pages/home/home.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index.js')
const config = require('../../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /* 打开actionsheet */
  openActionsheet: function(e) {
    wx.showActionSheet({
      itemList: ['文字','音频'],
      itemColor: '#007aff',
      success(res) {
        console.log(res.tapIndex);
        console.log('.....');

        // 跳转到编辑影评页面
        wx.navigateTo({
          url: '../../comments/list/list?type=' + res.tapIndex
        });
      }
    })
    console.log(e.currentTarget.dataset['index']);
  }
})