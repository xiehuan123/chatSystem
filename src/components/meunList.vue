<template>
   <transition
    name="dialog-fade"

  >
  <div class="meunListBox" @click.self="onClose" v-show="isVisible">
    <div class="meunList">
      <ul>

        <router-link :to="item.path" v-for="item in meunList" :key="item.id">
          <li>
            <Icon :icon-name="item.iconName" :font-size="30"></Icon>
            <span>{{ item.name }}</span>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref ,defineProps,watch,defineEmits} from "vue"
const props=defineProps({
  visible:{
    type:Boolean,
    default:false
  }
})
const isVisible=ref(false)
const emit=defineEmits(["update:visible"])
const meunList = ref([
  {
    id: 1,
    iconName: "icon-xiaoxi_o",
    name: "发起群聊",
    path: "/group/groupIndex",
  },
  {
    id: 2,
    iconName: "icon-tianjiajiahaoyoutianjiapengyou",
    name: "添加朋友",
    path: "/friend/addfriend",
  },
  {
    id: 3,
    iconName: "icon-saoyisao1",
    name: "扫一扫",
    path: "/sweepaway",
  },
  {
    id: 4,
    iconName: "icon-shoufukuan",
    name: "收付款",
    path: "",
  },
])
const onClose=()=>{
  isVisible.value=false
  emit("update:visible",false)
}
// 监听传递的值
watch(()=>props.visible,(val)=>{
  isVisible.value=val
})
</script>

<style scoped lang='scss'>
.meunListBox {
  position: absolute;
  top: 20px;
  width: 100%;
  height: 100%;
  z-index: 99;
  .meunList {
    position: absolute;
    top: 10px;
    right: 2vw;
    width: 45vw;

    background: rgb(80, 80, 80);
    border-radius: 10px;
    color: white;
    ul {
      list-style: none;
      padding: 5px 5px;

      > :not(:last-child) {
        span {
          border-bottom: solid 1px $bd-color;
        }
      }
      
      li {
        display: flex;
        line-height: 50px;
        height: 50px;
        gap: 10px;
        span {
          flex: 1;
          height: 100%;
        }
      }
    }
  }
  .meunList::before {
    content: "";
    position: absolute;
    right: 16px;
    top: -16px;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-right: 26px solid rgb(80, 80, 80);
    border-bottom: 20px solid transparent;
    transform: rotate(96deg);
  }
}
</style>