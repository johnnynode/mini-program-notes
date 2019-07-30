# 电影 小程序 demo 运行说明

## 运行须知

因服务器敏感信息，此处仅贡献关键代码和解决方案，项目运行前请做如下修改处理

- project.config.json 文件中的 appid 替换成自己的

- client/config.js 下的 host 修改成对应自己的host地址

- images&sql 下的demo.sql 文件的第16行修改成自己的 IMAGE_BASE_URL 地址

- images&sql 下的data.sql 文件的第11行修改成自己的 @IMAGE_BASE_URL 地址

- server/config.js 下 完善 appId、appSecret；添加qcloudAppId、qcloudSecretId、qcloudSecretKey 具体参考此[issue](https://github.com/tencentyun/wafer2-quickstart/issues/13) 以解决小程序无法授权等问题

- 开发者工具版本：wechat_devtools_1.02.1803210 支持腾讯云(注：非云开发) [windows版本地址 64](https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1021803210)、[windows版本地址 32](https://servicewechat.com/wxa-dev-logic/download_redirect?type=ia32&from=mpwiki&download_version=1021803210) 、[Mac版本](https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin&from=mpwiki&download_version=1021803210)

- (注：新版开发者工具已不支持腾讯云，项目基于腾讯云，所以用低版本，但低版本很多功能不再兼容了, 具体参考：[开发云替代腾讯云](https://developers.weixin.qq.com/community/develop/doc/000e22b2508a8043e857ece5d5ac00) )


### todo 
1. 分页展示
2. 组件封装