<template>
  <div class="submit-order">
    <van-nav-bar title="提交订单" :border="false" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="home-o" @click="goHome()" />
      </template>
    </van-nav-bar>

    <div class="wrapper">
      <div class="room-info">
        <div class="detailBox">
          <div class="title">{{roomInfo.roomName}}·{{roomInfo.sex===1?'男生':'女生'}}</div>
          <div class="type">{{roomInfo.roommateNum}}人间·{{roomInfo.toiletNum===1?'独卫':'公卫'}}</div>
          <div class="time">{{orderInfo.date}}·{{orderInfo.days}}晚</div>
        </div>
        <van-image
          class="img"
          width="100"
          height="80"
          radius="3"
          :src="`http://101.133.132.172/public/houseUploads/house${roomInfo.houseId}/room${roomInfo.id}/avator1.jpg`"
        />
      </div>

      <div class="text">
        <div class="title">确认入住人信息</div>
        <van-field required v-model="orderInfo.userName" label="姓名" clearable />
        <van-field required v-model="orderInfo.idCard" type="digit" label="身份证号" clearable />
        <van-field required v-model="orderInfo.phoneNum" type="tel" label="手机号" clearable />
        <van-field
          v-model="orderInfo.message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="向房东介绍一下自己和出行的目的吧"
          show-word-limit
        />
      </div>
      <van-divider style="padding: 10px 0;" />
      <Notice :type="1"></Notice>

      <van-submit-bar
        :price="roomInfo.price*100*orderInfo.days"
        button-type="warning"
        button-text="立即支付"
        @submit="onSumbit()"
      ></van-submit-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Notice from "@/components/Notice.vue";
import { Toast, Dialog } from "vant";
import { sumbitRoomInfoAPI, submitOrderAPI } from "@/services/orderAPI.ts";
import { checkPhone, checkId, formatOrderDate } from "@/common/ts/utill.ts";

@Component({
  name: "SubmitOrder",
  components: {
    Notice
  }
})
export default class SubmitOrder extends Vue {
  message: String = "";
  roomInfo: any = {};
  orderInfo: any = {
    date: "",
    days: 0,
    userName: "",
    idCard: "",
    phoneNum: "",
    message: ""
  };

  getOrderDate(startDate: any, days: number): any {
    startDate = startDate.replace(/-/g, "/");
    return formatOrderDate(startDate, days);
  }

  mounted(): void {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await sumbitRoomInfoAPI({ roomId: this.$route.query.roomId });
    try {
      // console.log("获取订单信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.roomInfo = res.data.data[0];
        self.orderInfo.date = self.getOrderDate(
          self.$route.query.searchStartDate,
          Number(self.$route.query.searchDays)
        );
        self.orderInfo.days = self.$route.query.searchDays;
      }
    } catch (error) {
      Toast.fail("获取订单信息失败");
      console.log("获取订单信息失败" + error);
    }
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  checkParams(params: any): boolean {
    if (params.userName && params.phoneNum && params.idCard) {
      if (!checkId(params.idCard)) {
        Toast.fail("请检查身份证号");
        return false;
      } else if (!checkPhone(params.phoneNum)) {
        Toast.fail("请检查手机号");
        return false;
      }
    } else {
      Toast.fail("请检查信息是否完整");
      return false;
    }
    return true;
  }

  // 模拟支付成功
  async onSumbit(id: string): Promise<any> {
    let self = this;
    let dateObj: any = new Date();
    let cacheOrderTime: string =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getDate() +
      " " +
      dateObj.getHours() +
      ":" +
      dateObj.getMinutes() +
      ":" +
      dateObj.getSeconds();
    let params = {
      roomId: self.roomInfo.id,
      startDate: self.$route.query.searchStartDate,
      days: self.$route.query.searchDays,
      orderTime: cacheOrderTime,
      userId: 11,
      idCard: self.orderInfo.idCard,
      phoneNum: self.orderInfo.phoneNum,
      userName: self.orderInfo.userName,
      message: self.orderInfo.message
    };
    if (self.checkParams(params)) {
      Dialog.confirm({
        message: "确定支付？（模拟付款接口）"
      })
        .then(async () => {
          let res = await submitOrderAPI(params);
          try {
            // console.log("下订单成功" + JSON.stringify(res.data));
            if (res.data.code === 0) {
              Toast.success("下订单成功");
              self.$router.push({
                name: "OrderSuccess",
                query: { orderId: res.data.data.orderId }
              });
            } else if (res.data.code === 104) {
              Toast.fail(res.data.msg);
            }
          } catch (error) {
            Toast.fail("获取房间信息失败");
            console.log("获取房间信息失败" + error);
          }
        })
        .catch(() => {
          console.log("取消支付");
        });
    }
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
.submit-order {
  .van-cell {
    padding: 10px 18px;
    background: @incarnadine;
    .van-field__label {
      text-align: left;
      width: 65px;
    }
  }
  .van-submit-bar {
    background: @incarnadine;
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.submit-order {
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
    .detailBox {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      .title {
        font-weight: bold;
        text-align: left;
      }
      .time {
        font-size: @min-size;
      }
    }
  }

  .text {
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

