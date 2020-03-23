<!--
 * @Description: 订单列表
 * @Author: Vivian
 * @Date: 2020-03-16 10:19:58
 * @LastEditTime: 2020-03-23 20:27:07
 -->

<template>
  <div class="order-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="order" v-for="item in list" :key="item.id" @click="goView(item.id)">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
        <div class="details">
          <div class="title">{{item.name}}</div>
          <div
            class="info"
          >{{getOrderDate(item.startDate,item.days)}}·{{item.days}}晚·{{item.allPrice}}元</div>
          <div
            :style="{'color':item.status===-3? '#bf3c20':'#323233'}"
          >{{getStatusText(item.status)}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatOrderStatusText, formatOrderDate } from "@/common/ts/utill.ts";

@Component({
  name: "OrderList"
})
export default class OrderList extends Vue {
  list: any = [];
  loading: boolean = false;
  finished: boolean = false;

  @Prop()
  orderList;

  getStatusText(status: number): String {
    return formatOrderStatusText(status).text;
  }

  getOrderDate(startDate: any, days: number): any {
    return formatOrderDate(startDate, days);
  }

  goView(id: number): void {
    this.$router.push({
      name: "OrderDetail",
      query: { orderId: id.toString() }
    });
  }

  onLoad(): void {
    let self = this;
    setTimeout(() => {
      for (let i = self.orderList.length - 1; i >= 0; i--) {
        self.list.push(self.orderList[i]);
      }
      self.loading = false;
      if (self.list.length >= self.orderList.length) {
        self.finished = true;
      }
    }, 500);
  }
}
</script>

<style lang="less">
.order-list {
  .van-list__finished-text {
    font-size: 12px;
    line-height: 40px;
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.order-list {
  .order {
    height: 60px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 5px @shadow-color;
    display: flex;
    align-items: center;
    background: @incarnadine;
    margin: 20px 0;
    img {
      width: 60px;
      height: 60px;
      border-radius: 3px;
    }
    .details {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      margin-left: 20px;
      .title {
        font-size: @middle-size;
        font-weight: bold;
      }
    }
  }
}
</style>