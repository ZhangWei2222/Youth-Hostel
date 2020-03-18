<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-18 12:56:25
 -->
<template>
  <div class="order-detail">
    <van-nav-bar title="订单详情" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <div class="room-info">
        <div class="detailBox">
          <div class="title">{{orderInfo.name}}</div>
          <div class="type">{{orderInfo.roommateNum}}人间·{{orderInfo.toiletNum===1?'独卫':'公卫'}}</div>
          <div class="time">{{orderDate}}·{{orderInfo.days}}晚</div>
          <div
            class="status"
            :style="{'color':orderInfo.status===-3? '#bf3c20':'#323233'}"
          >{{statusText}}</div>
        </div>
        <div class="avator">
          <img src="../../common/images/home.jpg" alt />
        </div>
      </div>

      <div class="order-info">
        <div class="title">订单信息</div>
        <van-field :value="orderInfo.value" label="订单号码" readonly />
        <van-field :value="orderInfo.orderTime" type="number" label="订单时间" readonly />
        <van-field :value="orderInfo.userName" label="入住人" readonly />
        <van-field :value="orderInfo.phoneNum" type="tel" label="联系手机" readonly />
        <van-field :value="orderInfo.message" label="留言" readonly />
        <van-field :value="'￥'+orderInfo.allPrice" type="number" label="房费" readonly />
      </div>

      <van-divider style="padding: 10px 0;" />
      <Notice :type="2" :status="orderInfo.status"></Notice>

      <van-submit-bar
        button-type="warning"
        :button-text="buttonText"
        :disabled="disabledButton"
        @submit="buttonText==='申请退房'?checkDate():goComment()"
      >
        <div
          class="delete"
          @click="orderInfo.status!==-1? deleteOrder() : ''"
        >{{orderInfo.status!==-1? '删除订单' : ''}}</div>
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
import { Toast, Dialog } from "vant";
import {
  orderDetailAPI,
  checkOutOrderAPI,
  deleteOrderAPI
} from "@/services/orderAPI.ts";
import {
  formatOrderDate,
  formatOrderTime,
  formatOrderStatusText
} from "@/common/ts/utill.ts";
import Notice from "@/components/Notice.vue";

@Component({
  name: "OrderDetail",
  components: {
    Notice
  }
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
    const res = await orderDetailAPI({ orderId: self.$route.query.orderId });
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
    this.disabledButton = formatOrderStatusText(
      this.orderInfo.status
    ).disabledButton;
    return formatOrderStatusText(this.orderInfo.status).commentText;
  }

  // 对数据进行格式化
  formatData(): void {
    let self = this;
    self.orderInfo.orderTime = formatOrderTime(self.orderInfo.orderTime);
    self.statusText = formatOrderStatusText(self.orderInfo.status).text;
    self.orderDate = formatOrderDate(
      self.orderInfo.startDate,
      self.orderInfo.days
    );
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 评价订单
  goComment(): void {
    this.$router.push({
      name: "OrderComment",
      query: { orderId: this.$route.query.orderId },
      params: { roomId: this.orderInfo.roomId }
    });
  }

  checkDate(): void {
    let self = this;
    let temp: any = new Date(self.orderInfo.startDate);
    // 预定的最后一天的时间
    let startDate: any = new Date(temp - 3600 * 14 * 1000);

    // 预定的前三天的时间
    let startThreeDate: any = new Date(temp - 5400 * 1000 - 86400 * 1000 * 3);

    let tip = "";
    let isDate = false;
    if (new Date() > startDate) {
      tip = "抱歉，根据退房政策，入住当天不可退房";
    } else if (new Date() < startDate && new Date() > startThreeDate) {
      tip = "根据退房政策，仅可退房费的80%，确认退房后退款将于一天内转至账户";
      isDate = true;
    } else {
      tip = "当前日期在全额退房允许范围内，确认退房后退款将于一天内转至账户";
      isDate = true;
    }

    Dialog.confirm({
      title: "提示",
      message: tip
    })
      .then(() => {
        if (isDate) self.goCheckOut();
      })
      .catch(() => {
        console.log("已取消");
      });
  }

  async goCheckOut(): Promise<any> {
    let self = this;
    const res = await checkOutOrderAPI({
      orderId: self.$route.query.orderId,
      roomId: self.orderInfo.roomId
    });
    try {
      // console.log("退房成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        Toast.success("退房成功");
        self.$router.go(0);
      } else if (res.data.code === 104) {
        Toast.fail(res.data.msg);
        self.$router.push("SignIn");
      }
    } catch (error) {
      Toast.fail("退房失败");
      console.log("退房失败" + error);
    }
  }

  async deleteOrder(): Promise<any> {
    let self = this;
    const res = await deleteOrderAPI({
      orderId: self.$route.query.orderId
    });
    try {
      // console.log("删除订单成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        Toast.success("删除订单成功");
        self.$router.push("/orderlist");
      } else if (res.data.code === 104) {
        Toast.fail(res.data.msg);
        self.$router.push("SignIn");
      }
    } catch (error) {
      Toast.fail("删除订单失败");
      console.log("删除订单失败" + error);
    }
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

