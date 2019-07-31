const DB = require('../utils/db')

module.exports = {

  /**
   * 获取收藏状态 openId 和 影评Id
   */
  async getState(ctx) {
    // let user = ctx.state.$wxInfo.userinfo.openId
    let user = ctx.request.query.user
    let id = +ctx.request.query.id
    
    if (!isNaN(id)) {
      try {
        let res = await DB.query('select * from movies_collection_user as mcu where mcu.cid = ? and mcu.user = ?', [id, user])
        console.log('res')
        console.log(res);
        // 设计返回值
        ctx.state.data = {'success:': true, 'data': !!res.length}
      } catch(e) {
        ctx.state.data = {'success:': false, 'message': e}
      }
    } else {
        ctx.state.data = {'success:': false, 'message': '无效的id'}
    }
  },

  /**
   * 更新收藏状态
   */
  async update(ctx) {
    // 获取参数
    let id = +ctx.request.body.id
    let user = ctx.request.body.user
    let flag = ctx.request.body.flag

    if (!isNaN(id)) {
      try {
        // 先查询该条记录
        let res = await DB.query('select * from movies_collection_user where cid = ? and user = ?', [id, user])
        if(!res.length && flag) {
            // 查询不到， 添加收藏
            await DB.query('INSERT INTO movies_collection_user(cid, user) VALUES (?, ?)', [id, user])
            ctx.state.data = {'success:': true, data: true}
        } else if(res.length && !flag) {
            // 查询到了，移除收藏
            await DB.query('DELETE FROM movies_collection_user WHERE movies_collection_user.cid = ?', [id])
            ctx.state.data = {'success:': true, data: false}
        } else {
            ctx.state.data = {'success:': false}
        }
      } catch(e) {
        ctx.state.data = {'success:': false, 'message': e}
      }
    } else {
        ctx.state.data = {'success:': false, 'message': '无效的id'}
    }
  },

  /**
   * 获取用户收藏列表
   */
  async list(ctx) {
    // let user = ctx.request.query.user
    let user = ctx.state.$wxInfo.userinfo.openId
    if (user) {
      try {
        let list = await DB.query('select * from movies_collection_user as mcu inner join movies_comment as mc inner join movies_list as ml where mcu.user = ? and mcu.cid = mc.id and mc.movie_id = ml.id', [user])
        // 设计返回值
        ctx.state.data = {'success:': true, 'data': list}
      } catch(e) {
        ctx.state.data = {'success:': false, 'message': e}
      }
    } else {
        ctx.state.data = {'success:': false, 'message': '无效的id'}
    }
  },
}