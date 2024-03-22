# chatSystem-web-一个简化版的微信的移动端项目
聊天中心项目：仿照微信移动端的UI页面，实现了微信相关的核心功能

## 功能大全
### 用户
+ 用户注册、登录(含wx号、手机号两种登录模式)
+ 用户可以通过wx号或手机号搜索好友，并发送好友请求
+ 同一个账号只能在一个浏览器登录，否则原有账号会被强制下线 会有异地登录通知 通过指纹iD做区分
+ 修改密码(未完成)
+ 忘记密码使用邮箱验证(未完成)
### 群聊
+ 加入群聊方式 面对面入群(4位口令) 邀请好友入群 扫码入群(未完成)
+ 退出群聊
+ 解散群聊
+ 踢出群聊(未完成)
+ 查看群聊信息
### 消息
+ 好友视频通话
+ 发送实时消息
+ 备份消息到本地
+ 云端消息备份(未完成)
### 朋友圈
+ 用户可以发布朋友圈 并且编辑图片
+ 用户可以点赞评论朋友圈
+ 用户可以查看个人的朋友圈，也可以在主页查看
+ 用户可以删除自己的朋友圈
## 技术栈
### 前端
+ vue3+js
+ pinia 状态管理
+ peerjs 视频通话
+ VueRouter 路由管理
+ postcss 适配设备
+ vite 打包工具
+ fingerprintjs 指纹iD
+ axios http请求
+ socekt.io ws请求
### 后端
+ python flask 全家桶
+ jwtwebtoken 认证
+ SQLAlchemy orm 数据库操作
### 数据库
+ mysql 基础数据
+ redis 缓存状态
+ mogondb 云端消息备份
### 外部服务
+ peerServe 信令服务
+ NAT 网络穿透服务
