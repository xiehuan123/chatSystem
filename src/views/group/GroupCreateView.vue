<template>
  <div class="groupCreate">

    <BackHeader> 面对面建群
      <template #right>
        <div></div>
      </template>
    </BackHeader>
    <main>
      <div v-if="show">
        <Text>和身边的朋友输入同样的四个数字，</Text>
        <Text>进入同一个群聊</Text>
      </div>

      <div class="groupCreate__input">
        <div class="box" v-for="item in [0, 1, 2, 3]" :key="item">
          <!-- <div>
            {{item}}
          </div> -->
          <div class="text" v-if="inputValue[item]!=undefined">
            {{ inputValue[item] }}
          </div>
          <div class="yuan" v-if="inputValue[item]==undefined">

          </div>
        </div>



      </div>
      <div v-if="loding" class="loding">

      </div>
      <div v-if="!show">
        <Text>这些朋友也将进入群聊</Text>
      </div>
      <div class="member"  v-if="!show">
        <div v-for="item in memberList" :key="item.user.uid">
          <Avatar :size="45" :src="item.user.avatar"></Avatar>
          <Text>{{ item.user.nickName }}</Text>
        </div>

        <div >

        </div>
      </div>
    </main>
    <div class="myButton">
      <button v-if="!show" @click="onCreateGroup()">进入该群</button>
    </div>

    <NumberKeyboard :show="show" @input="onInput" @blur="onBlur" @delete="onDelete"></NumberKeyboard>
  </div>
</template>
<script setup >
import {getGroupInfo,joinGroup,createGroup} from "@/api/group"
import { userStore } from "@/store"
import { computed } from "vue"

const inputValue = ref([])
const loding = ref(false)
const show = ref(true)
const store=userStore()
const router=useRouter()
// 群成员
const memberList=ref()
// 判断当前群有没有创建
const group=ref(null)
const groupPwd=computed(()=>{
  return inputValue.value.join("")
})
// 输入的值
const onInput = (value) => {

  if (inputValue.value.length >= 4) {
    return
  }

  inputValue.value.push(value)
  console.log(inputValue.value)
}
// 点击空白
const onBlur = (value) => {
  console.log(value)
}
// 点击删除
const onDelete = () => {
  if (inputValue.value.length <= 0) {
    return
  }
  inputValue.value.pop()
}
watch(inputValue.value, async (newVal) => {

  if (newVal.length === 4) {

    loding.value = true
    // 发起请求 判断是否创建 群聊
    const {res,err} = await getGroupInfo(inputValue.value.join(""))
    if(err){
      console.log(err)
      return
    }
    loding.value = false
    show.value=false
    if(res.code===200){
      console.log("已经创建的群聊")
      group.value=res.data
    }
    // 等于true   说明已经创建了 就发起查询群人所有人请求
    if(group.value){
     
      memberList.value=res.data.memberList
    }else{
      memberList.value=[
        {
          "user": {
            "uid": store.user.uid,
            "nickName": store.user.nickName,
            "avatar": store.user.userAvatar
          }
        }
      ]
    }
  }
}, { deep: true })
const onCreateGroup = async () => {
  if(group.value){
    // 已经创建了群聊 就需要将当前用户加入群聊
    store.setCuurentSesstion({
      sesstionId:group.value.gid,
      sesstionName:group.value.group_name,
      sesstionAvatar:group.value.group_chat_avatar,
      us:2,
      memberPerson:group.value.group_member_count
    })
    const {res,err}=await joinGroup(group.value.gid)
    if(err){
      console.log(err)
      return
    }
    if(res.code===200){
      console.log("加入群聊成功")
      group.value["memberPerson"]+=1
      store.$socket?.emit("joinGroup",group.value)
      
     
    }else{
      console.log("已经加入群聊")
    }
    router.push({path:`/user/sesstion/2/${group.value.gid}`,})
   
   
  }else{

    createGroup({
      "group_name":groupPwd.value,
      "group_pwd": groupPwd.value
    }).then(({res})=>{
      
      if(res.code==200){
        
        group.value=res.data
        return joinGroup(res.data.gid)
      }
      throw Error("创建群聊错误")
    }).then(({res})=>{
      if(res.code==200){
        store.$socket?.emit("joinGroup",group.value)
      }
      console.log(res,"加入群聊成功")
      return getGroupInfo(inputValue.value.join(""))
    }).then(({res})=>{
      group.value={
        sesstionId:res.data.gid,
        sesstionName:res.data.group_name,
        sesstionAvatar:res.data.group_chat_avatar,
        us:2,
        memberPerson:res.data.group_member_count
        
      }
      store.setCuurentSesstion(group.value)
      router.push({path:`/user/sesstion/2/${group.value.sesstionId}`,})
    }).catch((err)=>{

      console.log(err)
    })
  

     
     
   
  }
}

</script>
<style lang="scss" scoped>
.groupCreate {
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(237, 237, 237, 0.7);
  overflow: hidden;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color: #e5e5e5;

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    padding: 0 21px;

    .groupCreate__input {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 20px;

      .box {

        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {

          color: #41f85a;
          font-size: 27px;
          font-weight: lighter;
          text-shadow: 0 0 5px #41f85a;
        }

        .yuan {


          width: 15px;
          height: 15px;
          border: 1px solid #262626;
          border-radius: 50%;
          text-align: center;
          font-size: 20px;
          background-color: transparent;

        }
      }

    }
    .loding {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border-left: solid 1px #1f1f1f;
      animation: amd 1s linear infinite;
    }
    .member{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      >div{
        margin: 5px;
        &:last-child{
        width: 45px;
        height: 45px;  
        border: solid 1px #3e403e;
      }
      }
      
    }
  }

  >.myButton {
    outline: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 5px;

    button {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 22px;
      background-color: #41f85a;
      border-radius: 5px;

    }
  }

  @keyframes amd {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }

  }
}</style>
