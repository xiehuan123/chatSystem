<template>
  <div :class="[
    'item',
    item?.marginTop && 'marginTop',
    item?.marginBorde && 'marginBorde'
  ]"     :style="{ height: px2rem(item?.height??45), background: item?.bg }" >
    <slot name="left">
      <div class="Textleft">
        <div v-if="item&&item.name">
          {{ item.name }}
        </div>

        <div v-if="item && item.content" :style="{ color: item.contentColor }">
          {{ item.content }}
        </div>

      </div>

    </slot>

     <div class="imgList" v-if="item.moment">

            <div    v-for=" img in imgList" :key="img"   :style="{backgroundImage:`url(${img})` }" >

            </div>
          </div>
    <div class="time" v-if="item && (!item.right)">
      <img v-if="item && item.avatar" :src="item.avatar" alt="" width="50" height="50">
      <span v-if="item && item.nickName">{{ item.nickName }} </span>
      <span v-if="item && item.userWx">{{ item.userWx }} </span>
      <Icon v-if="item && item.icon" :icon-name="item.icon"></Icon>
      <span v-if="item && item.text">{{ item.text }} </span>
      <Swtich  v-if="item.select"  ></Swtich>
      <Icon   v-else icon-name="icon-arrow-right"></Icon>
    </div>
  </div>
</template>

<script setup>
import { px2rem } from "@/utils"
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    default: 50,
  },
  border: {
    type: Boolean,
    default: false,
  },

})
// 朋友圈的展示 已完成 部署到服务器上就会显示图片
const imgList = computed(() => {
  return props.item.moment.img_list?.split(",") ?? []
})
</script>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: #fff;
  color: #262626;
  &:has(>:only-child){
    justify-content: center;
    text-align: center;
  }
&:active{
        background-color: rgba(237, 237, 237,.2);
      }
  .Textleft {
    display: flex;
    font-size: 14px;
    align-items: center;
    padding: 5px 10px;
    pointer-events: none;
    >div:nth-child(1) {
      min-width: 60px;
    }

    >div:nth-child(2) {
      color: #ccc;
      margin-left: 10px;

    }


  }

  .imgList {
    display: flex;
    width: 100%;
 
    align-items: center;
    >div {
      width: 45px;
      height: 45px;
      margin: 0 5px;
      background-size: cover;
    }
  }

  .time {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: right;
    margin-right: 7px;
    font-size: 12px;

    // background: #282222;
    img {
      border-radius: 5px;
    }
  }

}

.marginTop {
  margin-top: 7px;
}


.marginBorde {
  // border-top: #ccc 1px solid;
  position: relative;

  &::before {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
  }
}</style>