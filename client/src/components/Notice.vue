<template>
  <div class="notice-box">
    <div class="info">
      <div class="name">退订政策:</div>
      <div class="tip">入住前3天可退全款，入住前一天可退房费的80%，入住当天不可退款</div>
    </div>
    <div class="info">
      <div class="name">入离时间:</div>
      <div class="tip">14:00 之后可入住，12:30之前需退房</div>
    </div>
    <div class="info">
      <div class="name">需要注意:</div>
      <div class="tip">店家有权根据个人信息和个人评价，对订单进行拒绝</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Notice"
})
export default class Notice extends Vue {}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.notice-box {
  height: 130px;
}
.info {
  display: flex;
  text-align: left;
  line-height: 18px;
  .name {
    font-weight: bold;
    width: 80px;
  }
  .tip {
    font-size: @min-size;
    width: 280px;
  }
}
</style>