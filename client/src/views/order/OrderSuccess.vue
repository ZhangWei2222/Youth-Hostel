<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-18 11:08:22
 -->
<template>
  <div class="order-success">
    <van-nav-bar title="提交成功" :border="false" />
    <div class="wrapper">
      <van-icon name="checked" color="rgb(7, 193, 96)" size="4rem" />
      <van-button class="button" type="info" @click="goView($route.query.orderId)">查看订单</van-button>
      <div class="text">
        <span style="font-weight: bold;">注意：</span>
        <br />1. 店长将在一天内处理订单，请耐心等待。我们将会在一天内以短信通知您的订单状态，您也可自行前往订单页面进行查看。
        <br />2. 如对订单有疑惑，可在订单页面，致电店长，进行咨询。
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "OrderSuccess"
})
export default class OrderSuccess extends Vue {
  goView(id: string): void {
    this.$router.push({
      name: "OrderDetail",
      query: { orderId: id }
    });
  }
}
</script>


<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.order-success {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .button {
      margin-top: 20px;
      width: 140px;
    }
    .text {
      margin-top: 20px;
      text-align: left;
      font-size: @min-size;
    }
  }
}
</style>

