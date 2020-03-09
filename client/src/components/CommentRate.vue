<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-09 18:40:53
 -->
<template>
  <div class="comment-rate">
    <div class="rate">
      <div class="comment-num">共{{userInfo.data.length}}条评价</div>
      <div class="score">
        <span>{{userInfo.average.totalScore}}</span>
        分 {{scoreMessage}}
      </div>
      <van-rate
        v-model="userInfo.average.totalScore"
        :size="16"
        :gutter="1"
        readonly
        style="margin-right: 3px;"
      />
    </div>
    <div class="info">
      <div>
        描述
        <span>{{userInfo.average.d_s}}分</span>
      </div>
      <div>
        沟通
        <span>{{userInfo.average.c_s}}分</span>
      </div>
      <div>
        卫生
        <span>{{userInfo.average.h_s}}分</span>
      </div>
      <div>
        素质
        <span>{{userInfo.average.q_s}}分</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "CommentRate"
})
export default class CommentRate extends Vue {
  @Prop()
  userInfo;

  get scoreMessage() {
    let score = this.userInfo.average.totalScore;
    if (score > 4.5) {
      return "超赞";
    } else if (score > 3.5) {
      return "赞";
    } else if (score > 2) {
      return "一般";
    } else {
      return "差";
    }
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
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