<template>
  <div class="own-index">
    <van-nav-bar title="我的页面" :border="false" />

    <div style="padding: 0 20px 20px;">
      <div class="person">
        <van-image
          round
          width="4.5rem"
          height="4.5rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="name">混世大魔王</div>
      </div>

      <div class="icons">
        <div class="icon" @click="goViews(0)">
          <van-icon name="user-o" size="6vw" />
          <div class="text">我的信息</div>
        </div>
        <div class="icon" @click="goViews(1)">
          <van-icon name="orders-o" size="6vw" />
          <div class="text">我的订单</div>
        </div>
        <div class="icon" @click="goViews(2)">
          <van-icon name="comment-o" size="6vw" />
          <div class="text">我的评价</div>
        </div>
      </div>
      <van-button class="exit-button" type="info" block>退出登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "OwnerIndex"
})
export default class OwnerIndex extends Vue {
  goViews(key): void {
    switch (key) {
      case 0:
        this.$router.push("/info");
        break;
      case 1:
        this.$router.push("/order");
        break;
      case 2:
        this.$router.push("/comment");
        break;
      default:
        break;
    }
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Default.less");
.own-index {
  width: 100%;
  position: fixed;
  .person {
    background: @yellow;
    height: 90px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 15px;

    .name {
      margin-left: 15px;
    }
  }

  .icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 40px;
    .icon {
      display: flex;
      flex-direction: column;
      .text {
        margin-top: 10px;
      }
    }
  }

  .exit-button {
    margin-top: 50px;
  }
}
</style>
