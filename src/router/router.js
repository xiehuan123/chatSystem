// 引入组件

import BasicLayout from '../layout/BasicLayout.vue'
import HomeView from '../views/HomeView.vue'
import AddressBookView from '../views/AddressBookView.vue'
import FindView from '../views/FindView.vue'
import MeView from '../views/MeView.vue'
import userLayout from '../layout/userLayout.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
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
          icon: '#icon-xiaoxi'
        }
      },
      {
        path: '/addressbook',
        name: '通讯录',
        component: AddressBookView,
        meta: {
          icon: '#icon-tongxunlu'
        }
      },
      {
        path: '/find',
        name: '发现',
        component: FindView,
        meta: {
          icon: '#icon-faxian1'
        }
      },
      {
        path: '/me',
        name: '我',
        component: MeView,
        meta: {
          icon: '#icon-my'
        }
      }
    ],
  
  },{
    path:'/user',component:userLayout,
    children:[]
  }
]
export default routes;