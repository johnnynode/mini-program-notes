const DB = require('../utils/db.js')

module.exports = {
  /**
   * 拉取电影列表
   * 
   */

  async recommend(ctx) {
    try {
      ctx.state.data = await DB.query("SELECT * FROM movies_list as ml")
    } catch (error) {
      console.log(error)
    }
  },

  async detail(ctx) {
    let id = + ctx.params.id
    let movieDetail

    if (!isNaN(id)) {
      movieDetail = (await DB.query('select * from movies_list where movies_list.id = ?', [id]))[0]
    } else {
      movieDetail = {}
    }

    // product.commentCount = (await DB.query('SELECT COUNT(id) AS comment_count FROM comment WHERE comment.product_id = ?', [productId]))[0].comment_count || 0
    // product.firstComment = (await DB.query('SELECT * FROM comment WHERE comment.product_id = ? LIMIT 1 OFFSET 0', [productId]))[0] || null

    ctx.state.data = movieDetail
  },

  async hot(ctx) {
    try {
      ctx.state.data = await DB.query("SELECT * FROM movies_list;")
    } catch (error) {
      console.log(error)
    }
  },
}