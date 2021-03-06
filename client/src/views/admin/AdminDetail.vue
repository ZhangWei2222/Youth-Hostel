<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 17:52:26
 * @LastEditTime: 2020-05-29 01:17:35
 -->

<template>
  <div class="admin-detail">
    <van-nav-bar title="订单详情" :border="false" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="home-o" @click="goHome()" />
      </template>
    </van-nav-bar>

    <div class="wrapper">
      <div class="room-info">
        <div class="detailBox">
          <div class="title">{{orderInfo.name}}</div>
          <div class="type">{{orderInfo.roommateNum}}人间·{{orderInfo.toiletNum===1?'独卫':'公卫'}}</div>
          <div class="time">{{orderDate}}·{{orderInfo.days}}晚</div>
          <div
            class="status"
            :style="{'color':orderInfo.status===-1 || orderInfo.status===-6 ? '#bf3c20':orderInfo.status===-3 || orderInfo.status===-5 || orderInfo.status===-4 || orderInfo.status===-2 ? '#969799':'#323233'}"
          >{{statusText}}</div>
        </div>
        <van-image
          class="img"
          width="100"
          height="80"
          radius="3"
          fit="cover"
          :src="`http://101.133.132.172/public/houseUploads/house${orderInfo.houseId}/room${orderInfo.roomId}/avator1.jpg`"
        />
      </div>

      <div class="order-info">
        <div class="title">订单信息</div>
        <van-field :value="orderInfo.value" label="订单号码" readonly />
        <van-field :value="orderInfo.orderTime" type="number" label="订单时间" readonly />
        <van-field :value="orderInfo.orderName" label="入住人" readonly />
        <van-field :value="orderInfo.phoneNum" type="tel" label="联系手机" readonly />
        <van-field :value="orderInfo.message" label="留言" readonly />
        <van-field :value="'￥'+orderInfo.allPrice" type="number" label="房费" readonly />
      </div>

      <van-divider style="padding: 10px 0;" />
      <Notice
        class="notice-box"
        :type="2"
        :isLandlord="true"
        :status="orderInfo.status"
        :isCheckIn="orderInfo.isCheckIn"
      ></Notice>

      <van-submit-bar
        button-type="warning"
        :button-text="buttonText"
        :disabled="disabledButton"
        @submit="chooseHandle(buttonText)"
      >
        <div
          class="refuse"
          @click="orderInfo.status==-1? showRefuseDialogEvent() : ''"
        >{{orderInfo.status==-1 && !orderInfo.isCheckIn? '取消入住' : ''}}</div>
        <span slot="tip">
          如果您对订单有疑惑，可
          <span>
            <a :href="'tel:'+ orderInfo.phoneNum" style="color: #4f91ce;font-weight: bold;">致电房客</a>
          </span>
        </span>
      </van-submit-bar>

      <van-dialog
        v-model="showRefuseDialog"
        title="请输入取消入住理由"
        show-cancel-button
        @confirm="refuseOrder"
      >
        <van-field
          v-model="refuseReason"
          rows="3"
          autosize
          type="textarea"
          maxlength="80"
          placeholder="点击确认后，取消入住理由将自动通知房客（模拟短信接口）"
          show-word-limit
          clearable
        />
      </van-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast, Dialog } from "vant";
import {
  adminDetailAPI,
  refuseOrderAPI,
  checkInOrderAPI,
  landlordcheckOutOrderAPI
} from "@/services/adminAPI.ts";
import {
  formatOrderDate,
  formatOrderTime,
  formatAdminStatusText
} from "@/common/ts/utill.ts";
import Notice from "@/components/Notice.vue";

@Component({
  name: "AdminDetail",
  components: {
    Notice
  }
})
export default class AdminDetail extends Vue {
  orderInfo: any = {};
  statusText: string = "";
  disabledButton: boolean = false;
  orderDate: any = {};
  showRefuseDialog: boolean = false;
  refuseReason: string = "";

