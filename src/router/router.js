// 引入组件
import { userStore } from "@/store"

import BasicLayout from "@/layout/BasicLayout.vue"
import userLayout from "@/layout/UserLayout.vue"

import HomeView from "@/views/home/HomeView.vue"

import AddressBookView from "@/views/addressBook/AddressBookView.vue"

import FindView from "@/views/find/FindView.vue"

import MeView from "@/views/me/MeView.vue"
import UserInfoView from "@/views/me/UserInfoView.vue"

import IndexView from "@/views/user/IndexView.vue"
import LoginView from "@/views/user/LoginView.vue"
import RegisterView from "@/views/user/RegisterView.vue"
import phoneLoginView from "@/views/user/PhoneLoginView.vue"



import SweepAwayView from "@/views/SweepAwayView.vue"

import SesstionView from "@/views/SessionView.vue"
import VideoCallView from "@/views/VideoCallView.vue"
import VideoAcceptView from "@/views/VideoAcceptView.vue"
import applicationView from "@/views/applicationView.vue"

import SearchResuletView from "@/views/search/SearchResuletView.vue"
import SearchView from "@/views/search/SearchView.vue"

import AddFriendView from "@/views/friend/AddFriendView.vue"
import NewFriendView from "@/views/friend/NewFriendView.vue"
import PeopleInfoView from "@/views/friend/PeopleInfoView.vue"



import  MomentIndexView from "@/views/moment/MomentIndexView.vue"
import PhotoGraphView from "@/views/moment/PhotoGraphView.vue"
import MomentPublishView from "@/views/moment/MomentPublish.vue"
import MomentUserView from "@/views/moment/MomentUserView.vue"
import MometDetailViewVue from "@/views/moment/MometDetailView.vue"

import GroupIndexView from "@/views/group/GroupIndexView.vue"
import groupCreateView from "@/views/group/groupCreateView.vue"
const routes = [
  {
    path: "/", component: BasicLayout,
    redirect: "/weixin",
    children: [
      {
        path: "/weixin",
        name: "微信",
        component: HomeView,
        meta: {
          icon: "icon-message"
        }
      },

      {
        path: "/addressbook",
        name: "通讯录",
        component: AddressBookView,
        meta: {
          icon: "icon-dress"
        }
      },
      {
        path: "/find",
        name: "发现",
        component: FindView,
        meta: {
          icon: "icon-find"
        }
      },
      {
        path: "/me",
        name: "我",
        component: MeView,
        meta: {
          icon: "icon-me"
        }
      },
      
    ],

  }, 
  {
    path: "/user", component: userLayout,
    children: [
      {
        path: "sesstion/:us/:sesstionId",
        name:"会话",
        component: SesstionView,
        beforeRouteLeave(to, from, next) {
          // 在离开 SessionView 路由时执行的逻辑
          // 可以在这里添加你的离开路由逻辑
          const store=userStore()
          store.setSesstionreadStaus()
          next() // 确保调用 next() 来允许离开路由
        },
      },
      //加斜杠 没有父类前缀 一般不加 带前缀
      {
        path: "userinfo",
        name:"个人信息",
        component: UserInfoView,
      },
     
    ]
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/index",
    component: IndexView,
  },
  {
    path: "/phonelogin",
    component: phoneLoginView,
  },
  {
    path: "/addfriend",
    component: AddFriendView,
  },
  {
    path: "/addfriend/search",
    component: SearchView,
  },
  // 添加新朋友页面
  {
    path:"/newFriend",
    component:NewFriendView,
  },
  // 搜索结果页面
  {
    path: "/searchresulet/:kwd",
    name:"搜索结果",
    component: SearchResuletView,
  },
  // 个人信息页面  1 代表添加个人信息页面 2 代表通过验证页面
  {
    path: "/peopleinfo/:flag/:kwd",
    component: PeopleInfoView,
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
  //朋友圈
  {
    path:"/momentIndex",
    component:MomentIndexView
  },
  // 朋友圈拍照
  {
    path:"/photoGraph",
    component:PhotoGraphView
  },
  // 朋友圈发布页面
  {
    path:"/mometnPublish",
    component:MomentPublishView
  },
  // 朋友圈个人页面
  {
    path:"/momentUser/:uid",
    component:MomentUserView
  }
  // 朋友圈详情页面
  ,
  {
    path:"/momentDetail/:mid",
    component:MometDetailViewVue
  },
  // test
  // {
  //   path:"/test",
  //   component:()=>import("@/components/userLayout/mp.vue")
  // },
  // 群聊
  {
    path:"/groupIndex",
    component:GroupIndexView
  }
  ,{
    path:"/groupCreate",
    component:groupCreateView
  },
  // 个人所有群聊页面
  {
    path:"/groupList",
    component:()=>import("@/views/group/GroupListView.vue")
  },
  // 群聊详情页面
  {
    path:"/groupDetail/:gid",
    component:()=>import("@/views/group/GroupDetailView.vue")
  },
  
 
]
export default routes