const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  async add(ctx) {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    let content = ctx.request.body.content || null
    let type = +ctx.request.body.type
    let movieId = +ctx.request.body.movie_id

    if (!isNaN(movieId)) {
      try {
        await DB.query('INSERT INTO movies_comment(user, username, avatar, content, type, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, type, movieId])
        ctx.state.data = {'success:': true}
      } catch(e) {
        ctx.state.data = {'success:': false, 'message': e}
      }
    }
  },

  /**
   * 获取电影评论列表
   */
  async list(ctx) {
    let movieId = + ctx.params.id

    if (!isNaN(movieId)) {
      try {
        ctx.state.data = await DB.query('select * from movies_comment where movies_comment.movie_id = ? order by create_time desc', [movieId])
      } catch(e) {
        ctx.state.data = []
      }
    } else {
      ctx.state.data = []
    }
  },

  /**
   * 获取电影评论列表
   */
  async detail(ctx) {
    let commentId = + ctx.params.id

    if (!isNaN(commentId)) {
      try {
        ctx.state.data = (await DB.query('select mc.*,ml.*,mc.id as cid from movies_comment as mc inner join movies_list as ml on mc.movie_id = ml.id and mc.id = ?', [commentId]))[0]
      } catch(e) {
        console.log('e')
        ctx.state.data = {}
      }
    } else {
      ctx.state.data = {}
    }
  },

  /**
   * 获取用户发布影评列表
   */
  async userPublishList(ctx) {
    let user = ctx.state.$wxInfo.userinfo.openId
    if (user) {
      try { // movies_collection_user
        let list = await DB.query('select mc.*, ml.*, mc.id as cid from movies_comment as mc inner join movies_list as ml where mc.movie_id = ml.id and user = ?', [user])

        ctx.state.data = {success:true, data: list}
      } catch(e) {
        ctx.state.data = {success:false, message: e}
      }
    } else {
      ctx.state.data = {success:false, message: '非法的用户'}
    }
  },
}