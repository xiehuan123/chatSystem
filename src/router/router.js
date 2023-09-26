// 引入组件

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
import AddFriendView from "@/views/AddFriendView.vue"
import SearchView from "@/views/SearchView.vue"
import PeopleInfoView from "@/views/PeopleInfoView.vue"
import scanqrcode from "@/components/ScanQRCode.vue"
import UserInfoView from "@/views/UserInfoView.vue"
import SesstionView from "@/views/SessionView.vue"
import VideoCallView from "@/views/VideoCallView.vue"
import VideoAcceptView from "@/views/VideoAcceptView.vue"
import { useStore } from "@/store"

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
          icon: "icon-xiaoxi"
        }
      },

      {
        path: "/addressbook",
        name: "通讯录",
        component: AddressBookView,
        meta: {
          icon: "icon-tongxunlu"
        }
      },
      {
        path: "/find",
        name: "发现",
        component: FindView,
        meta: {
          icon: "icon-faxian1"
        }
      },
      {
        path: "/me",
        name: "我",
        component: MeView,
        meta: {
          icon: "icon-my"
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
      }
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
    path: "/peopleinfo/:uId",
    component: PeopleInfoView,
  },
  // 扫一扫
  {
    path: "/scanqrcode",
    component: scanqrcode,
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

  
 
]
export default routes