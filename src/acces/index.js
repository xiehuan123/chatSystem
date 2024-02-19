import router from "@/router"
import {userStore} from "@/store"

router.beforeEach(async (to,form,next) => {
  const store=userStore()
  const loginUser=store.user
  console.log(loginUser)
  if (to.path !== "/login" && !loginUser) {
    console.log("重定向", to.fullPath)
    return next(`/login?redirect=${to.fullPath}`)
  }
  
  next()
 
  

})

