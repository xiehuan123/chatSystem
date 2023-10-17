<template>
<Dialog v-model:visible="isQrcodeVisible"/>
  <div class="addfriendview" >
    <h4 class="title">
      <Icon
        iconName="icon-arrow-left"
        :fontSize="18"
        class="arrow_left"
        @click="toBack"
      ></Icon
      ><span>添加朋友</span>
    </h4>
    <div class="search" @click="toSearch">
      <Icon iconName="icon-sousuoxiao" class="serach_ico"></Icon>账号/手机号
    </div>
    <div class="num">
      我的微信号：{{store.user.nickName}}
      <Icon iconName="icon-erweima" class="ico" :fontSize="20" @click="openQrcode"></Icon>
    </div>
    <ListItem
      v-for="item in infoList"
      :key="item.sesstionId"
      :sesstioItem="item"
      :height="58"
    >
      <template #right>
        <Icon iconName="icon-arrow-right"> </Icon>
      </template>
      <template #left>
        <div class="avatar">
          <Icon :iconName="item?.avatar" :fontSize="24"> </Icon>
        </div>
      </template>
    </ListItem>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router"
import {useStore} from "@/store"

const isQrcodeVisible=ref(false)
const router = useRouter()
const store=useStore()
const toBack = () => {
  router.go(-1)
}
const toSearch = () => {
  router.push({
    path: "/addfriend/search",
  })
}
const  openQrcode=()=>{
  console.log("打开二维码")
  isQrcodeVisible.value=true
}
const infoList = [
  {
    sesstionId: 1,
    sesstionName: "雷达加朋友",
    sesstionMsg: [
      {
        sendMsg: "添加身边的好友",
      },
    ],
    avatar: "icon-iconset0398",
  },
  {
    sesstionId: 2,
    sesstionName: "面对面建群",
    sesstionMsg: [
      {
        sendMsg: "与身边的朋友进入同一群聊",
      },
    ],
    avatar: "icon-qunliao1",
    marginBorde: true,
  },
  {
    sesstionId: 3,
    sesstionName: "扫一扫",
    sesstionMsg: [
      {
        sendMsg: "扫描微信二维码名片",
      },
    ],
    avatar: "icon-saoyisao",
    marginBorde: true,
  },
  {
    sesstionId: 4,
    sesstionName: "手机联系人",
    sesstionMsg: [
      {
        sendMsg: "添加或邀请通讯录中的朋友",
      },
    ],
    avatar: "icon-tianjiahaoyou",
    marginBorde: true,
  },
  {
    sesstionId: 5,
    sesstionName: "公众号",
    avatar: "icon-gongzhonghao",
    sesstionMsg: [
      {
        sendMsg: "获取更多的咨询和服务",
      },
    ],
    marginBorde: true,
  },
  {
    sesstionId: 6,
    sesstionName: "企业微信联系人",
    sesstionMsg: [
      {
        sendMsg: "通过手机微信号搜索企业微信用户",
      },
    ],
    avatar: "icon-qiyeweixinEnterprise-WeChat",
    marginBorde: true,
  },
]
</script>

<style lang="scss" scoped>
.addfriendview {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $content-color;
  overflow: hidden;
  .title {
    margin: 0 7px;
    text-align: center;
    margin-top: 14px;
    margin-bottom: 16px;
    position: relative;
    .arrow_left {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .search {
    height: 30px;
    margin: 0 7px;
    line-height: 30px;
    background-color: white;
    font-size: 12px;
    border-radius: 6px;
    text-align: center;
    color: #7b7b7b;
    .serach_ico {
      margin-right: 4px;
    }
  }
  .num {
    width: 100%;
    height: 24px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 60px;
    color: #7b7b7b;
    position: relative;
    .ico {
      position: absolute;
      right: 70px;
      top: 0;
    }
  }
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
}
.iconSize {
  font-size: 20px;
}
:deep(.item .content > div:nth-child(1)) {
  font-size: 17px;
}

:deep(.item .content > div:nth-child(2)) {
  font-size: 12px;
}
</style>