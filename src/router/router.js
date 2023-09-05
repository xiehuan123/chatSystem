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
  {
    path: "/scanqrcode",
    component: scanqrcode,
  },
  
 
]
export default routes