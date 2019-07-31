// pages/comment/comment.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const _ = require('../../../utils/util')
const windowWidth = wx.getSystemInfoSync().windowWidth
const app = getApp()
let collectionFlag = false; // 用于控制切换收藏的哨兵变量

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    commentDetail: {}, // 评论详情
    movieTopWidth: 0.3 * windowWidth,
    movieTopHeight: 0.46 * windowWidth,
    isCollection: false
  },

  // 获取收藏状态
  getCollectionState(id, user) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.collection + '?id=' + id + '&user=' + user,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            isCollection: result.data.data.data
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

  // 切换收藏 post
  switchCollection() {
    // 函数节流，哨兵拦截
    if(collectionFlag) {
      return;
    }
    collectionFlag = true;
    
    let postData = {
      id: this.data.commentDetail.cid,
      user: this.data.userInfo.openId,
      flag: !this.data.isCollection
    }
    // 请求后台
    qcloud.request({
      url: config.service.collection,
      method: 'POST',
      login: true,
      data: postData,
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (!data.code) {
          wx.showToast({
            title: (data.data.data ? '' : '取消') + '收藏成功!'
          })
          this.setData({
            isCollection: data.data.data
          })
          console.log('xxxx')
          console.log(this.data.isCollection)
          console.log('........')
        } else {
          wx.showToast({
            icon: 'none',
            title: '收藏状态更新失败!',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '收藏状态更新失败!',
        })
      },
      complete () {
        collectionFlag = false;
      }
    })
  },

  // 查询影评详情
  getCommentDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    qcloud.request({
      url: config.service.commentDetail + id,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          let commentDetail = result.data.data;
          // 对音频文件的处理
          let content = commentDetail.content
          if(content && commentDetail.type === 1) {
            let contentArray = content.split(';');
            // path;time;size
            commentDetail.contentUrl = contentArray[0];
            commentDetail.contentTime = contentArray[1];
            commentDetail.contentSize = contentArray[1];
          }
          this.setData({
            commentDetail
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

  // 弹出 openActionsheet
  openActionsheet: function(e) {
    let commentDetail = this.data.commentDetail;
    let id = commentDetail.movie_id;
    let image = commentDetail.image;
    let title = commentDetail.title;
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // 获取评论详情
    let id = options.id;
    this.getCommentDetail(id)
    // 获取用户信息
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        // 获取评论收藏状态
        this.getCollectionState(id, userInfo.openId)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})