<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 14:00:16
 * @LastEditTime: 2020-03-23 21:40:51
 -->
<template>
  <div id="app">
    <router-view />

    <van-tabbar route active-color="#4f91ce" v-if="!$route.meta.child">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/orderlist" icon="orders-o" :dot="isDot">订单</van-tabbar-item>
      <van-tabbar-item replace to="/owner" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { orderListAPI } from "@/services/orderAPI.ts";

@Component({})
export default class App extends Vue {
  activeTabbar: number = 0;
  isDot: boolean = false;

  mounted() {
    if (this.$route.name === "Order") {
      this.init();
    }
  }

  async init(): Promise<any> {
    let self = this;
    const res = await orderListAPI();
    try {
      // console.log("获取列表成功" + JSON.stringify(res.data.data.invalidList));
      if (res.data.code === 0) {
        if (res.data.data.invalidList.length > 0) {
          self.isDot = true;
        }
      }
    } catch (error) {
      console.log("获取列表失败" + error);
    }
  }
}
</script>

<style lang="less">
@import url("./common/style/Variable.less");
@import url("//at.alicdn.com/t/font_1639063_lgjy6mghkq.css");

*,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: @normal-size;
  color: @black-normal;
}
</style>
