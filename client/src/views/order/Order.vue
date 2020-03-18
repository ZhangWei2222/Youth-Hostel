<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-18 13:01:02
 -->
<template>
  <div class="order-index">
    <van-nav-bar title="我的订单" :border="false" />
    <div class="wrapper">
      <van-tabs class="tabs" v-model="active" color="#86cd71" sticky>
        <van-tab class="tab">
          <div slot="title">全部订单</div>
          <div class="zero-order" v-if="allList.length === 0">
            <div class="text">你还没有预定过房间，点击 [开始探索] 开启一段旅程吧</div>
            <van-button plain type="primary" block @click="goExplore(0)">开始探索</van-button>
          </div>
          <OrderList v-else :orderList="allList"></OrderList>
        </van-tab>

        <van-tab class="tab">
          <div slot="title">有效订单</div>
          <div class="text" v-if="effectiveList.length === 0">当前没有有效订单，去首页探索下一段奇妙旅程吧</div>
          <OrderList v-else :orderList="effectiveList"></OrderList>
        </van-tab>

        <van-tab class="tab">
          <div slot="title">无效订单</div>
          <div class="text" v-if="invalidList.length === 0">暂无无效订单</div>
          <OrderList v-else :orderList="invalidList"></OrderList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import OrderList from "@/components/OrderList.vue";
import { Toast } from "vant";
import { orderListAPI } from "@/services/orderAPI.ts";

@Component({
  name: "OrderIndex",
  components: {
    OrderList
  }
})
export default class OrderIndex extends Vue {
  active: number = 0;
  allList: any = [];
  effectiveList: any = [];
  invalidList: any = [];

  mounted(): void {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await orderListAPI();
    try {
      // console.log("获取列表成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.allList = res.data.data.allList;
        self.effectiveList = res.data.data.effectiveList;
        self.invalidList = res.data.data.invalidList;
      } else if (res.data.code === 104) {
        Toast.fail(res.data.msg);
      }
    } catch (error) {
      Toast.fail("获取列表失败");
      console.log("获取列表失败" + error);
    }
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
@import url("~@/common/style/Variable.less");
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
}
</style>

