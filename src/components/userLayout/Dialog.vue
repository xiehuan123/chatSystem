<template>
  <ul class="Dialog" ref="Dialog">
    <li v-for="item in msgs" :key="item.mid">
      <div :class="item.className">
        <div>
          <div class="title">{{ item.sendName }}</div>
          <div class="msg">
            <span>{{ item.sendMsg }}</span>
          </div>
        </div>
        <div class="avatar"><img :src="item.avatar" alt="" /></div>
      </div>
    </li>

    <!-- <div class="left">
        <div class="avatar">
          <img src="https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500" alt="">
        </div>
        <div class="content">
          <div class="title">1231312</div>
          <div class="outTextBox">2132111111121321111111213211111121321111111213211111112132111111</div>
        </div>
      </div> -->

    <!-- <li>
      <div class="other">
        <div class="avatar">
          <img
            src="https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
            alt=""
          />
        </div>

        <div>
          <div class="title">小明</div>
          <div class="msg"><span>你好</span></div>
        </div>
      </div>
    </li> -->
  </ul>
</template>

<script setup>
import { ref,defineProps ,watch} from "vue"
const props=defineProps({
  msgs:{
    type:Array,
    default:() => []
  }
}
)
//监听对话框 当发送消息拖到底部
const Dialog=ref(null)
watch(props, ()=>{
  Dialog.value.scrollTop = Dialog.value.scrollHeight
})

</script>

<style scoped lang='scss'>
// .Dialog {
//   list-style: none;

//   overflow: hidden;
//   li {

//     border: solid 1px #ccc;
//     .left {
//       display: flex;

//       .avatar {
//         width: 50px;
//         height: 50px;
//         border-radius: 5px;

//         background: #000;
//         img {
//           width: 100%;
//           height: 100%;
//         }
//       }
//       .content{

//         .outTextBox{

//           max-width: 100px;
//           padding: 5px 5px;
//           background: #df6d6d;
//           word-wrap: break-word; /* 单词内换行 */
//           overflow-wrap: break-word; /* 保留单词，如果单词太长则换行 */
//           white-space: normal; /* 默认换行方式 */

//         }
//       }
//     }
//   }
// }

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
      span {
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

      background: rgb(245, 245, 245);
      word-wrap: break-word;
      word-break: normal;
      padding: 10px 10px;
      border-radius: 15px;
      position: relative;
      margin-right: 10px;
      span {
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
      border-left: 26px solid rgb(245, 245, 245);
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
}
</style>