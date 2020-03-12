<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 14:00:16
 * @LastEditTime: 2020-03-12 18:26:26
 -->
<template>
  <div id="app">
    <router-view />

    <van-tabbar route active-color="#4f91ce">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/orderlist" icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/owner" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  activeTabbar: number = 0;
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
