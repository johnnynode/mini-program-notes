/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)
// 获取首页推荐列表
router.get('/movie/recommend', controllers.movie.recommend)
// 获取商品热门电影列表 hot
router.get('/movie/hot', controllers.movie.hot)
// 获取电影详情
router.get('/movie/:id', controllers.movie.detail)
// 添加影评
router.post('/comment', validationMiddleware, controllers.comment.add)
// 获取电影影评列表
router.get('/comment/:id', validationMiddleware, controllers.comment.list)
// 获取影评列表
router.get('/comment/detail/:id', validationMiddleware, controllers.comment.detail)
// 获取收藏状态
router.get('/collection', controllers.collection.getState)
// 更新收藏状态
router.post('/collection', validationMiddleware, controllers.collection.update)
// 获取用户收藏列表
router.get('/user/collection', validationMiddleware, controllers.collection.list)
// 创建订单
router.post('/order', validationMiddleware, controllers.order.add)
// 显示已购买订单
router.get('/order', validationMiddleware, controllers.order.list)
// 商品添加到购物车列表
router.put('/trolley', validationMiddleware, controllers.trolley.add)
// 获取购物车商品列表
router.get('/trolley', validationMiddleware, controllers.trolley.list)
// 更新购物车商品列表
router.post('/trolley', validationMiddleware, controllers.trolley.update)

module.exports = router