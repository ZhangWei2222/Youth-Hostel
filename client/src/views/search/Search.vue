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
        ref="calendar"
      />

      <!-- 搜索栏 -->
      <form action="/">
        <van-search
          class="search-box"
          v-model="searchValue"
          show-action
          shape="round"
          background="#86cd71"
          placeholder="输入城市、店名或性别"
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
        <van-dropdown-item v-model="sortType" :options="sortOption" @change="sortChange(sortType)" />

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
              <div class="title">性别</div>
              <div class="buttons">
                <van-button
                  v-for="item in sexList"
                  :key="item.id"
                  type="default"
                  size="small"
                  @click="selectSex(item.key)"
                  :style="{'background':sexChosen === item.key ? '#dcdee0':'#fff' }"
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
            <div class="tag">
              <div class="title">房间人数</div>
              <div class="buttons">
                <van-button
                  v-for="item in roomateList"
                  :key="item.id"
                  type="default"
                  size="small"
                  @click="selectRoommate(item.key)"
                  :style="{'background':roommateChosen === item.key ? '#dcdee0':'#fff' }"
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
                  @click="selectToilet(item.key)"
                  :style="{'background':toiletChosen === item.key ? '#dcdee0':'#fff' }"
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
                  @click="selectFacility(item.key)"
                  :style="{'background':facilityChosen.indexOf(item.key) > -1 ? '#dcdee0':'#fff' }"
                >{{item.value}}</van-button>
              </div>
            </div>
          </van-cell-group>

          <van-button block type="info" @click="onFilterConfirm">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>

      <!-- 商品列表 -->
      <RoomList ref="roomList" :roomInfo="roomList"></RoomList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { formatter, formatDate3, getDiff } from "@/common/ts/utill.ts";
import { Toast } from "vant";
import RoomList from "@/components/RoomList.vue";
import { roomListAPI, locationListAPI } from "@/services/searchAPI.ts";
import merge from "webpack-merge";

@Component({
  name: "SearchIndex",
  components: {
    RoomList
  }
})
export default class CommentIndex extends Vue {
  $refs: { quickEntry: HTMLFormElement };
  showDate: boolean = false;
  roomList: any = [];

  searchValue: any = "";
  minPrice: any = null;
  maxPrice: any = null;
  sortType: number = 0;
  sortOption: any[] = [
    { text: "默认排序", value: 0 },
    { text: "好评优先", value: 1 },
    { text: "价格优先", value: 2 }
  ];
  sexList: any = [
    { id: 0, key: "sex_0", value: "女" },
    { id: 1, key: "sex_1", value: "男" }
  ];
  roomateList: any = [
    { id: 0, key: "roommate_0", value: "1~2人" },
    { id: 1, key: "roommate_1", value: "3~4人" },
    { id: 2, key: "roommate_2", value: "5~6人" },
    { id: 3, key: "roommate_3", value: "6人以上" }
  ];
  toiletList: any = [
    { id: 0, key: "toilet_0", value: "公卫" },
    { id: 1, key: "toilet_1", value: "独卫" }
  ];
  facilityList: any[] = [
    { id: 0, key: "kitchen_4", value: "厨房" },
    { id: 1, key: "basis_2", value: "空调" },
    { id: 2, key: "basis_4", value: "洗衣机" },
    { id: 3, key: "basis_1", value: "电梯" },
    { id: 4, key: "basis_0", value: "wifi" },
    { id: 5, key: "basis_9", value: "暖气" },
    { id: 6, key: "basis_5", value: "吹风机" },
    { id: 7, key: "basis_6", value: "电视机" },
    { id: 8, key: "shower_0", value: "牙膏" },
    { id: 9, key: "shower_2", value: "拖鞋" },
    { id: 10, key: "basis_10", value: "工作区域" },
    { id: 11, key: "shower_5", value: "衣架" }
  ];
  locationList: any = [];

  date = {
    start: `${new Date().getMonth() + 1}.${new Date().getDate()}`,
    days: 1,
    end: `${new Date().getMonth() + 1}.${new Date().getDate() + 1}`
  };
  formatter: any = formatter;

  @Watch("$route")
  watchRoute(to, from) {
    window.location.reload();
  }

