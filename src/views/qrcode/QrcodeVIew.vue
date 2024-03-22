<script setup>

import BackHeader from "@/components/common/BackHeader.vue"
import { getInfo } from "@/api/index" 
import { getGroupQrcode } from "@/api/group"
// import { userStore } from "@/store"
const route=useRoute()
// const store=userStore()
const data = ref({
  userAvatar:"/uploads/wx_6bf95d44_test2/avatar.png",
  nickName:"Appoint",
  userRigon:"湖南 长沙",
  QRcode:"/uploads/wx_599193c6/QrCode.png",
  groupName:"Appoint",
  groupAvatar: ["/uploads/wx_6bf95d44_test2/avatar.png"]
})
const myUs=ref(2)
const { us, kw }=route.params
console.log(us, kw)
onMounted(async()=>{
  if (us == 1) {
    myUs.value = 1

    const { res: { data: result } } = await getInfo(kw)
    console.log(result)
    data.value ={
      userAvatar: result.avatar,
      nickName: result.nickName,
      userRigon: result.region,
      QRcode: result.qrcode
    }
  }
  else if (us == 2) {
    myUs.value = 2
    const { res: { data: result } } = await getGroupQrcode(kw)
    console.log(result)
    data.value={
      QRcode: result.qrcode,
      image_urls: result.image_urls,
      groupName: result.group.group_name,
      endDate: result.expiration_date
    }
  }
})

</script>
<template>
  <div class="qrcode">
    <BackHeader></BackHeader>
    <main>
      <div class="person" v-if="myUs==1">
        <div class="info">
          <Avatar :src="data.userAvatar" v-if="data.userAvatar" />
          <div class="ml-10">
            <Text color="#262626" :size="14">{{ data.nickName }}</Text>
            <Text :size="12">{{ data.userRigon }}</Text>
          </div>

        </div>
        <div class="imageWraper">
          <img :src="data.QRcode" alt="">
        </div>
        <Text :size="12">扫一扫上面的二维码图案，添加我为好友</Text>
        <div class="footer">
          <Text class="ml-3 mr-3" color="#262626">扫一扫</Text>|
          <Text class="ml-3 mr-3" color="#262626">换个样式</Text>|
          <Text class="ml-3 mr-3" color="#262626">保存图片</Text>
        </div>
      </div>
      <div class="group" v-if="myUs==2">
        <GroupAvatar :image_urls="data.image_urls"></GroupAvatar>
        <Text class="mt-10 mb-10" color="#262626">群聊: {{ data.groupName }}</Text>
        <div class="imageWraper">
          <img :src="data.QRcode" alt="" class="groupAvatar">
        </div>
        <Text :size="12">该二维码七天内({{ data.endDate }}有效),重新进入将更新</Text>
        <div class="footer">

          <Text class="ml-3 mr-3" color="#262626">保存图片</Text>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>

.qrcode{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: relative;
  main{
    padding: 60px;
    .person{
 
      display: flex;
      flex-direction: column;
      align-items: center;
      .info{
        display: flex;
        width: 100%;
      }
      .imageWraper{
        margin: 20px 0;
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .footer{
        position: absolute;
        display: flex;
        bottom: 40px;
      }
    }
    .group {
      display: flex;
        flex-direction: column;
        align-items: center;
      .imageWraper {
        width: 100%;
        height: 100%;
        margin: 20px 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .footer {
        position: absolute;
        display: flex;
        bottom: 40px;
      }
    }
  }
}
</style>
