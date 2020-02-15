<template>
  <div class="info-index">
    <van-nav-bar title="编辑个人信息" left-arrow @click-left="onClickLeft" :border="false" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "InfoIndex"
})
export default class InfoIndex extends Vue {
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Default.less");
.info-index {
}
</style>
