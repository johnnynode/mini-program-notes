const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    let content = ctx.request.body.content || null
    let type = +ctx.request.body.type
    let movieId = +ctx.request.body.movie_id


    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO comment(user, username, avatar, content, type, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, type, movieId])
    }

    ctx.state.data = {}
  },

  /**
   * 获取评论列表
   */
  list: async ctx => {
    let productId = +ctx.request.query.product_id

    if (!isNaN(productId)) {
      ctx.state.data = await DB.query('select * from comment where comment.product_id = ?', [productId])
    } else {
      ctx.state.data = []
    }
  },
}