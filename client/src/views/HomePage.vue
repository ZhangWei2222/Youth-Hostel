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
      @confirm="onDateConfirm"
    />
    <div class="search">
      <van-field v-model="text" clearable placeholder="输入城市、店名、性别或几人间" />
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
  sexList: any = ["男", "女"];
  locationList: any = [];
  searchStartDate: any = "";
  searchDays: any = "";

  // 选择日期
  onDateConfirm(date: any): void {
    const [start, end] = date;
    this.show = false;
    this.date = {
      start: formatDate(start),
      days: getDiff(start, end),
      end: formatDate(end)
    };
    this.searchDays = getDiff(start, end);
    this.searchStartDate =
      start.getFullYear() +
      "-" +
      (start.getMonth() + 1) +
      "-" +
      start.getDate() +
      " " +
      "14:00:00";
  }

  // 查找房间
  goSearch(): void {
    let dateObj: any = new Date();
    let cacheTime: string =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getDate() +
      " " +
      "14:00:00";

    if (this.text.length === 0) {
      this.$router.push({
        name: "Search",
        query: {
          searchStartDate: this.searchStartDate
            ? this.searchStartDate
            : cacheTime,
          searchDays: this.searchDays ? this.searchDays : 1
        }
      });
    } else {
      this.$router.push({
        name: "Search",
        query: {
          searchContent: this.text,
          searchStartDate: this.searchStartDate
            ? this.searchStartDate
            : cacheTime,
          searchDays: this.searchDays ? this.searchDays : 1
        }
      });
    }
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
@import url("~@/common/style/Variable.less");

.home-page {
  height: 100%;
  background: @incarnadine;
  box-sizing: border-box;

  .img {
    width: 100%;
    height: 41vh;
    background: url("http://101.133.132.172/public/home.jpg") no-repeat;
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
