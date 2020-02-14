<template>
  <div class="order-index">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />

    <van-tabs class="tabs" v-model="active">
      <van-tab>
        <div slot="title">全部订单</div>
        <div class="text">你还没有预定过房间，点击 [开始探索] 开启一段旅程吧</div>
        <van-button type="primary" block>开始探索</van-button>
      </van-tab>
      <van-tab>
        <div slot="title">有效订单</div>
        <div class="text">当前没有有效订单，去首页探索下一段奇妙旅程吧</div>
      </van-tab>
      <van-tab>
        <div slot="title">无效订单</div>
        <div class="text">暂无无效订单</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "HomePage"
})
export default class HelloWorld extends Vue {}
</script>

<style scoped lang="scss">
.order-index {
  .tabs {
    padding: 20px;
    .text {
      font-size: 28px;
      text-align: left;
      margin: 20px 0;
    }
  }
}
</style>
