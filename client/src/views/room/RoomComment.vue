<template>
  <div class="room-comment">
    <van-nav-bar title="房间评价" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <CommentRate></CommentRate>
      <div class="divider"></div>
      <CommentList></CommentList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CommentList from "@/components/CommentList.vue";
import CommentRate from "@/components/CommentRate.vue";

@Component({
  name: "RoomComment",
  components: {
    CommentList,
    CommentRate
  }
})
export default class RoomComment extends Vue {
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.room-comment {
  .divider {
    width: 100%;
    height: 10px;
    background-color: @gray-2;
  }
}
</style>