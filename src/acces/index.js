import router from "@/router"
import {userStore} from "@/store"
const url=["/login","/register","/index"]
router.beforeEach(async (to,form,next) => {
  const store=userStore()
  const loginUser=store.user
  console.log(loginUser)
  // 如果不属于上面的一种 同时没有登录状态 就 重定向
  if ( !url.includes(to.path)   && !loginUser) {
    console.log("重定向", to.fullPath)
    return next(`/login?redirect=${to.fullPath}`)
  }

  if(!to.meta.sesstion){
    store.clearCuurentSesstion()
    next()
    return
  }
  
  next()
 
  

})

