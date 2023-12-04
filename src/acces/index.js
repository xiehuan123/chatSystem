import router from "@/router"
import {useStore} from "@/store"
router.beforeEach(async (to,form,next) => {
  const store=useStore()
  const loginUser=store.user
  if (to.path !== "/login" && !loginUser) {
    console.log("重定向", to.fullPath)
    return next(`/login?redirect=${to.fullPath}`)
  }



  next()

})

