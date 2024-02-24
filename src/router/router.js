

import SweepAwayView from "@/views/SweepAwayView.vue"

import VideoCallView from "@/views/VideoCallView.vue"
import VideoAcceptView from "@/views/VideoAcceptView.vue"
import applicationView from "@/views/applicationView.vue"
// 定义路由
const routes = [
  {
    path: "/", component: ()=>import("@/layout/BasicLayout.vue"),
    redirect: "/weixin",
    children: [
      {
        path: "/weixin",
        name: "微信",
        component: ()=>import("@/views/home/HomeView.vue"),
        meta: {
          icon: "icon-message",
          name:"weixin"
        }
      },

      {
        path: "/addressbook",
        name: "通讯录",
        component: ()=>import("@/views/addressBook/AddressBookView.vue"),
        meta: {
          icon: "icon-dress",
          name:"addressBook"
        }
      },
      {
        path: "/find",
        name: "发现",
        component: ()=>import("@/views/find/FindView.vue"),
        meta: {
          icon: "icon-find",
          name:"find"
        }
      },
      {
        path: "/me",
        name: "我",
        component: ()=>import("@/views/me/MeView.vue"),
        meta: {
          icon: "icon-me",
        

        }
      },
      
    ],

  }, 
  {
    path: "/user",
    meta:{
      // 当前会话保持
      sesstion:true
    }
    ,component: ()=>import("@/layout/UserLayout.vue"),
    children: [
      {
        path: "sesstion/:us/:sesstionId",
        name:"会话",
        component: ()=>import("@/views/SessionView.vue"),
       
      },
      //加斜杠 没有父类前缀 一般不加 带前缀
      {
        path: "userinfo",
        name:"个人信息",
        component: ()=>import("@/views/me/UserInfoView.vue"),
      },
     
    ]
  },
  {
    path: "/login",
    component: ()=>import("@/views/user/LoginView.vue"),
  },
  {
    path: "/register",
    component: ()=>import("@/views/user/RegisterView.vue"),
  },
  {
    path: "/index",
    component: ()=>import("@/views/user/IndexView.vue"),
  },
  {
    path: "/phonelogin",
    component: ()=>import("@/views/user/PhoneLoginView.vue"),
  },
 
  
 
  // 扫一扫
  {
    path: "/sweepaway",
    component: SweepAwayView,
  },
  // 拨打视频/语音通话 页面
  {
    path: "/videocall/:fid",
    component: VideoCallView,
  },
  // 接收通话页面
  {
    path: "/videoaccept",
    component: VideoAcceptView,
  },
  { 
    // 添加页面 和同意页面 1代表添加 2代表同意
    path:"/application/:flag/:uid",
    component:applicationView
  },
  
 
  
  // 设置页面
  {
    path:"/setting",
    component:()=>import("@/views/setting/indexView.vue")
  },


  // 好友相关页面
  {
    path:"/friend",
    children:[
      {
        path: "peopleinfo/:flag/:kwd",
        meta:{
          // 当前会话保持
          sesstion:true
        },
        component: ()=>import("@/views/friend/PeopleInfoView.vue"),
      },
      // 添加好友页面
      {
        path: "addfriend",
        component: ()=>import("@/views/friend/AddFriendView.vue"),
      },
      // 搜索好友页面
      {
        path: "addfriend/search",
        component: ()=>import("@/views/search/SearchView.vue"),
      },
      // 新朋友页面
      {
        path:"newFriend",
        component:()=>import("@/views/friend/NewFriendView.vue"),
      },
      //好友资料页面
      {
        path:"profileSettings/:uid/:nickName",
        name:"个人资料",
        meta:{
          // 当前会话保持
          sesstion:true
        },
        component:()=>import("@/views/friend/ProfileSettingsView.vue")
      },
      //聊天信息页面
      {
        path:"chatInfo",
        name:"chatInfo",
        meta:{
          // 当前会话保持
          sesstion:true,
          title:"聊天信息"
        },
        component:()=>import("@/views/friend/ChatInfoView.vue")
      },
      
    ]
  },
  // 朋友圈相关页面
  {
    path:"/moment",
    children:[
      // 朋友圈首页
      {
        path:"momentIndex",
        component:()=>import("@/views/moment/MomentIndexView.vue")
      },
      // 朋友圈拍照
      {
        path:"photoGraph",
        component:()=>import("@/views/moment/PhotoGraphView.vue")
      },
      // 朋友圈发布页面
      {
        path:"momentPublish",
        component:()=>import("@/views/moment/MomentPublishView.vue")
      },
      // 朋友圈个人页面
      {
        path:"momentUser/:uid",
        component:()=>import("@/views/moment/MomentUserView.vue")
      }
      // 朋友圈详情页面
      ,
      {
        path:"momentDetail/:mid",
        component:()=>import("@/views/moment/MometDetailView.vue")
      },
    ]
  },
  // 群聊相关页面
  {
    path:"/group",
    children:[
      // 群聊首页
      {
        path:"groupIndex",
        component:()=>import("@/views/group/GroupIndexView.vue")
      }
      // 加入群聊页面
      ,
      {
        path:"groupJoin/:gid",
        component:()=>import("@/views/group/GroupJoinView.vue")
      }
      // 创建群聊页面
      ,{
        path:"groupCreate",
        component:()=>import("@/views/group/GroupCreateView.vue")
      },
      // 个人所有群聊页面
      {
        path:"groupList",
        component:()=>import("@/views/group/GroupListView.vue")
      },
      // 群聊详情页面
      {
        path:"groupDetail",
        name:"groupDetail",
        meta:{
          // 当前会话保持
          sesstion:true,
          title:"聊天信息"
        },
        component:()=>import("@/views/group/GroupDetailView.vue")
      },
    ]
  }
 
]
export default routes