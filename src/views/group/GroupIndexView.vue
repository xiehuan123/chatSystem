<template>
  <div class="groupIndex">
     <BackHeader> 发起群聊
        <template #right>
          <div></div>
        </template>
      </BackHeader>
      <ScrollLayout  :bottom="100">

      
    <div class="head">
     
      <SearchShow></SearchShow>
    </div>

    <ul>
      <li @click="onSelectGroup()">
        选择一个群
      </li>
      <li @click="onCreateGroup()">
        面对面建群
      </li>
      <li>
        企业微信联系人
      </li>
    </ul>
     <div class="friends">
      
      <div class="friend"  v-for="firstPinyin in pinyinList" :key="firstPinyin" >
    <div class="title" :id="firstPinyin">{{firstPinyin}}</div>
    <div class="content"   :data-id="item.uid"  v-for="item in peoples[firstPinyin]" :key="item.uid" >
      <div class="checkBox" >

          <input type="checkbox"   v-model="item.selected" >
      </div>
      

      <Avatar  className="pointer" :src="item.avatar" :size="35"></Avatar>
  
      <div class="nickName"><div>
        {{ item.nickName }}
      </div>
    </div>
    </div>
  </div>
    </div>
    
    </ScrollLayout>
    <footer>
      <MyButton  :disabled="selectedCount.length<=0"  @click="onFinish">完成({{ selectedCount.length }})</MyButton>
    </footer>
  </div>
  <IndexBar></IndexBar>
</template>

<script setup >
import {useFriendRequest} from "@/hooks/useFirendRequest"
import { createGroup, joinGroup,getGroupInfo} from "@/api/group"
import { userStore } from "@/store"

const router = useRouter()
const store = userStore()
const { peoples,pinyinList } = useFriendRequest()

const onSelectGroup=()=>{
  console.log(router)
  router.push({name:"GroupSelectView"})
}

const onCreateGroup=()=>{
  router.push({path:"/group/groupCreate"})
}

const selectedCount=computed(()=>{
  
  const uids=[]
  //遍历拿到所有的首字母拼音列表
  pinyinList.value.forEach(item=>{
    // 通过首字母拼音列表拿到每个拼音下的用户
    const user=peoples.value[item].filter(item=>item.selected)
    // 如果有用户就把用户的uid添加到uids中
    if(user.length>0){
      uids.push(...user.map(item=>{return {"uid":item.uid,"nickName":item.nickName}}))
    }
  }
  )

  return uids
 
})
const onFinish=()=>{
  // 1.拿到选中的用户的id
  // 2.创建群聊
  // 3.发送消息给相关用户
  console.log("选中的id",selectedCount.value)
  createGroup({group_name:selectedCount.value.map(item=>item.nickName).join("、")}
  ).then(({res})=>{
      
    if(res.code==200){
      return joinGroup(res.data.gid)
    }
    throw Error("创建群聊错误")
  }).then(({res})=>{
    if(res.code==200){
      console.log(res,"加入群聊成功")
      return getGroupInfo(res.data.gid)  
    }
    throw Error("加入群聊失败")
  }).then(({res})=>{
    store.$socket.emit("inviteGroup",{
      roomIds: selectedCount.value.map(item=>item.uid),
      sesstionName: store.user.nickName,
      us: 1,
      sesstioAvatar:store.user.userAvatar ,
      wechat_id: store.user.userWx,
      sesstionMsg: {
        uid: store.user.uid,
        code: 4,
        us: 1,
        groupId: res.data.gid,
        groupName: res.data.group_name,
        groupAvatar: res.data.image_urls,
        groupCount: res.data.group_member_count,
        sendName: store.user.nickName,
        className: "other",
        readStatus: true,
        avatar: store.user.userAvatar,
        wechat_id: store.user.userWx
      }
    })

  })
  


 

  // router.push({path:"/group/groupCreate",query:{uids:selectedCount.value}})
}
</script>
<style lang="scss" scoped>
.groupIndex {
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(237, 237, 237, 0.7);
  .head {
    padding: 10px 0;
    background-color: #e5e5e5;
  }

  ul {
    
    background-color: $bg-color;
    
    li {
      position: relative;
      padding-left: 20px;
      line-height: 50px;
      &:active{
        background-color: #e5e5e5;
      }
      &:before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;

      }
    }
  }
  footer{
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: end;
    padding-right: 20px;
    
  }

  .friend {

  background-color: $white;
  .title {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    color: #6e6e6e;
    // background-color: #ece9e7;
    background-color: $bg-color;
    padding: 0 10px;
  }
  .content {
    display: flex;
    align-items: center;
    height: 50px;
    .nickName {
      pointer-events: none;
      position: relative;
      margin-left: 16px;
      height: 100%;
      width: 100%;
      line-height: 50px;
      // border-bottom: 1px #ccc solid;
      &::before{
      position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
      }
    }
    // 分组最后面那个清楚 
    &:last-child>.nickName::before{
      content: none;
     
    }
   
  }
  .checkBox{
    padding: 0 5px;
  
 /* 取消默认的外观 */
  input[type="checkbox"] {
    -webkit-appearance: none; /* Webkit browsers */
    -moz-appearance: none; /* Mozilla Firefox */
    appearance: none; /* Standard */
  }

  /* 创建自定义的样式 */
  input[type="checkbox"] {
    width: 20px; /* 宽度 */
    height: 20px; /* 高度 */
    border: 2px solid #4CAF50; /* 边框颜色（绿色） */
    border-radius: 50%; /* 将方形边框变成圆形 */
    background-color: white; /* 背景颜色，可以是任何颜色或透明 */
    cursor: pointer; /* 鼠标指针变成手型 */
  }

  /* 当复选框选中时，改变背景颜色 */
  input[type="checkbox"]:checked {
    background-color: #4CAF50; /* 选中时的背景颜色 */
    border-color: #4CAF50; /* 选中时的边框颜色 */
  }
  }
 
  .content:last-child {
      border-bottom: 0;
    }
}
}
</style>
