<template>
  <div class="groupIndex">
    <div>
      <BackHeader> 发起群聊
        <template #right>
          <div></div>
        </template>
      </BackHeader>
      <SearchShow></SearchShow>
    </div>

    <ul>
      <li @click="onSelectGroup()">
        选择一个群
      </li>
      <li @click="onCreateGroup()">
        面对面建群
      </li>
      <li>
        企业微信联系人
      </li>
    </ul>
  </div>
  <IndexBar></IndexBar>
</template>
<script setup >
const router = useRouter()
const onSelectGroup=()=>{
  console.log(router)
  router.push({name:"GroupSelectView"})
}

const onCreateGroup=()=>{
  router.push({path:"/groupCreate"})
}

</script>
<style lang="scss" scoped>
.groupIndex {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(237, 237, 237, 0.7);
  overflow: hidden;

  >div {
    padding: 10px 0;
    background-color: #e5e5e5;
  }

  ul {
    height: 100%;
    background-color: #f5f5f5;
    
    li {
      position: relative;
      padding-left: 20px;
      line-height: 50px;
      &:active{
        background-color: #e5e5e5;
      }
      &:before {
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
    }
  }
}
</style>
