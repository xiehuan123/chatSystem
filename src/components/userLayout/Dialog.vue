<template>
  <ul class="Dialog" ref="Dialog">
    <li v-for="(item,index) in mymsg" :key="item.mid">
      <div :class="item.className">
        <div>
          <div class="title">{{ item.sendName }}</div>
          <div class="msg">
            <div v-if="item.code==1">{{ item.sendMsg }}</div>
        
            <div v-else-if="item.code==2" @touchstart="onPlay(index)">
             <msgAudio :wav="item.sendMsg?.wav" :duration="item.sendMsg?.duration" :play="item.sendMsg?.play"></msgAudio>
            
         </div>
            <div v-else>{{ item.sendMsg }}</div>
          </div>
        </div>
        <div class="avatar"><img :src="item.avatar" alt="" /></div>
      </div>
    </li>

    
  </ul>
</template>

<script setup>
import { ref,defineProps ,watch} from "vue"
import msgAudio from "./msgAudio.vue"
const props=defineProps({
  msgs:{
    type:Array,
    default:() => []
  }
}
)
const mymsg=ref(props.msgs)
//监听对话框 当发送消息拖到底部
const Dialog=ref(null)
watch(()=>props.msgs, (newValue)=>{
  mymsg.value=newValue
  Dialog.value.scrollTop = Dialog.value.scrollHeight
})




// 开始播放
const onPlay = (index)=>{
  mymsg.value[index]["sendMsg"]["play"]=!mymsg.value[index]["sendMsg"]["play"]
}


</script>

<style scoped lang='scss'>


ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: auto;
  li {
    height: 90px;
  }
  .other {
    clear: both;
    float: left;
    display: flex;
    padding: 10px 10px;
    flex-direction: row-reverse;
    .title {
      padding-left: 10px;
      padding-bottom: 5px;
      text-align: left;
    }
    .msg {
      max-width: 150px;
      background: rgb(245, 245, 245);
      word-wrap: break-word;
      word-break: normal;
      padding: 10px 10px;
      border-radius: 15px;
      position: relative;
      margin-left: 10px;
 
      div {
        position: relative;
        z-index: 1;
      }
    }
    .msg::before {
      content: "";
      position: absolute;
      left: -5px;
      top: 1px;
      width: 0;
      height: 0;
      border-top: 13px solid transparent;
      border-right: 26px solid rgb(245, 245, 245);
      border-bottom: 13px solid transparent;
    }
  }
  .my {
    clear: both;
    float: right;
    display: flex;
    padding: 10px 10px;

    .title {
      padding-right: 10px;
      padding-bottom: 5px;
      text-align: right;
    }
    .msg {
      max-width: 150px;

      background: $msg-box-bg;
      word-wrap: break-word;
      word-break: normal;
      padding: 10px 10px;
      border-radius: 15px;
      position: relative;
      margin-right: 10px;
      div {
        position: relative;
        z-index: 1;
      }
    }
    .msg::before {
      content: "";
      position: absolute;

      right: -5px;
      top: 1px;
      width: 0;
      height: 0;
      border-top: 13px solid transparent;
      border-left: 26px solid $msg-box-bg;
      border-bottom: 13px solid transparent;
 
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .system {
    clear: both;
    text-align: center;
    color: #ccc;
  }
  .title {
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }

  .bg {
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=) right 0 no-repeat;
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
</style>