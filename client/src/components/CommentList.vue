<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="comment" v-for="item in commentList" :key="item.id">
        <div class="person">
          <div class="avator">
            <img
              v-if="type===1"
              :src="'http://101.133.132.172/public/userUploads/'+ item.avator"
              alt
            />
            <img v-else :src="'http://101.133.132.172/public/landlordUploads/'+ item.avator" alt />
          </div>
          <div class="box">
            <div class="name">{{item.name}}</div>
            <van-rate
              v-model="item.score"
              :size="12"
              :gutter="1"
              readonly
              style="margin-right: 3px;"
            />
          </div>
          <div class="date">{{item.date}}</div>
        </div>
        <div class="content">{{item.message}}</div>
        <van-divider :style="{  margin: '16px 0' }" />
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatDate2 } from "@/common/ts/utill.ts";

@Component({
  name: "CommentList"
})
export default class CommentList extends Vue {
  @Prop()
  userInfo;

  @Prop()
  type: number;

  value: number = 3;
  loading: boolean = false;
  finished: boolean = false;
  commentList: any = [];

  onClickLeft(): void {
    this.$router.go(-1);
  }

  onLoad(): void {
    let self = this;
    setTimeout(() => {
      for (let i = self.userInfo.data.length - 1; i >= 0; i--) {
        self.userInfo.data[i].date = formatDate2(self.userInfo.data[i].date);
        self.commentList.push(self.userInfo.data[i]);
      }
      // 加载状态结束
      self.loading = false;
      // 数据全部加载完成
      if (self.commentList.length >= self.userInfo.data.length) {
        self.finished = true;
      }
    }, 300);
  }
}
</script>

<style lang="less">
.comment-list {
  .van-list__finished-text {
    font-size: 12px;
    line-height: 40px;
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.comment-list {
  padding: 10px 20px 60px;
  .comment {
    display: flex;
    flex-direction: column;
    .person {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .avator {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
      }
      .date {
        color: @gray-6;
        font-size: @min-size;
        flex: 1;
        text-align: right;
      }
    }
    .content {
      text-align: left;
    }
  }
}
</style>