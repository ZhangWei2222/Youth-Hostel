<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="comment" v-for="item in commentList" :key="item.id">
        <div class="person">
          <div class="avator">
            <img :src="'http://101.133.132.172/public/landlordUploads/'+ item.avator" alt />
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

@Component({
  name: "CommentList"
})
export default class CommentList extends Vue {
  @Prop()
  userInfo;

  value: number = 3;
  loading: boolean = false;
  finished: boolean = false;
  commentList: any = [];

  onClickLeft(): void {
    this.$router.go(-1);
  }

  onLoad(): void {
    setTimeout(() => {
      for (let i = 0; i < this.userInfo.data.length; i++) {
        this.commentList.push(this.userInfo.data[i]);
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.commentList.length >= this.userInfo.data.length) {
        this.finished = true;
      }
    }, 1000);
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.comment-list {
  padding: 10px 20px 80px;
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
          width: 40px;
          height: 40px;
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