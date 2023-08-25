import { ref } from 'vue'
import { defineStore } from 'pinia'
import { io } from 'socket.io-client';
export const useStore = defineStore('user', () => {
  const $socket = ref(null)
  const user=ref({
    userName:"雷文",
    userAvatar:"https://developer.qcloudimg.com/http-save/10011/f4b0bfde23f21c7dbe8a3ab97515c173.jpg",
    userSex:"男",
    useriPhone:"13087259146",
    userWx:"xiehuan666666",
    userRigon:"湖南",
    uId:7
  })
  const infoList = ref([{
    "sesstionMsg": [{ "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25" }],
    "sesstionId": 1, "us": 1, "sesstionName": "小明",
    "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
  }])
  const openSocket = (uid, token) => {
    $socket.value = io("http://127.0.0.1:5000", {
      query: {
        uid,
        token
      }
    });
  }
  return { $socket, infoList, openSocket,user }
})
