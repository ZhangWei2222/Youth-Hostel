<template>
  <div class="comment-rate">
    <div class="rate">
      <div class="comment-num">共63条评价</div>
      <div class="score">
        <span>4.8</span>分 超赞
      </div>
      <van-rate v-model="value" :size="16" :gutter="1" readonly style="margin-right: 3px;" />
    </div>
    <div class="info">
      <div>
        描述
        <span>4.7分</span>
      </div>
      <div>
        沟通
        <span>4.7分</span>
      </div>
      <div>
        卫生
        <span>4.7分</span>
      </div>
      <div>
        管理
        <span>4.7分</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "CommentRate"
})
export default class CommentRate extends Vue {
  value: number = 3;

  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("../common/style/Variable.less");
.comment-rate {
  height: 75px;
  display: flex;
  padding: 10px 20px 20px;
  justify-content: space-around;
  .rate {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid @gray-3;
    .comment-num {
      color: @yellow-1;
    }
    .score {
      span {
        font-size: @large-size;
        font-weight: bold;
      }
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: @min-size;
    color: @gray-6;
  }
}
</style>