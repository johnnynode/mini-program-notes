/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://yours-id.qcloud.la'; // 这里填写自己的域名地址
var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    // 拉取用户信息
    user: `${host}/weapp/user`,

    

    // 添加评论
    addComment: `${host}/weapp/comment`,

    // 获取评论列表
    commentList: `${host}/weapp/comment`,
  }
};

module.exports = config;