<template>
  <main class="main" ref="mainDom">

    <ul class="Dialog" ref="Dialog">
      <li :class="item.className" v-for="(item, index) in msgs" :key="item.mid">
        <div v-if="item.className != 'system'">
          <div>
            <div class="title" v-if="item.us == messageType.GROUP">{{ item.sendName }}</div>
            <div class="msg">
              <div v-if="item.code == messageType.TEXT">
                <span class="text">{{ item.sendMsg }}</span>
              </div>
              <div v-else-if="item.code == messageType.AUDIO" @touchstart="onPlay(index)">
                <msgAudio :wav="item.sendMsg?.wav" :duration="item.sendMsg?.duration" :play="item.sendMsg?.play">
                </msgAudio>

              </div>
              <div v-else-if="item.code == messageType.LOCATION" class="invite">
                <RouterLink :to="`/group/groupInvite/${item.inviteUrl}`">
                <Text>邀请你加入了群聊</Text>
                <div class="content">
                  <Text> "{{ item.sendName }}"邀请你加入了群聊"{{ item.groupName }}"</Text>
                  <div>
                    <div class="avatarBox">
                      <img v-for="image in item.groupAvatar" :key="image" :src="image" />

                      <div v-for="empty in 9 - item.groupAvatar.length" :key="empty">
                      </div>
                    </div>

                  </div>

                </div>
                </RouterLink>
              </div>

            </div>
          </div>
          <Avatar :src="item.avatar" :size="35" @click="onGotoView(item.wechat_id)" />

        </div>
        <div v-else>
          {{ item.sendMsg }}
        </div>

      </li>


    </ul>
  </main>
  <Footer @sendInfo="onSendInfo">
  </Footer>
</template>
<script >
// ps 下拉加载有问题
import { defineComponent } from "vue"
import { userStore } from "@/store"
const store = userStore()
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    store.setSesstionreadStaus()
    next()
  },
  beforeRouteLeave(to, from, next) {

    store.setSesstionreadStaus()
    next()
  },
})
</script>

<script setup>
import { messageType } from "@/constant"
import BScroll from "better-scroll"
const mainDom = ref(null)
const msgs = ref([])
const scroll = ref(null)
const index = ref(1)
const pageSize = ref(10)
const router = useRouter()
// 是否在下拉
const isPulldown = ref(false)
//发送信息
const onSendInfo = (data) => {
  isPulldown.value = false
  const info = {
    ...store.cuurentSesstion,
    sesstionMsg: {
      uid: store.user.uid,//发送方的uid
      code: data["code"], //消息类型 1文本 2 语音 3 文件
      us: store.cuurentSesstion.us, //1.私聊 2.群聊
      avatar: store.user.userAvatar,
      sendName: store.user.nickName,
      className: "my",
      readStatus: true,
      sendMsg: data["msg"],
      wechat_id: store.user.userWx
    },

    "callback": (data) => {
      console.log(data, "发送成功")
    }
  }
  console.log(info, "底部发送的数据")
  store.setInfoList(info)

  // 发过去添加到pinia里面是已读的  经过服务器中转到对方就是未读
  store.$socket?.emit("receiveClientMessage", info, (data) => {
    console.log(data, "服务端回调成功")
  },

  )

}

// 监听pinia 里面的消息 
watch(() => store.sesstionMsgs[store.cuurentSesstion.sesstionId], (newValue) => {

  console.log(newValue, "pinia 里面的消息")
  msgs.value = newValue
}, { deep: true })

// 头像跳转
const onGotoView = (wechat_id) => {

  router.push({ path: `/friend/peopleinfo/1/${wechat_id}` })
}


// 开始播放
// const onPlay = (index) => {
//   mymsg.value[index]["sendMsg"]["play"] = !mymsg.value[index]["sendMsg"]["play"]
// }

