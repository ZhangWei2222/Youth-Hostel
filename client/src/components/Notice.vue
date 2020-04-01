<!--
 * @Description: type:0 roomDetail页面，type:1 submitOrder页面，type:2 orderDetail页面
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-04-01 11:10:46
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
      <div class="tip">店家有权根据个人信息和个人评价，对订单进行拒绝。</div>
    </div>
  </div>
  <div class="notice-box" v-else>
    <div class="info">
      <div class="smallName" :style="{width:'2.5rem'}" v-if="status !== -1 && status !== 1">提示:</div>
      <div class="tip">{{tipText}}</div>
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
  isLandlord: boolean;

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
        temp = "退房成功。";
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
    font-weight: bold;
    width: 80px;
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