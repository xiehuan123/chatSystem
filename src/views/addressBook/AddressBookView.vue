<template>
  <div class="addressBook">
    <ScrollLayout  :alpha="alpha">
        <div class="functions">
          <ListItem v-for="item in meun" :key="item.sesstionId" :sesstio-item="item" @click="onGotoView(item.path)">
          </ListItem>
        </div>
        <div class="business">
          <div class="title">我的企业及企业联系人</div>
          <div class="content">
            <Icon icon-name="icon-qiyeweixinEnterprise-WeChat"></Icon><span>企业微信联系人</span>
          </div>
        </div>
        <div class="friends">
          <div class="friends">

            <div class="friend" v-for="firstPinyin in pinyinList" :key="firstPinyin" @click="onGotoPeopleInfo($event)">
              <div class="title" :id="firstPinyin">{{ firstPinyin }}</div>
              <div class="content" :data-wechat_id="item.wechat_id" :data-id="item.uid"
                v-for="item in peoples[firstPinyin]" :key="item.uid">
                <Avatar className="pointer" :src="item.avatar" :size="35"></Avatar>

                <div class="nickName">
                  <div>
                    {{ item.nickName }}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
   
    </ScrollLayout>
  </div>



  <index-bar v-model:alpha="alpha"></index-bar>
</template>

<script setup>

import { ref, } from "vue"



import { useRouter } from "vue-router"
import { useFriendRequest } from "@/hooks/useFirendRequest"
import ScrollLayout from "@/layout/ScrollLayout.vue"

const router = useRouter()
const meun = ref([
  {
    sesstionId: 1,
    sesstionName: "新的朋友",
    avatar: "icon-Dimission-S",
    path: "/friend/newFriend"
  },
  {
    sesstionId: 2,
    sesstionName: "仅聊天的朋友",
    avatar: "icon-tianjiahaoyou",
    marginBorde: true,
    path: ""
  },
  {
    sesstionId: 3,
    sesstionName: "群聊",

    avatar: "icon-qunliao1",
    marginBorde: true,
    path: "/group/groupList"

  },
  {
    sesstionId: 3,
    sesstionName: "标签",

    avatar: "icon-biaoqian",
    marginBorde: true,
    path: ""


  },
  {
    sesstionId: 3,
    sesstionName: "公众号",

    avatar: "icon-qunliao1",
    marginBorde: true,
    path: ""


  }

])
// 点击的字母
const alpha = ref("A")
const { peoples, pinyinList } = useFriendRequest()

const onGotoView = (path) => {
  router.push({
    path
  })
}
// 跳转
const onGotoPeopleInfo = (e) => {
  const { wechat_id } = e.target.dataset
  console.log(e.target)
  if (wechat_id) {
    router.push({ path: `/friend/peopleinfo/1/${wechat_id}` })
  }
}
</script>

<style scoped lang="scss">
.addressBook {
  width: 100%;
  height: 100%;

  overflow: hidden;

 

  .business {
    .title {
      font-size: 8px;
      height: 24px;
      line-height: 24px;
      color: #6e6e6e;
      padding: 0 10px;
    }

    .content {
      height: 32px;
      padding: 10px;
      display: flex;
      background-color: $white;

      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }

      span {
        width: 100%;
        line-height: 32px;
      }
    }
  }

  .functions {
    flex: 1;
    background: white;

    .function {
      display: flex;
      align-items: center;

      margin-left: 10px;
      height: 50px;

      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }

      span {
        display: inline-block;
        width: 100%;
        line-height: 32px;

      }
    }

    .function:last-child {
      border-bottom: 0;
    }
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
      padding-left: 10px;

      .nickName {
        pointer-events: none;
        position: relative;
        margin-left: 16px;
        height: 100%;
        width: 100%;
        line-height: 50px;

        // border-bottom: 1px #ccc solid;
        &::before {
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
      &:last-child>.nickName::before {
        content: none;

      }

    }

    .content:last-child {
      border-bottom: 0;
    }
  }

}</style>