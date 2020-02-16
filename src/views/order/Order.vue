<template>
  <div class="order-index">
    <van-nav-bar title="我的订单" :border="false" />
    <div class="wrapper">
      <van-tabs class="tabs" v-model="active" color="#86cd71" sticky>
        <van-tab class="tab">
          <div slot="title">全部订单</div>

          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="order-list">
              <div class="order" v-for="item in orderList" :key="item">
                <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
                <div class="details">
                  <div class="title">{{item.name}}</div>
                  <div class="info">{{item.startDate}}-{{item.endDate}} · {{item.price}}元</div>
                  <div class="status">{{item.status}}</div>
                </div>
              </div>
            </div>
          </van-list>

          <!-- <div class="zero-order">
            <div class="text">你还没有预定过房间，点击 [开始探索] 开启一段旅程吧</div>
            <van-button plain type="primary" block @click="goExplore()">开始探索</van-button>
          </div>-->
        </van-tab>
        <van-tab class="tab">
          <div slot="title">有效订单</div>
          <div class="text">当前没有有效订单，去首页探索下一段奇妙旅程吧</div>
        </van-tab>
        <van-tab class="tab">
          <div slot="title">无效订单</div>
          <div class="text">暂无无效订单</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "OrderIndex"
})
export default class OrderIndex extends Vue {
  active: number = 0;
  orderList = [
    {
      name: "派快乐旅社",
      startDate: "2018年8月27日",
      endDate: "28日",
      price: "481.33",
      status: "已取消"
    }
  ];
  loading: boolean = false;
  finished: boolean = false;

  goExplore(): void {
    this.$router.push("/home");
  }

  onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 1; i++) {
        this.orderList.push({
          name: "派快乐旅社",
          startDate: "2018年8月27日",
          endDate: "28日",
          price: "481.33",
          status: "已取消"
        });
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.orderList.length >= 6) {
        this.finished = true;
      }
    }, 1000);
  }
}
</script>

<style lang="less">
.order-index {
  .van-hairline--top-bottom:after,
  .van-hairline-unset--top-bottom:after {
    border: none;
  }
}
</style>

<style scoped lang="less">
@import url("../../common/style/Variable.less");
.order-index {
  .wrapper {
    padding: 0 20px 60px;
  }

  .tabs {
    .text {
      text-align: left;
      margin: 20px 0;
    }
  }

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
      .status {
        color: @red;
      }
    }
  }
}
</style>

