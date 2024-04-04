<template>
  <BackHeader > 打地鼠小游戏</BackHeader>
  <div class="game">

    <div class="scoped">
      <div class="set">
        <p>设置参数</p>
        <p>
          速度： <input type="number" v-model="setSpeed">
        </p>
        <p>
          总数：<input type="number" v-model="setNum" >
        </p>
        <p>
          <button @click="playGame">开始</button>
        </p>
      </div>
      <div class="count set">
        <h3>统计分数面板</h3>
        <h3>总数： {{ TOTAL }}</h3>
        <h3>击中： {{ clickNum }}</h3>
        <h3>击中率： {{ level }}%</h3>
      </div>
    </div>
    <div class="wraper">
      <div class="item" v-for="n in TOTAL" :key="n">
        <div :style="{ 'visibility': random === n ? 'visible' : 'hidden' }" @click="clickItem">{{ n }}</div>
      </div>
    </div>

  </div>
</template>
<script  setup >
import BackHeader from "@/components/common/BackHeader.vue"

const clickFlag = ref(true) // 单个地鼠只能点击一次
const setNum = ref(20) // 绑定设置地洞数量
const setSpeed = ref(1000) // 绑定设置地鼠出现速度
const speed = ref(2000) // 地鼠出现速度
const random = ref("") // 随机出现的地鼠位置
const TOTAL = ref(20) // 地鼠总数
const count = ref(0) // 统计总共出现了多少次地鼠同于判断不能大于总数
const clickNum = ref(0) // 点中地鼠统计
let timmerId = null


const level = computed(() => {
  let num = ((clickNum.value / TOTAL.value) * 100).toFixed(2) || 0
  return num
})

const playGame = () => {
  random.value = ""
  speed.value = parseInt(setSpeed.value)
  TOTAL.value = parseInt(setNum.value)
  clearInterval(timmerId)
  timmerId = setInterval(() => {
    random.value = Math.floor(Math.random() * TOTAL.value + 1)
    clickFlag.value = true // 开放点击
    count.value++
    if (count.value >= TOTAL.value) {
      clearInterval(timmerId)
      alert("游戏结束")
      clickNum.value = 0
      count.value = 0
      TOTAL.value=20
    }
  }, speed.value)
}

const clickItem = () => {
  if (clickFlag.value) {
    (count.value < TOTAL.value) && clickNum.value++
    clickFlag.value = false
  }
}

watchEffect(() => {
  if (count.value >= TOTAL.value) {
    clearInterval(timmerId)
    alert("游戏结束")
    clickNum.value = 0
    count.value = 0
    TOTAL.value = 20

  }
})

  


</script>
<style lang="scss" scoped>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.game {
  max-width: 400px;
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.scoped {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

}
.set,
.count {
  flex: 1;
  margin: 0 10px;
}

p {
  margin: 10px 0;
}

input[type="number"] {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #0056b3;
}

.wraper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.item {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  border: solid 1px #ccc;
}

.item div {
  width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-size: 14px;
}

</style>
