<template>
  <div class="comment-index">
    <van-nav-bar title="我的评价" left-arrow @click-left="onClickLeft" :border="false" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "CommentIndex"
})
export default class CommentIndex extends Vue {
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Default.less");
.comment-index {
}
</style>