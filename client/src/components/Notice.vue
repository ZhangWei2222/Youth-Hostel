<!--
 * @Description: type:0 roomDetail页面，type:1 submitOrder页面，type:2 orderDetail页面
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-04-30 17:03:46
 -->
<template>
  <div class="notice-box" v-if="type !== 2">
    <div class="info">
      <div :class="(type === 0 ? 'name' : 'smallName')">退订政策:</div>
      <div class="tip">入住前3天可退全款，入住前一天可退房费的80%，入住当天0点后不可退款。</div>
    </div>
    <div class="info">
      <div :class="(type === 0 ? 'name' : 'smallName')">入离时间:</div>
      <div class="tip">14:00 之后可入住，12:30之前需退房。如超过入住当天23：30入住，需提前与店家联系。</div>
    </div>
    <div class="info">
      <div :class="(type === 0 ? 'name' : 'smallName')">需要注意:</div>
      <div class="tip">店家有权根据个人信息，取消订单。</div>
    </div>
  </div>
  <div class="notice-box" v-else>
    <div class="info">
      <div
        class="smallName"
        :style="{width:'2.5rem'}"
        v-if="(status == -1 && isCheckIn == 1) && status !== 1"
      >提示:</div>
      <div class="tip" :style="{width:'100%'}" v-html="tipText"></div>
    </div>
    <div class="info" v-if="refuseReason" :style="{color:'#bf3c20'}">
      <div class="smallName" :style="{width:'6rem'}">店家取消理由:</div>
      <div class="tip">{{refuseReason}}</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "Notice"
})
export default class Notice extends Vue {
  tipText: string = "";

  @Prop()
  type: number;

  @Prop()
  status: number;

  @Prop()
  isCheckIn: number;

  @Prop()
  isLandlord: boolean;

  @Prop()
  refuseReason: String;

  @Watch("status")
  getStatus(cur, old) {
    if (cur !== "undefined") {
      if (this.isLandlord) {
        this.tipText = this.getLandLordTipText(cur);
      } else {
        this.tipText = this.getTipText(cur);
      }
    }
  }

  getTipText(status: number): string {
    let temp: string = "";
    switch (status) {
      case -6:
        temp = "已发送退房申请，店家收到后会尽快处理，请耐心等待。";
        break;
      case -5:
        temp = "订单已完成，但已超过退房日期三天，评价功能已关闭。";
        break;
      case -4:
        temp = "入住当天23：30前仍未确认，视为自动放弃订单。";
        break;
      case -3:
        temp =
          "很抱歉，店家已取消您的订单。您可以通过提升自己的评分，以提高订单通过率；或者留言更细致地描述，介绍自己的出行目的。";
        break;
      case -2:
        temp = "退房成功，如可退款，退款将在当日内返还";
        break;
      case -1:
        if (this.isCheckIn === 1) temp = "已完成入住，评价通道将在退房时开放";
        break;
      case 0:
        temp = "订单已完成，若超过退房日期三天，评价功能将关闭。";
        break;
      default:
        break;
    }
    return temp;
  }

  getLandLordTipText(status: number): string {
    let temp: string = "";
    switch (status) {
      case -6:
        temp = "确认退房后，系统将在一日内将退款返回给房客。";
        break;
      case -5:
        temp = "订单已完成，但已超过房客退房日期三天，评价功能已关闭。";
        break;
      case -4:
        temp = "房客入住当天23：30前仍未确认，视为自动放弃订单。";
        break;
      case -3:
        temp = "您已取消该订单。";
        break;
      case -2:
        temp = "您已处理退房。";
        break;
      case -1:
        if (this.isCheckIn === 0) {
          temp =
            "取消入住：如需取消入住，请在订单生效当天查看用户信息完成操作。<br>确认入住：请在房客入住时点击确认入住，方便后续状态管理。";
        } else {
          temp = "您已确认入住，评价功能将在退房日开启。";
        }
        break;
      case 0:
        temp = "订单已完成，若超过退房日期三天，评价功能将关闭。";
        break;
      default:
        break;
    }
    return temp;
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.info {
  display: flex;
  text-align: left;
  line-height: 18px;
  .name {
    font-size: @min-size;
    font-weight: bold;
    width: 65px;
  }
  .smallName {
    font-size: @min-size;
    width: 65px;
    font-weight: bold;
  }
  .tip {
    font-size: @min-size;
    width: 280px;
  }
}
</style>