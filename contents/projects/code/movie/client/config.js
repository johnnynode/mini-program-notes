/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://bc6w6zya.qcloud.la'; // 这里填写自己的域名地址
var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login/`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user/`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel/`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload/`,

    // 拉取用户信息
    user: `${host}/weapp/user/`,

    // 首页推荐
    movieRecommend: `${host}/weapp/movie/recommend/`,

    // 热门电影列表
    movieHot: `${host}/weapp/movie/hot/`,

    // 电影详情
    movieDetail: `${host}/weapp/movie/`,

    // 添加评论 或 获取电影影评列表
    comment: `${host}/weapp/comment/`,

    // 获取影评详情
    commentDetail: `${host}/weapp/comment/detail/`,

    // 获取收藏状态 或 切换收藏状态
    collection: `${host}/weapp/collection/`,

    // 获取用户收藏列表
    userCollection: `${host}/weapp/user/collection/`,

    // 获取用户发布列表
    userPublish: `${host}/weapp/user/publish/`
  }
};

module.exports = config;