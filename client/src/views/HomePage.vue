<template>
  <div class="home-page">
    <!-- <van-nav-bar title="青旅预订" :border="false" /> -->
    <div class="img"></div>
    <van-calendar
      v-model="show"
      :round="false"
      type="range"
      position="right"
      color="#86cd71"
      :formatter="formatter"
      @confirm="onConfirm"
    />
    <div class="search">
      <van-field v-model="text" clearable placeholder="输入目的地、城市或店名" />
      <div class="date-box" @click="show = true">
        <div>{{date.start}}</div>
        <div class="line-box">{{date.days}}晚</div>
        <div>{{date.end}}</div>
      </div>
      <van-button type="primary" block @click="goSearch()">查找房间</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { formatter, formatDate, getDiff } from "@/common/ts/utill.ts";

@Component({
  name: "HomePage"
})
export default class HomePage extends Vue {
  text: string = "";
  date = {
    start: `${new Date().getMonth() + 1}月${new Date().getDate()}日`,
    days: 1,
    end: `${new Date().getMonth() + 1}月${new Date().getDate() + 1}日`
  };
  formatter: any = formatter;
  show: boolean = false;

  // 选择日期
  onConfirm(date: any): void {
    const [start, end] = date;
    this.show = false;
    this.date = {
      start: formatDate(start),
      days: getDiff(start, end),
      end: formatDate(end)
    };
  }

  // 查找房间
  goSearch(): void {
    let content = this.text.length === 0 ? "all" : this.text;
    this.$router.push({
      name: "Search",
      query: { content: content }
    });
  }
}
</script>

<style lang="less">
.home-page {
  .van-cell {
    padding: 10px 0;
    &:not(:last-child):after {
      left: 0;
    }
  }
}
</style>
<style scoped lang="less">
@import url("../common/style/Variable.less");
.home-page {
  height: 100vh;
  background: @incarnadine;

  .img {
    width: 100%;
    height: 41vh;
    background: url("../common/images/home.jpg") no-repeat;
    background-size: 100%;
    background-position: center;
  }

  .search {
    width: 80%;
    height: 200px;
    background: @white;
    margin: auto;
    margin-top: -4vh;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 5px @shadow-color;
    box-sizing: border-box;
    padding: 25px;
    .date-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: @green;
      .line-box {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        width: 100px;
        color: @gray-7;
        &:after,
        &:before {
          background: @gray-5;
          content: "";
          height: 1px;
          width: 6px;
          margin: 2px;
        }
      }
    }
  }
}
</style>
