<template>
  <div class="search-index">
    <van-nav-bar title="青旅预定" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <van-calendar
        v-model="showDate"
        :round="false"
        type="range"
        position="right"
        color="#86cd71"
        :formatter="formatter"
        @confirm="onDateConfirm"
      />

      <!-- 搜索栏 -->
      <form action="/">
        <van-search
          class="search-box"
          v-model="value"
          show-action
          shape="round"
          background="#86cd71"
          placeholder="输入目的地、城市或店名"
          @search="onSearch"
        >
          <div slot="action" class="date-box" @click="showDate = true">
            <div>{{date.start}}</div>-
            <div>{{date.end}}</div>
          </div>
        </van-search>
      </form>

      <!-- 筛选栏 -->
      <van-dropdown-menu active-color="#86cd71">
        <van-dropdown-item v-model="sortType" :options="sortOption" />

        <van-dropdown-item title="价格" ref="priceItem">
          <van-cell-group class="price-group">
            <van-field
              class="input"
              v-model="minPrice"
              type="digit"
              placeholder="最低价"
              input-align="center"
            />
            <div class="line">——</div>
            <van-field
              class="input"
              v-model="maxPrice"
              type="digit"
              placeholder="最高价"
              input-align="center"
            />
          </van-cell-group>
          <van-button block type="info" @click="onPriceConfirm">确认</van-button>
        </van-dropdown-item>

        <van-dropdown-item class="filter" title="筛选" ref="filterItem">
          <van-cell-group class="tag-group">
            <div class="tag">
              <div class="title">房间人数</div>
              <div class="buttons">
                <van-button
                  v-for="item in roomateList"
                  :key="item.id"
                  type="default"
                  size="small"
                  @click="selectRoommate(item.id)"
                  :style="{'background':roomateChosen === item.id ? '#dcdee0':'#fff' }"
                >{{item.value}}</van-button>
              </div>
            </div>
            <div class="tag">
              <div class="title">卫生间</div>
              <div class="buttons">
                <van-button
                  v-for="item in toiletList"
                  :key="item.id"
                  type="default"
                  size="small"
                  @click="selectToilet(item.id)"
                  :style="{'background':toiletChosen === item.id ? '#dcdee0':'#fff' }"
                >{{item.value}}</van-button>
                <van-button
                  type="default"
                  size="small"
                  v-for="(item, index) in 2"
                  :key="index"
                  style="visibility: hidden;height:0;border: 0;margin: 0;"
                >1</van-button>
              </div>
            </div>
            <div class="facility">
              <div class="title">便利设施</div>
              <div class="buttons">
                <van-button
                  type="default"
                  size="small"
                  v-for="item in facilityList"
                  :key="item.id"
                  @click="selectFacility(item.id)"
                  :style="{'background':facilityChosen.indexOf(item.id) > -1 ? '#dcdee0':'#fff' }"
                >{{item.value}}</van-button>
              </div>
            </div>
          </van-cell-group>

          <van-button block type="info" @click="onFilterConfirm">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>

      <!-- 商品列表 -->
      <RoomList></RoomList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import RoomList from "@/components/RoomList.vue";

@Component({
  name: "SearchIndex",
  components: {
    RoomList
  }
})
export default class CommentIndex extends Vue {
  $refs: { quickEntry: HTMLFormElement };
  showDate: boolean = false;

  value: string = "";
  minPrice: number = null;
  maxPrice: number = null;
  sortType: number = 0;
  sortOption: any[] = [
    { text: "默认排序", value: 0 },
    { text: "好评优先", value: 1 },
    { text: "价格优先", value: 2 }
  ];
  roomateList: any = [
    { id: 0, value: "1~2人" },
    { id: 1, value: "3~4人" },
    { id: 2, value: "5~6人" },
    { id: 3, value: "6人以上" }
  ];
  toiletList: any = [
    { id: 0, value: "独卫" },
    { id: 1, value: "公卫" }
  ];
  facilityList: any[] = [
    { id: 0, value: "厨房" },
    { id: 1, value: "空调" },
    { id: 2, value: "洗衣机" },
    { id: 3, value: "电梯" },
    { id: 4, value: "wifi" },
    { id: 5, value: "暖气" },
    { id: 6, value: "吹风机" },
    { id: 7, value: "电视机" },
    { id: 8, value: "牙膏" },
    { id: 9, value: "烘干机" },
    { id: 10, value: "工作区域" },
    { id: 11, value: "衣架" }
  ];

  date = {
    start: `${new Date().getMonth() + 1}.${new Date().getDate()}`,
    days: 1,
    end: `${new Date().getMonth() + 1}.${new Date().getDate() + 1}`
  };

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 搜索
  onSearch(val): void {
    Toast(val);
  }

  // 价格确认
  onPriceConfirm(): void {
    this.$refs["priceItem"].toggle();
  }

  // 筛选确认
  onFilterConfirm(): void {
    this.$refs["filterItem"].toggle();
  }

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
    return `${date.getMonth() + 1}.${date.getDate()}`;
  }
  // 获取天数差
  getDiff(start: any, end: any): number {
    var days: number = end.getTime() - start.getTime();
    var times = days / (1000 * 60 * 60 * 24);
    return times;
  }
  // 选择日期
  onDateConfirm(date: any): void {
    const [start, end] = date;
    this.showDate = false;
    this.date = {
      start: this.formatDate(start),
      days: this.getDiff(start, end),
      end: this.formatDate(end)
    };
  }

  // 选择房间人数
  roomateChosen: number = null;
  selectRoommate(id): void {
    if (id === this.roomateChosen) {
      this.roomateChosen = null;
    } else {
      this.roomateChosen = id;
    }
  }
  // 选择卫生间
  toiletChosen: number = null;
  selectToilet(id): void {
    if (id === this.toiletChosen) {
      this.toiletChosen = null;
    } else {
      this.toiletChosen = id;
    }
  }

  // 选择遍历设施
  facilityChosen: number[] = [];
  selectFacility(id): void {
    if (this.facilityChosen.indexOf(id) < 0) {
      this.facilityChosen.push(id);
    } else {
      this.facilityChosen.splice(this.facilityChosen.indexOf(id), 1);
    }
    console.log(this.facilityChosen);
  }
}
</script>

<style lang="less">
.search-index {
  .filter {
    .van-hairline--top-bottom:after,
    .van-hairline-unset--top-bottom:after {
      border: none;
    }
  }
  .tag-group {
    .van-button {
      width: 80px;
    }
    .facility .van-button {
      margin-bottom: 10px;
    }
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.search-index {
  .search-box {
    .date-box {
      color: @white;
      font-size: @min-size;
      display: flex;
    }
  }

  .price-group {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .input {
      width: 100px;
      height: 25px;
      background: @gray-1;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .line {
      color: @gray-5;
    }
  }

  .tag-group {
    padding: 20px 20px 0;
    .tag,
    .facility {
      margin-bottom: 15px;
      display: flex;
      align-items: end;
      flex-direction: column;
      .title {
        font-weight: bold;
        text-align: left;
        margin: 0 5px 10px 0;
      }
      .buttons {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
}
</style>