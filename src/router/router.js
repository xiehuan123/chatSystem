// 引入组件
import { useStore } from "@/store"

import BasicLayout from "@/layout/BasicLayout.vue"
import userLayout from "@/layout/UserLayout.vue"
import HomeView from "@/views/HomeView.vue"
import AddressBookView from "@/views/AddressBookView.vue"
import FindView from "@/views/FindView.vue"
import MeView from "@/views/MeView.vue"
import IndexView from "@/views/IndexView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import phoneLoginView from "@/views/PhoneLoginView.vue"


import PeopleInfoView from "@/views/PeopleInfoView.vue"
import SweepAwayView from "@/views/SweepAwayView.vue"
import UserInfoView from "@/views/UserInfoView.vue"
import SesstionView from "@/views/SessionView.vue"
import VideoCallView from "@/views/VideoCallView.vue"
import VideoAcceptView from "@/views/VideoAcceptView.vue"
import applicationView from "@/views/applicationView.vue"

import SearchResuletView from "@/views/search/SearchResuletView.vue"
import SearchView from "@/views/search/SearchView.vue"

import AddFriendView from "@/views/friend/AddFriendView.vue"
import NewFriendView from "@/views/friend/NewFriendView.vue"

import  MomentIndexView from "@/views/moment/MomentIndexView.vue"
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
          const store=useStore()
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
  {
    path:"/newfriend",
    component:NewFriendView,
  },
  {
    path: "/searchresulet/:kwd",
    name:"搜索结果",
    component: SearchResuletView,
  },
  {
    path: "/peopleinfo/:kwd",
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
    path:"/application/:uid",
    component:applicationView
  },
  //朋友圈
  {
    path:"/momentIndex",
    component:MomentIndexView
  }

  
 
]
export default routes