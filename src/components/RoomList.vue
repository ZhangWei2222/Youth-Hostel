<template>
  <div class="room-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="room" v-for="item in roomList" :key="item.id" @click="goDetails(item.id)">
        <van-swipe class="my-swipe" :loop="false" indicator-color="white">
          <van-swipe-item>
            <img src="@/common/images/home.jpg" alt />
          </van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <div class="details">
          <div>{{item.roomType}}</div>
          <div style="font-weight: bold;">{{item.roomName}}</div>
          <div class="comment">
            <van-rate
              v-model="item.rate"
              :size="12"
              :gutter="1"
              readonly
              color="#fcd45a"
              void-color="#fcd45a"
              style="margin-right: 3px;"
            />
            {{item.commentNum}}条评价
          </div>
        </div>
        <van-divider
          class="divider"
          :style="{ borderColor: '#c8c9cc', width: '100%', margin: '0' }"
        />
        <div class="price">
          <span>￥{{item.price}}</span>每晚
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "RoomList"
})
export default class RoomList extends Vue {
  roomList: any = [
    {
      id: 0,
      roomType: "4人间",
      roomName: "派快乐旅社",
      rate: 2,
      commentNum: 8,
      price: "68"
    }
  ];
  loading: boolean = false;
  finished: boolean = false;

  onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 1; i++) {
        this.roomList.push({
          id: 1,
          roomType: "4人间",
          roomName: "派快乐旅社",
          rate: 2,
          commentNum: 8,
          price: "68"
        });
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.roomList.length >= 2) {
        this.finished = true;
      }
    }, 1000);
  }

  // 去详情页
  goDetails(id): void {
    this.$router.push({
      name: "RoomDetails",
      query: { id: id }
    });
  }
}
</script>

<style lang="less">
.room-list {
  .my-swipe .van-swipe-item img {
    width: 100%;
    height: 130%;
  }
}
</style>
<style scoped lang="less">
@import url("../common/style/Variable.less");
.room-list {
  margin-bottom: 60px;
  .room {
    height: 260px;
    border-radius: 5px;
    box-shadow: 0 0 5px @shadow-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    .my-swipe {
      width: 100%;
      height: 160px;
    }
    .details {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;
      margin: 10px 0 5px 20px;
      .comment {
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
      }
    }
    .price {
      width: 100%;
      height: 40px;
      font-size: @min-size;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 20px;
      span {
        font-size: 14px;
        font-weight: bold;
        margin-right: 2px;
      }
    }
  }
}
</style>