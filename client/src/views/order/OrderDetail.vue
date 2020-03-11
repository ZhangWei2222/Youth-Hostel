<template>
  <div class="order-detail">
    <van-nav-bar title="订单详情" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <div class="room-info">
        <div class="detailBox">
          <div
            class="title"
          >{{orderInfo.houseName}}·{{orderInfo.roomName}}·{{orderInfo.sex===1?'男生':'女生'}}</div>
          <div class="type">{{orderInfo.roommateNum}}人间·{{orderInfo.toiletNum===1?'独卫':'公卫'}}</div>
          <div class="time">{{orderDate}}·{{orderInfo.days}}晚</div>
          <div
            class="status"
            :style="{'color':orderInfo.status? '#bf3c20':'#323233'}"
          >{{statusText}}</div>
        </div>
        <div class="avator">
          <img src="../../common/images/home.jpg" alt />
        </div>
      </div>

      <div class="order-info">
        <div class="title">订单信息</div>
        <van-field :value="orderInfo.id" type="digit" label="订单号码" readonly />
        <van-field :value="orderInfo.orderTime" type="number" label="订单时间" readonly />
        <van-field :value="orderInfo.userName" label="入住人" readonly />
        <van-field :value="orderInfo.phoneNum" type="tel" label="联系手机" readonly />
        <van-field :value="orderInfo.message" label="留言" readonly />
        <van-field :value="'￥'+orderInfo.price" type="number" label="房费" readonly />
      </div>

      <van-submit-bar
        button-type="warning"
        :button-text="buttonText"
        :disabled="disabledButton"
        @submit="goComment(4)"
      >
        <div class="delete">删除订单</div>
        <span slot="tip">
          如果您对订单有疑惑，可
          <span>
            <a
              :href="'tel:'+ orderInfo.loandlordPhone"
              style="color: #4f91ce;font-weight: bold;"
            >致电店长</a>
          </span>
        </span>
      </van-submit-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import { userInfoAPI } from "@/services/orderAPI.ts";
import {
  formatOrderDate,
  formatOrderTime,
  formatOrderStatus
} from "@/common/utill.ts";

@Component({
  name: "OrderDetail"
})
export default class OrderDetail extends Vue {
  orderInfo: any = {};
  statusText: string = "";
  disabledButton: boolean = false;
  orderDate: any = {};

  mounted(): void {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await userInfoAPI();
    try {
      // console.log("获取订单信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.orderInfo = res.data.data[0];
        self.formatData();
      }
    } catch (error) {
      Toast.fail("获取订单信息失败");
      console.log("获取订单信息失败" + error);
    }
  }

  get buttonText() {
    let temp: string = "";
    let self = this;
    switch (self.orderInfo.status) {
      case -3:
        temp = "申请退房";
        self.disabledButton = true;
        break;
      case -2:
        temp = "已退房";
        self.disabledButton = true;
        break;
      case -1:
        temp = "申请退房";
        break;
      case 0:
        temp = "立即评价";
        break;
      case 1:
        temp = "已评价";
        self.disabledButton = true;
        break;
      default:
        break;
    }
    return temp;
  }

  // 对数据进行格式化
  formatData(): void {
    let self = this;
    self.orderInfo.orderTime = formatOrderTime(self.orderInfo.orderTime);
    self.statusText = formatOrderStatus(self.orderInfo.status);
    self.orderDate = formatOrderDate(
      self.orderInfo.startDate,
      self.orderInfo.days
    );
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 评价订单
  goComment(id: string): void {
    this.$router.push({
      name: "OrderComment",
      query: { orderId: id }
    });
  }
}
</script>

<style lang="less">
@import url("~@/common/style/Variable.less");
.order-detail {
  .van-cell {
    padding: 10px;
    background: @incarnadine;
    .van-field__label {
      text-align: left;
      width: 65px;
      color: @gray-6;
    }
  }
  .van-submit-bar {
    background: @incarnadine;
  }
  .van-submit-bar__bar {
    justify-content: space-between;
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.order-detail {
  .wrapper {
    padding: 0 20px 80px;
  }

  .room-info {
    box-shadow: 0 0 3px @shadow-color-1;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background: @yellow;
    height: 100px;
    .detailBox {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      .title {
        font-weight: bold;
      }
      .time {
        font-size: @min-size;
      }
      .status {
        font-size: @middle-size;
        font-weight: bold;
        margin-top: 10px;
      }
    }
    .avator {
      width: 100px;
      height: 80px;
      img {
        width: 100px;
        height: 80px;
      }
    }
  }

  .order-info {
    background: @incarnadine;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
    .title {
      font-weight: bold;
      text-align: left;
      padding: 10px;
    }
  }
}
</style>

