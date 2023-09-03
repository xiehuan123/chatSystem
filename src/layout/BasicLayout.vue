<template>
  <div class="basic">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import { ref, computed, onMounted,getCurrentInstance } from 'vue'
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import AppMain from '../components/AppMain.vue';
import {getInfo,zhuce} from '../api/index'
// const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const generateUUID=()=> {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}

// globalProperties.$socket=globalProperties.$openSocket(generateUUID(),2222)

onMounted( async ()=>{

  const data=await zhuce({
  nickname: "1",
  password: "1",
  phone_number: "123",
  gender: "男",
  avatar: "1",
})
  console.log(data);
  console.log(11);
  globalProperties.$socket()
 

})
</script>

<style scoped lang="scss">
$primary-color: #2196F3;
.basic{
  position: relative;
  height: 100%;
}
</style>