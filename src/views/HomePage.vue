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
      <van-button type="primary" block>查找房间</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

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

  show: boolean = false;

  // 自定义日期文案
  formatter(day: any): any {
    if (day.type === "start") {
      day.bottomInfo = "入住";
    } else if (day.type === "end") {
      day.bottomInfo = "离店";
    }
    return day;
  }

  // 格式化日期
  formatDate(date: any): any {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
  // 获取天数差
  getDiff(start: any, end: any): number {
    var days: number = end.getTime() - start.getTime();
    var times = days / (1000 * 60 * 60 * 24);
    return times;
  }
  // 选择日期
  onConfirm(date: any): void {
    const [start, end] = date;
    this.show = false;
    this.date = {
      start: this.formatDate(start),
      days: this.getDiff(start, end),
      end: this.formatDate(end)
    };
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
@import url("../common/style/Default.less");
.home-page {
  width: 100%;
  height: 100vh;
  background: @incarnadine;
  position: fixed;

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
