<template>
  <div class="order-index">
    <van-nav-bar title="我的订单" :border="false" />
    <div style="padding: 0 20px 20px;">
      <van-tabs class="tabs" v-model="active" color="#86cd71" sticky>
        <van-tab class="tab">
          <div slot="title">全部订单</div>
          <div class="text">你还没有预定过房间，点击 [开始探索] 开启一段旅程吧</div>
          <van-button plain type="primary" block @click="goExplore()">开始探索</van-button>
        </van-tab>
        <van-tab class="tab">
          <div slot="title">有效订单</div>
          <div class="text">当前没有有效订单，去首页探索下一段奇妙旅程吧</div>
        </van-tab>
        <van-tab class="tab">
          <div slot="title">无效订单</div>
          <div class="text">暂无无效订单</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "OrderIndex"
})
export default class OrderIndex extends Vue {
  goExplore() {
    this.$router.push("/home");
  }
}
</script>

<style lang="less">
.order-index {
  .van-hairline--top-bottom:after,
  .van-hairline-unset--top-bottom:after {
    border: none;
  }
}
</style>

<style scoped lang="less">
@import url("../../common/style/Default.less");
.order-index {
  .tabs {
    .text {
      text-align: left;
      margin: 20px 0;
    }
  }
}
</style>