onMounted(() => {
  scroll.value = new BScroll(".main", {
    mouseWheel: true,
    probeType: 3,
    click: true,

    pullDownRefresh: {
      threshold: 5,  // 下拉刷新的阈值
      stop: 20  // 刷新停留的位置
    }
  })
  // 下拉刷新
  scroll.value.on("pullingDown", async () => {
    console.log("下拉刷新")
    isPulldown.value = true
    // 在这里执行下拉刷新的操作，比如发送请求获取最新数据等
    const sesstionMsgs = store.sesstionMsgs[store.cuurentSesstion.sesstionId]
    const start = -(pageSize.value * index.value)
    const end = sesstionMsgs.length - (index.value - 1) * pageSize.value
    console.log(start, end, "下拉刷新")
    if (-start >= sesstionMsgs.length) {
      console.log("没有更多数据了")
      return
    }
    msgs.value.unshift(...sesstionMsgs.slice(start, end))
    console.log(pageSize.value * index.value, sesstionMsgs.length - (index.value - 1) * pageSize.value)
    index.value++
    scroll.value.finishPullDown()
    setTimeout(() => {
      scroll.value.scrollTo(0, 0, 300)
      scroll.value.refresh()

    }, 100)

  })

  // 需要渲染当前会话的聊天记录
  const sesstionMsgs = store.sesstionMsgs[store.cuurentSesstion.sesstionId]
  console.log(store.sesstionMsgs)
  if (sesstionMsgs) {

    console.log(sesstionMsgs, "渲染当前会话的聊天记录")
    msgs.value = sesstionMsgs.slice(-(pageSize.value * index.value), sesstionMsgs.length - (index.value - 1) * pageSize.value)
    index.value++
  }



})

watch(() => msgs.value, () => {
  // 不在下拉的时候 滚动到最底部
  if (!isPulldown.value) {
    setTimeout(() => {
      scroll.value.refresh()
      scroll.value.scrollTo(0, scroll.value.maxScrollY, 300)
    }, 100)
  }


}, { deep: true })

</script>

<style scoped lang='scss'>
.userLayout {
  height: 100%;

  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background: #ccc;

    .back {
      width: 50px;

      text-align: center;
    }

    .title {
      width: 100%;
      text-align: center;
    }

    .option {
      text-align: center;
      width: 56px;
      height: 100%;
    }
  }

  .main {
    height: calc(100% - 90px);
    margin-bottom: 50px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      touch-action: none;

      li {

        display: flex;
        justify-content: flex-end;
        padding: 10px 10px;

        >div {
          display: flex;

        }

        .title {
          padding-inline-end: 10px;
          padding-block-end: 5px;
          text-align: end;
        }

        .msg {
          position: relative;
          max-width: 200px;
          background: $msg-box-bg ;
          word-wrap: break-word;
          word-break: normal;
          padding: 7px 10px;
          border-radius: 5px;
          margin-inline-end: 10px;

          &::before {
            content: "";
            position: absolute;

            inset-inline-end: -5px;
            top: 1px;

            width: 0;
            height: 0;
            // border-top: 13px solid transparent;
            border-inline-start: 26px solid $msg-box-bg;
            border-block-end: 13px solid transparent;
            border-block-start: 13px solid transparent;
          }

          &:has(.invite) {
            background-color: $white;

            &::before {
              border-inline-start: 26px solid $white;
            }
          }

          div {
            position: relative;
            z-index: 1;
          }

          .invite {

            .content {
              display: flex;
            }
          }

          .avatarBox {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: start;
            gap: 1px;
            // margin-right: 10px;
            padding: 2px;
            margin: 10px 10px;
            background-color: $bd-color;
            border-radius: 3px;
            width: 36px;
            height: 36px;

            >img {
              width: 10px;
              height: 10px;
            }

          }
        }

      }

      .other {
        // 翻转逻辑属性
        direction: rtl;

        // rtl 会将特殊符号翻转 添加行内元素和样式解决
        .text {
          direction: ltr;
          unicode-bidi: bidi-override;
        }
      }

      .system {

        justify-content: center;
        color: #ccc;
      }

      .title {
        font-size: 12px;
        color: #ccc;
        text-align: center;
      }

      .bg {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=) right 0 no-repeat;
        width: 24px;
        height: 24px;
        background-size: 400%;
      }

      .voicePlay {
        animation-name: voicePlay;
        animation-duration: 1s;
        animation-direction: normal;
        animation-iteration-count: infinite;
        animation-timing-function: steps(3);
      }

      @keyframes voicePlay {
        0% {
          background-position: 0;
        }

        100% {
          background-position: 100%;
        }
      }
    }
  }


}</style>