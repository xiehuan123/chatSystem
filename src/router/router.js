// 引入组件

import BasicLayout from '../layout/BasicLayout.vue'
import HomeView from '../views/HomeView.vue'
import AddressBookView from '../views/AddressBookView.vue'
import FindView from '../views/FindView.vue'
import MeView from '../views/MeView.vue'
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import phoneLoginView from '../views/PhoneLoginView.vue'
const routes = [
  {
    path: '/', component: BasicLayout,
    redirect: '/weixin',
    children: [
      {
        path: '/weixin',
        name: '微信',
        component: HomeView,
        meta: {
          icon: 'iconfont icon-xiaoxi'
        }
      },
      {
        path: '/addressbook',
        name: '通讯录',
        component: AddressBookView,
        meta: {
          icon: 'iconfont icon-tongxunlu'
        }
      },
      {
        path: '/find',
        name: '发现',
        component: FindView,
        meta: {
          icon: 'iconfont icon-faxian1'
        }
      },
      {
        path: '/me',
        name: '我',
        component: MeView,
        meta: {
          icon: 'iconfont icon-my'
        }
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
]
export default routes;