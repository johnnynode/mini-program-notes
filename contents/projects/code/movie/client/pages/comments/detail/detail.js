// pages/comment/comment.js
const qcloud = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const _ = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [], // 评论列表
    treedata: [
        {
          id:1,
          name:"第一层1",
          childs:[
            {
              id: 2,
              name: "第二层11",
              childs: [
                {
                  id: 4,
                  name: "第三层11",
                  childs: [
                    {
                      id: 5,
                      name: "第四层11",
                      childs: [

                      ]
                    },
                    {
                      id: 6,
                      name: "第四层12"
                    }
                  ]
                },
                {
                  id: 7,
                  name: "第三层12"
                }
              ]
            },
            {
              id: 3,
              name: "第二层12"
            }
          ]
        },
        {
          id: 2,
          name: "第一层2",
          childs: [
            {
              id: 8,
              name: "第二层21",
              childs: [
                {
                  id: 9,
                  name: "第三层21",
                  childs: [
                    {
                      id: 10,
                      name: "第四层21",
                      childs: [
                        {
                            id:14,
                            name:"第五层"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 12,
                  name: "第三层22"
                }
              ]
            },
            {
              id: 13,
              name: "第二层22"
            }
          ]
        }
    ]
  },

  // 弹出 openActionsheet
  openActionsheet: function(e) {
    wx.showActionSheet({
      itemList: ['文字','音频'],
      itemColor: '#007aff',
      success(res) {
        // 跳转到编辑影评页面
        wx.navigateTo({
          url: '../../comments/edit/edit?type=' + res.tapIndex
        });
      }
    })
    console.log(e.currentTarget.dataset['index']);
  },

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src
    let urls = target.dataset.urls

    wx.previewImage({
      current: src,
      urls: urls
    })
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList,
      data: {
        product_id: id
      },
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            commentList: data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = _.formatTime(itemDate)
              item.images = item.images ? item.images.split(';;') : []
              return item
            })
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product = {
      id: options.id,
      name: options.name,
      price: options.price,
      image: options.image
    }
    this.setData({
      product: product
    })
    this.getCommentList(product.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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