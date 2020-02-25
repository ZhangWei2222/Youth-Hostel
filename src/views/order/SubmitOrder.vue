<template>
  <div class="submit-order">
    <van-nav-bar title="提交订单" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "SubmitOrder"
})
export default class SubmitOrder extends Vue {
  onClickLeft(): void {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Variable.less");
.submit-order {
}
</style>

