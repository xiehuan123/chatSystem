<template>
  <div class="addressBook">
    <div class="functions">
      <div class="function">
        <i class="iconfont icon-tianjiahaoyou"></i><span>新的朋友</span>
      </div>
      <div class="function">
        <i class="iconfont icon-tianjiahaoyou"></i><span>仅聊天的朋友</span>
      </div>
      <div class="function">
        <i class="iconfont icon-qunliao1"></i><span>群聊</span>
      </div>
      <div class="function">
        <i class="iconfont icon-tianjiahaoyou"></i><span>标签</span>
      </div>
      <div class="function">
        <i class="iconfont icon-gongzhonghao"></i><span>公众号</span>
      </div>
    </div>
    <div class="business">
      <div class="title">我的企业及企业联系人</div>
      <div class="content">
        <i class="iconfont icon-gongzhonghao"></i><span>公众号</span>
      </div>
    </div>
    <div class="friends">
      <div class="friend">
        <div class="title">X</div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">小明</div>
        </div>
      </div>
      <div class="friend">
        <div class="title">Y</div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">圆神</div>
        </div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">圆神</div>
        </div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">圆神</div>
        </div>
      </div>
      <div class="friend">
        <div class="title">W</div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">乌龟</div>
        </div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">五五</div>
        </div>
        <div class="content">
          <div class="img">
            <img src="../assets/image/test.jpg" alt="" />
          </div>
          <div class="nickname">汪汪汪</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
</script>

<style scoped lang="scss">
.addressBook {
  .business {
    .title {
      font-size: 10px;
      height: 24px;
      line-height: 24px;
      background-color: #ece9e7;
    }
    .content {
      height: 32px;
      padding: 8px;
      display: flex;
      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        width: 100%;
        line-height: 32px;
      }
    }
  }
  padding: 14px;
  .functions {
    .function {
      height: 32px;
      padding: 8px;
      display: flex;
      border-bottom: 1px solid #d9dee3;
      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        width: 100%;
        line-height: 32px;
      }
    }
  }
  .friends {
    .friend {
      .title {
        height: 24px;
        line-height: 24px;
        background-color: #ece9e7;
      }
      .content {
        display: flex;
        align-items: center;
        padding: 10px 8px;
        .img {
          height: 32px;
          width: 32px;
          img {
            height: 32px;
            width: 32px;
            border-radius: 20%;
          }
        }
        .nickname {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>