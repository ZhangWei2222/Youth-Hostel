<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="comment" v-for="item in commentList" :key="item.id">
        <div class="person">
          <div class="avator">
            <img :src="item.avator" alt />
          </div>
          <div class="box">
            <div class="name">{{item.name}}</div>
            <van-rate
              v-model="item.rate"
              :size="12"
              :gutter="1"
              readonly
              color="#fcd45a"
              void-color="#fcd45a"
              style="margin-right: 3px;"
            />
          </div>
          <div class="date">{{item.date}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <van-divider />
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "CommentList"
})
export default class CommentList extends Vue {
  value: number = 3;
  loading: boolean = false;
  finished: boolean = false;
  commentList: any = [
    {
      id: 0,
      avator: "../../static/un.jpg",
      name: "z***3",
      rate: 3,
      date: "2020年02月",
      content:
        "不错，不错。交通便利，每天打扫很干净。不错，不错。交通便利，每天打扫很干净。不错，不错。交通便利，每天打扫很干净。"
    }
  ];

  onClickLeft() {
    this.$router.go(-1);
  }

  onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        this.commentList.push({
          id: 1,
          avator: "../../static/un.jpg",
          name: "z***3",
          rate: 3,
          date: "2020年02月",
          content:
            "不错，不错。交通便利，每天打扫很干净。不错，不错。交通便利，每天打扫很干净。不错，不错。交通便利，每天打扫很干净。"
        });
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.commentList.length >= 2) {
        this.finished = true;
      }
    }, 1000);
  }
}
</script>

<style scoped lang="less">
@import url("../common/style/Variable.less");
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