<template>
  <div class="room-details">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" :border="false" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "RoomDetails"
})
export default class RoomDetails extends Vue {
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
// @import url("../../common/style/Variable.less");
// .room-details {
// }
</style>