  mounted(): void {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await adminDetailAPI({ orderId: self.$route.query.orderId });
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
    this.disabledButton = formatAdminStatusText(
      this.orderInfo.status,
      this.orderInfo.isCommented,
      this.orderInfo.overCommented,
      this.orderInfo.isCheckIn
    ).disabledButton;
    return formatAdminStatusText(
      this.orderInfo.status,
      this.orderInfo.isCommented,
      this.orderInfo.overCommented,
      this.orderInfo.isCheckIn
    ).commentText;
  }

  // 选择操作方法
  chooseHandle(buttonText: String): void {
    switch (buttonText) {
      case "确认入住":
        this.checkDate();
        break;
      case "立即评价":
        this.goComment();
        break;
      case "确认退房":
        this.goCheckOut();
        break;
      default:
        break;
    }
  }

  // 对数据进行格式化
  formatData(): void {
    let self = this;
    self.orderInfo.orderTime = formatOrderTime(self.orderInfo.orderTime);
    self.statusText = formatAdminStatusText(
      self.orderInfo.status,
      self.orderInfo.isCommented,
      self.orderInfo.overCommented,
      self.orderInfo.isCheckIn
    ).text;
    self.orderDate = formatOrderDate(
      self.orderInfo.startDate,
      self.orderInfo.days
    );
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  showRefuseDialogEvent(): void {
    this.showRefuseDialog = true;
  }

  async refuseOrder(): Promise<any> {
    let self = this;
    if (self.refuseReason) {
      const res = await refuseOrderAPI({
        orderId: self.$route.query.orderId,
        refuseReason: self.refuseReason
      });
      try {
        // console.log("取消订单成功" + JSON.stringify(res.data));
        if (res.data.code === 0) {
          Toast.success("取消订单成功");
          window.location.reload();
        }
      } catch (error) {
        Toast.fail("取消订单失败");
        console.log("取消订单失败" + error);
      }
    } else {
      Toast.fail("请输入取消订单理由~");
    }
  }

  // 评价订单
  goComment(): void {
    this.$router.push({
      name: "UserComment",
      query: {
        orderId: this.$route.query.orderId,
        userId: this.orderInfo.userId,
        landlordId: this.orderInfo.landlordId
      }
    });
  }

  // 确认入住
  checkDate(): void {
    let self = this;

    Dialog.confirm({
      message: "是否确认入住"
    })
      .then(async () => {
        const res = await checkInOrderAPI({
          orderId: self.$route.query.orderId
        });
        try {
          // console.log("确认订单成功" + JSON.stringify(res.data));
          if (res.data.code === 0) {
            Toast.success("确认订单成功");
            window.location.reload();
          }
        } catch (error) {
          Toast.fail("确认订单失败");
          console.log("确认订单失败" + error);
        }
      })
      .catch(() => {
        console.log("已取消");
      });
  }

  // 确认退房
  goCheckOut(): void {
    let self = this;
    Dialog.confirm({
      message: "是否确认退房"
    })
      .then(async () => {
        const res = await landlordcheckOutOrderAPI({
          orderId: self.$route.query.orderId
        });
        try {
          // console.log("退房成功" + JSON.stringify(res.data));
          if (res.data.code === 0) {
            Toast.success("退房成功");
            window.location.reload();
          }
        } catch (error) {
          Toast.fail("退房失败");
          console.log("退房失败" + error);
        }
      })
      .catch(() => {
        console.log("已取消");
      });
  }

  goHome(): void {
    this.$router.push({
      name: "HomePage"
    });
  }
}
</script>

<style lang="less">
@import url("~@/common/style/Variable.less");
.admin-detail {
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
.admin-detail {
  .wrapper {
    padding: 0 20px 100px;
  }

  .room-info {
    box-shadow: 0 0 3px @shadow-color-1;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background: @yellow;
    .detailBox {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      margin-right: 5px;
      .title {
        font-weight: bold;
        text-align: left;
      }
      .time {
        font-size: @min-size;
      }
      .status {
        font-size: @middle-size;
        font-weight: bold;
        margin-top: 5px;
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

