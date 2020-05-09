<template>
  <div class="room-list" :style="{'margin-bottom':this.$route.meta.child?'20px':'60px'}">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="roomList.length>0?'没有更多了':'未找到符合筛选条件的房间'"
      @load="onLoad"
    >
      <div class="overview" v-for="item in roomList" :key="item.id" @click="goDetails(item.id)">
        <div class="room">
          <van-swipe class="my-swipe" :loop="false" indicator-color="white">
            <van-swipe-item v-for="keys in [1,2,3,4]" :key="keys">
              <img
                :src="`http://101.133.132.172/public/houseUploads/house${item.houseId}/room${item.id}/avator${keys}.jpg`"
                alt
              />
            </van-swipe-item>
          </van-swipe>
          <div class="details">
            <div>{{item.roomType}}</div>
            <div style="font-weight: bold;">{{item.roomName}}·{{item.sex===1?'男生':'女生'}}</div>
            <div class="comment">
              <van-rate
                v-model="item.score"
                :size="12"
                :gutter="1"
                readonly
                style="margin-right: 3px;"
              />
              {{item.commentsNum? item.commentsNum:0}}条评价
            </div>
          </div>
          <van-divider :style="{ width: '100%'}" />
          <div class="price">
            <span class="price-num">￥{{item.price}}</span>每晚
            <van-tag
              plain
              class="room-tag"
            >{{item.guestsNum &lt; item.roommateNum ? `已入住${item.guestsNum}人` : '已满'}}</van-tag>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "RoomList"
})
export default class RoomList extends Vue {
  @Prop()
  roomInfo;

  roomList: any = [];
  loading: boolean = false;
  finished: boolean = false;

  onLoad(): void {
    let self = this;
    setTimeout(() => {
      self.roomList = [];
      let num = self.roomInfo.length;
      for (let i = 0; i < self.roomInfo.length; i++) {
        if (self.roomInfo[i].guestsNum >= self.roomInfo[i].roommateNum) {
          num--;
        } else {
          if (!self.roomInfo[i].score) {
            self.roomInfo[i].score = 5;
          }
          self.roomList.push(self.roomInfo[i]);
        }
      }
      self.loading = false;
      if (self.roomList.length >= num) {
        self.finished = true;
      }
    }, 500);
  }

  // 去详情页
  goDetails(id): void {
    this.$router.push({
      name: "RoomDetails",
      query: {
        id: id,
        searchStartDate: this.$route.query.searchStartDate,
        searchDays: this.$route.query.searchDays
      }
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
  .van-list__finished-text {
    font-size: 12px;
    line-height: 40px;
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.room-list {
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
      .price-num {
        font-size: 14px;
        font-weight: bold;
        margin-right: 2px;
      }
      .room-tag {
        margin-left: 5px;
      }
    }
  }
}
</style>