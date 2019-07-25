const qcloud = require('../../../vendor/wafer2-client-sdk/index.js')
const config = require('../../../config.js')
const windowWidth = wx.getSystemInfoSync().windowWidth

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieDetail: [], // 电影列表
    movieTopWidth: 0.3 * windowWidth,
    movieTopHeight: 0.46 * windowWidth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },

  /* 获取电影详情信息 */
  getDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            movieDetail: result.data.data
          })
        } else {
          wx.showToast({
            title: '加载失败',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    });
  },

  /* 打开actionsheet */
  openActionsheet(e) {
    let id = this.data.movieDetail.id;
    let image = this.data.movieDetail.image;
    let title = this.data.movieDetail.title;
    wx.showActionSheet({
      itemList: ['文字','音频'],
      itemColor: '#007aff',
      success(res) {
        // 跳转到编辑影评页面
        wx.navigateTo({
          url: '../../comments/add/add?num=' + res.tapIndex + '&id=' + id + '&image=' + image + '&title=' + title
        });
      }
    })
    console.log(e.currentTarget.dataset['index']);
  }
})