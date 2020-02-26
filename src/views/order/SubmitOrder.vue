<template>
  <div class="submit-order">
    <van-nav-bar title="提交订单" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <div class="room-info">
        <div class="detailBox">
          <div class="title">派快乐旅社</div>
          <div class="type">4人间·独卫</div>
          <div class="time">2月26日-27日·1晚</div>
        </div>
        <div class="avator">
          <img src="../../common/images/home.jpg" alt />
        </div>
      </div>

      <div class="text">
        <div class="title">确认入住人信息</div>
        <van-field v-model="text" label="姓名" />
        <van-field v-model="digit" type="digit" label="身份证号" />
        <van-field v-model="tel" type="tel" label="手机号" />
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="向房东介绍一下自己和出行的目的吧"
          show-word-limit
        />
      </div>
      <van-divider style="padding: 20px 0;" />
      <Notice></Notice>

      <van-submit-bar :price="3050" button-type="warning" button-text="立即支付" @submit="onSumbit(1)"></van-submit-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Notice from "@/components/Notice.vue";

@Component({
  name: "SubmitOrder",
  components: {
    Notice
  }
})
export default class SubmitOrder extends Vue {
  message: String = "";

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 模拟支付成功
  onSumbit(id: string): void {
    this.$router.push({
      name: "OrderSuccess",
      query: { orderId: id }
    });
  }
}
</script>

<style lang="less">
@import url("../../common/style/Variable.less");
.submit-order {
  .van-cell {
    padding: 10px;
    background: @incarnadine;
    .van-field__label {
      text-align: left;
      width: 65px;
    }
  }
  .van-submit-bar {
    background: @incarnadine;
  }
  .notice-box {
    .name {
      font-size: @min-size;
      width: 65px !important;
    }
  }
}
</style>
<style scoped lang="less">
@import url("../../common/style/Variable.less");
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
      }
      .time {
        font-size: @min-size;
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