  async initLocationList(): Promise<any> {
    let self = this;
    const res = await locationListAPI();
    try {
      // console.log("获取房间信息成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        res.data.data.forEach(item => {
          self.locationList.push(item.class_name);
        });
      }
    } catch (error) {
      // Toast.fail("获取房间名字失败");
      console.log("获取房间信息失败" + error);
    }
  }

  formatterSearchContent(content) {
    let contents = content.split(" ");
    let sexParams = "";
    let houseParams = "";
    let locationParams = "";
    for (let i = 0; i < contents.length; i++) {
      for (let j = 0; j < this.sexList.length; j++) {
        if (contents[i].match(this.sexList[j].value)) {
          sexParams =
            contents[i].match(this.sexList[j].value)[0] === "男" ? "1" : "0";
          contents[i] = "";
        }
      }
      if (contents[i]) {
        for (let j = 0; j < this.locationList.length; j++) {
          if (contents[i].match(this.locationList[j])) {
            locationParams = contents[i].match(this.locationList[j])[0];
            contents[i] = "";
          }
        }
      }
    }
    contents.forEach((item, index) => {
      if (item) {
        houseParams += item;
      }
    });
    return {
      sex: sexParams,
      houseName: houseParams,
      location: locationParams
    };
  }

  buttonLight() {
    if (this.$route.query.sortType) {
      switch (this.$route.query.sortType) {
        case "all":
          this.sortType = 0;
          break;
        case "score":
          this.sortType = 1;
          break;
        case "price":
          this.sortType = 2;
          break;
        default:
          break;
      }
    }
    if (this.$route.query.minPrice) {
      this.minPrice = this.$route.query.minPrice;
    }
    if (this.$route.query.maxPrice) {
      this.maxPrice = this.$route.query.maxPrice;
    }
    if (this.$route.query.sexFilter) {
      this.sexChosen = this.$route.query.sexFilter;
    }
    if (this.$route.query.roommateFilter) {
      this.roommateChosen = this.$route.query.roommateFilter;
    }
    if (this.$route.query.toiletFilter) {
      this.toiletChosen = this.$route.query.toiletFilter;
    }
    let routeFacilityFilter: any = this.$route.query.facilityFilter;
    if (this.$route.query.facilityFilter) {
      this.facilityChosen = routeFacilityFilter.split(" ");
    }

    let routeSearchStartDate: any = this.$route.query.searchStartDate;
    // 日期初始化
    let searchStartDate: any = routeSearchStartDate.split(" ")[0].split("-");
    let searchStartDateObj: any = new Date(
      Number(searchStartDate[0]),
      Number(searchStartDate[1]) - 1,
      Number(searchStartDate[2]),
      14
    );
    let days: any = this.$route.query.searchDays;
    let searchEndDateObj = new Date(
      (searchStartDateObj / 1000 + 86400 * days) * 1000
    );
    this.$refs["calendar"].currentDate[0] = searchStartDateObj;
    this.$refs["calendar"].currentDate[1] = searchEndDateObj;
    this.date = {
      start: formatDate3(searchStartDateObj),
      days: getDiff(searchStartDateObj, searchEndDateObj),
      end: formatDate3(searchEndDateObj)
    };
  }

  async mounted(): Promise<any> {
    await this.initLocationList();
    this.buttonLight();
    let filter = {
      sortType: this.$route.query.sortType ? this.$route.query.sortType : "",
      price: {
        min: this.$route.query.minPrice ? this.$route.query.minPrice : -1,
        max: this.$route.query.maxPrice ? this.$route.query.maxPrice : -1
      },
      filter: {
        sex: this.sexChosen ? this.sexChosen.split("_")[1] : null,
        roommate: this.roommateChosen
          ? this.roommateChosen.split("_")[1]
          : null,
        toilet: this.toiletChosen ? this.toiletChosen.split("_")[1] : null,
        facility: this.facilityChosen ? this.facilityChosen : null
      }
    };
    if (this.$route.query.searchContent) {
      this.searchValue = this.$route.query.searchContent;
      this.searchStartDate = this.$route.query.searchStartDate;
      this.searchDays = this.$route.query.searchDays;
      this.getRoomList(
        "search",
        {
          searchStartDate: this.$route.query.searchStartDate,
          searchDays: this.$route.query.searchDays
        },
        filter,
        this.formatterSearchContent(this.searchValue)
      );
    } else {
      this.getRoomList(
        "all",
        {
          searchStartDate: this.$route.query.searchStartDate,
          searchDays: this.$route.query.searchDays
        },
        filter,
        {}
      );
    }
  }

  // 获取房间列表
  async getRoomList(
    type: string | string[],
    dateFilter: any,
    filter?: any,
    searchFilter?: any
  ): Promise<any> {
    // console.log(type);
    // console.log(dateFilter);
    // console.log(searchFilter);
    // console.log(filter);
    let self = this;
    self.roomList = [];

    const res = await roomListAPI({
      type: type,
      searchFilter: searchFilter,
      filter: filter,
      dateFilter: dateFilter
    });

    try {
      // console.log("获取房间列表成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.roomList = res.data.data;
        this.$refs["roomList"].onLoad();
      }
    } catch (error) {
      Toast.fail("获取房间列表失败");
      console.log("获取房间列表失败" + error);
    }
  }

  sortChange(sortType: number): void {
    let type;
    switch (sortType) {
      case 0:
        type = "all";
        break;
      case 1:
        type = "score";
        break;
      case 2:
        type = "price";
        break;
      default:
        break;
    }
    this.$router.push({
      query: merge(this.$route.query, { sortType: type })
    });
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 搜索
  onSearch(val): void {
    let dateObj: any = new Date();
    let cacheTime: string =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getDate() +
      " " +
      "14:00:00";

    if (this.searchValue.length === 0) {
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
          searchContent: this.searchValue,
          searchStartDate: this.searchStartDate
            ? this.searchStartDate
            : cacheTime,
          searchDays: this.searchDays ? this.searchDays : 1
        }
      });
    }
  }

  // 价格确认
  onPriceConfirm(): void {
    this.$router.push({
      query: merge(this.$route.query, {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      })
    });
    this.$refs["priceItem"].toggle();
  }

  // 筛选确认
  onFilterConfirm(): void {
    this.$refs["filterItem"].toggle();
    // let filter = {
    //   sex: this.sexChosen ? this.sexChosen.split("_")[1] : null,
    //   roommate: this.roommateChosen ? this.roommateChosen.split("_")[1] : null,
    //   toilet: this.toiletChosen ? this.toiletChosen.split("_")[1] : null,
    //   facility: this.facilityChosen ? this.facilityChosen : null
    // };
    this.$router.push({
      query: merge(this.$route.query, {
        sexFilter: this.sexChosen,
        roommateFilter: this.roommateChosen,
        toiletFilter: this.toiletChosen,
        facilityFilter: this.facilityChosen.join(" ")
      })
    });
  }

  searchStartDate: any = "";
  searchDays: any = "";
  // 选择日期
  onDateConfirm(date: any): void {
    const [start, end] = date;
    this.showDate = false;
    this.date = {
      start: formatDate3(start),
      days: getDiff(start, end),
      end: formatDate3(end)
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
    this.$router.push({
      query: merge(this.$route.query, {
        searchStartDate: this.searchStartDate,
        searchDays: this.searchDays
      })
    });
  }

  // 选择性别
  sexChosen: any = null;
  selectSex(key): void {
    if (key === this.sexChosen) {
      this.sexChosen = null;
    } else {
      this.sexChosen = key;
    }
  }

  // 选择房间人数
  roommateChosen: any = null;
  selectRoommate(key): void {
    if (key === this.roommateChosen) {
      this.roommateChosen = null;
    } else {
      this.roommateChosen = key;
    }
  }

  // 选择卫生间
  toiletChosen: any = null;
  selectToilet(key): void {
    if (key === this.toiletChosen) {
      this.toiletChosen = null;
    } else {
      this.toiletChosen = key;
    }
  }

  // 选择遍历设施
  facilityChosen: any = [];
  selectFacility(key): void {
    if (this.facilityChosen.indexOf(key) < 0) {
      this.facilityChosen.push(key);
    } else {
      this.facilityChosen.splice(this.facilityChosen.indexOf(key), 1);
    }
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