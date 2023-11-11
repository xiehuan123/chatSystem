<template>
  <div class="Card">
    <div class="left">
      <Avatar :size="45">

      </Avatar>
    </div>
    <div class="right">
      <div>
        <Text color="#6f718f" :size="18">{{ data.name }}</Text>
      </div>

      <div class="content">
        <Text color="#000000">{{ data.content }}</Text>
      </div>


      <div class="imgList">
        <div>
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
        </div>

      </div>
      <footer>
        <Text>{{ data.time }}</Text>

        <div class="option" >
          <div @click="onShow()">
          <div>
            
          </div></div>
          <ul :class="isShow && 'active'">
            <li>
              <Icon iconName="icon-aixin" :fontSize="18"></Icon>赞
            </li>
            |
            <li>
              <Icon iconName="icon-tubiao_pinglun" :fontSize="18"></Icon>评论
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</template>
<script setup >
import { defineProps, ref } from "vue"
defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        id: 1,
        name: "Azy周螺蛳粉(招代理)",
        time: "161616161661",
        content: `有点像冬天的感觉了，
        冷飕飕的，
        又开始了关着门做生意了0000`,
        isAppoint:false,
        imgList: [],
        comments: [],
        apppoints: []
      }


    }
  }

})
const isShow = ref(false)

const onShow = () => {
  console.log(75)
  isShow.value = !isShow.value
}
</script>
<style lang="scss" scoped>
.Card {
  position: relative;
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  padding-right: 10px;
  padding-bottom: 5px;
  overflow: hidden;
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    content: "";
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #c8c7cc;
  }

  .left {}

  .right {
    margin-left: 10px;

    .imgList {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      >div {
        width: 100px;
        height: 100px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    footer {
      display: flex;
      justify-content: space-between;
      margin: 7px 0;

      .option {
        position: relative;
         width: 55px;
        height: 45px;
      
        >div{
        position: absolute;
        width: 65px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;  
        background-color: $bg-color;
        z-index: 99;
        >div{
          position: relative;
          display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 30px;
        height: 22px;
        background-color: #e3e2eb;
           &::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #6f718f;
          
        }

        &::after {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #6f718f;
        }
        }
     
        }
        >ul {
          position: absolute;
          display: flex;
          align-items: center;
       
          top: 0;
          width: 150px;
          height: 40px;
          border-radius: 7px;
          list-style: none;
          background-color: #404040;
          color: #000000;
     
     
          transition: all .5s;
          li {
            flex: 1;
            text-align: center;
            color: #ffffff;
          }
        }

        .active {
       
          transform: translateX(-100%);
          
        }

        

      }

    }
  }
}</style>
