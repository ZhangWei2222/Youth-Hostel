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
                  :style="{'background':roomateChosen === item.key ? '#dcdee0':'#fff' }"
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
import { Vue, Component } from "vue-property-decorator";
import { formatter, formatDate, getDiff } from "@/common/ts/utill.ts";
import { Toast } from "vant";
import RoomList from "@/components/RoomList.vue";
import { roomListAPI } from "@/services/searchAPI.ts";

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

  value: string = "";
  minPrice: string = null;
  maxPrice: string = null;
  sortType: number = 0;
  sortOption: any[] = [
    { text: "默认排序", value: 0 },
    { text: "好评优先", value: 1 },
    { text: "价格优先", value: 2 }
  ];
  sexList: any = [
    { id: 0, key: "sex_0", value: "女生" },
    { id: 1, key: "sex_1", value: "男生" }
  ];
  roomateList: any = [
    { id: 0, key: "roommate_0", value: "1~2人" },
    { id: 1, key: "roommate_1", value: "3~4人" },
    { id: 2, key: "roommate_2", value: "5~6人" },
    { id: 3, key: "roommate_3", value: "6人以上" }
  ];
  toiletList: any = [
    { id: 0, key: "toilet_0", value: "独卫" },
    { id: 1, key: "toilet_1", value: "公卫" }
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

  date = {
    start: `${new Date().getMonth() + 1}.${new Date().getDate()}`,
    days: 1,
    end: `${new Date().getMonth() + 1}.${new Date().getDate() + 1}`
  };
  formatter: any = formatter;

  mounted() {
    let content = this.$route.query.content;
    this.getRoomList(content);
  }

  // 获取店家评论信息
  async getRoomList(type: string | string[], filter?: any): Promise<any> {
    let self = this;
    self.roomList = [];
    const res = await roomListAPI({
      type: type,
      filter: filter
    });
    try {
      // console.log("获取房间列表成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.roomList = res.data.data;
      }
    } catch (error) {
      Toast.fail("获取用户评论信息失败");
      console.log("获取用户评论信息失败" + error);
    }
  }

  sortChange(sortType: number): void {
    switch (sortType) {
      case 0:
        this.getRoomList("all");
        break;
      case 1:
        this.getRoomList("score");
        break;
      case 2:
        this.getRoomList("price", { min: -1 });
        break;
      default:
        break;
    }
    this.$refs["roomList"].onLoad();
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 搜索
  onSearch(val): void {
    Toast(val);
  }

  // 价格确认
  onPriceConfirm(): void {
    this.getRoomList("price", { min: this.minPrice, max: this.maxPrice });
    this.$refs["priceItem"].toggle();
    this.$refs["roomList"].onLoad();
  }

  // 筛选确认
  onFilterConfirm(): void {
    this.$refs["filterItem"].toggle();
    let filter = {
      sex: this.sexChosen ? this.sexChosen.split("_")[1] : null,
      roommate: this.roomateChosen ? this.roomateChosen.split("_")[1] : null,
      toilet: this.toiletChosen ? this.toiletChosen.split("_")[1] : null,
      facility: this.facilityChosen ? this.facilityChosen : null
    };
    this.getRoomList("filter", filter);
    this.$refs["roomList"].onLoad();
  }

  // 选择日期
  onDateConfirm(date: any): void {
    const [start, end] = date;
    this.showDate = false;
    this.date = {
      start: formatDate(start),
      days: getDiff(start, end),
      end: formatDate(end)
    };
  }

  // 选择性别
  sexChosen: string = null;
  selectSex(key): void {
    if (key === this.sexChosen) {
      this.sexChosen = null;
    } else {
      this.sexChosen = key;
    }
  }

  // 选择房间人数
  roomateChosen: string = null;
  selectRoommate(key): void {
    if (key === this.roomateChosen) {
      this.roomateChosen = null;
    } else {
      this.roomateChosen = key;
    }
  }

  // 选择卫生间
  toiletChosen: string = null;
  selectToilet(key): void {
    if (key === this.toiletChosen) {
      this.toiletChosen = null;
    } else {
      this.toiletChosen = key;
    }
  }

  // 选择遍历设施
  facilityChosen: string[] = [];
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