<template>
  <div class="order-detail">
    <van-nav-bar title="订单详情" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <div class="room-info">
        <div class="detailBox">
          <div class="title">派快乐旅社</div>
          <div class="type">4人间·独卫</div>
          <div class="time">2月26日-27日·1晚</div>
          <div class="status">已完成</div>
        </div>
        <div class="avator">
          <img src="../../common/images/home.jpg" alt />
        </div>
      </div>

      <div class="order-info">
        <div class="title">订单信息</div>
        <van-field value="17865324" type="digit" label="订单号码" readonly />
        <van-field value="2019/12/30 23:29:01" type="number" label="订单时间" readonly />
        <van-field value="张微" label="入住人" readonly />
        <van-field value="17310580023" type="tel" label="联系手机" readonly />
        <van-field value="￥100" type="number" label="房费" readonly />
      </div>

      <van-submit-bar button-type="warning" button-text="立即评价" @submit="goComment(4)">
        <div class="delete">删除订单</div>
        <span slot="tip">
          如果您对订单有疑惑，可
          <span>
            <a href="tel:10086" style="color: #4f91ce;font-weight: bold;">致电店长</a>
          </span>
        </span>
      </van-submit-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "OrderDetail"
})
export default class OrderDetail extends Vue {
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

