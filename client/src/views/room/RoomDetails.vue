<template>
  <div class="room-details">
    <van-nav-bar title="房间详情" left-arrow @click-left="onClickLeft" :border="false">
      <template #right>
        <van-icon name="home-o" @click="goView(3)" />
      </template>
    </van-nav-bar>

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <van-calendar
      ref="calendar"
      v-model="show"
      :round="false"
      type="range"
      position="right"
      color="#86cd71"
      :formatter="formatter"
      @confirm="onDateConfirm"
    />

    <div class="wrapper">
      <div class="overview">
        <div class="date">
          {{roomDate}}·{{roomDays}}晚
          <span @click="show = true">修改日期</span>
        </div>
        <van-divider :style="{  width: '100%' }" />
        <div
          class="title"
        >{{roomDetail.roomData.roomName}}·{{roomDetail.roomData.sex===1?'男生':'女生'}}</div>
        <div class="tags">
          <van-tag
            color="rgba(142, 218, 119, 0.47)"
            text-color="rgb(34, 149, 0)"
            size="medium"
          >{{roomDetail.commentsData.average.totalScore}}分·{{roomDetail.commentsData.list.length}}条评价</van-tag>
          <van-tag
            color="#ffe1e1"
            text-color="#ad0000"
            size="medium"
          >{{roomDetail.roomData.roommateNum}}人间</van-tag>
          <van-tag
            color="#ebedf0"
            text-color="#323233"
            size="medium"
          >{{roomDetail.roomData.toiletNum===1?'独卫':'公卫'}}</van-tag>
          <van-tag
            plain
            size="medium"
          >{{roomDetail.roomData.guestsNum &lt; roomDetail.roomData.roommateNum ? `已入住${roomDetail.roomData.guestsNum}人`:'已满'}}</van-tag>
        </div>
        <div
          class="info"
        >房源：{{roomDetail.houseData.location}}·{{roomDetail.houseData.bedroomNum}}间卧室·{{roomDetail.houseData.bedNum}}张床·{{roomDetail.houseData.tolietNum}}个卫生间·最多可住{{roomDetail.houseData.maxPepole}}人</div>
      </div>

      <div class="facility">
        <div class="title">
          服务设施
          <span is-link @click="showPopup">
            查看详情
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box">
          <div class="sort" v-for="item in 4" :key="item">
            <FacilityList :type="item" :isPop="false" :list="cacheFacilityList"></FacilityList>
          </div>
        </div>
      </div>

      <van-popup class="service-pop" v-model="showPop" position="bottom" closeable>
        <div class="wrapper">
          <div class="sort" v-for="item in 4" :key="item">
            <FacilityList :type="item" :isPop="true" :list="cacheFacilityList"></FacilityList>
          </div>
        </div>
      </van-popup>

      <div class="landlord">
        <div class="title">
          店家
          <span @click="goView(0, roomDetail.landlordData.id)">
            店家主页
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box">
          <div class="person">
            <div class="img">
              <img
                :src="'http://101.133.132.172/public/landlordUploads/'+ roomDetail.landlordData.avator"
                alt
              />
            </div>
            <div class="name">{{roomDetail.landlordData.name}}</div>
          </div>
          <div style="padding: 5px;background: #f7f8fa;border-radius: 3px;">
            <div class="intro" @click="roomIntro(roomDetail.houseData.intro)">
              <span
                class="title"
              >房源介绍：{{roomDetail.houseData.houseName}}·{{roomDetail.houseData.redecoratedDate}}装修；</span>
              {{roomDetail.houseData.intro}}
            </div>
          </div>
        </div>
      </div>

      <div class="comment" v-if="roomDetail.commentsData.list.length > 0">
        <div class="title">
          房客评价
          <span @click="goView(1, $route.query.id)">
            全部{{roomDetail.commentsData.list.length}}条
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box">
          <div class="rateBox">
            <div class="info">
              <i class="iconfont iconxiaolian"></i>
              <span class="num">{{roomDetail.commentsData.average.totalScore}}</span>
              <span>分 {{scoreMessage}}</span>
            </div>
            <div class="rate">
              <div>
                描述
                <span>{{roomDetail.commentsData.average.d_s}}</span>
              </div>
              <div>
                沟通
                <span>{{roomDetail.commentsData.average.c_s}}</span>
              </div>
              <div>
                卫生
                <span>{{roomDetail.commentsData.average.h_s}}</span>
              </div>
              <div>
                管理
                <span>{{roomDetail.commentsData.average.a_s}}</span>
              </div>
            </div>
          </div>
          <van-divider style="padding:10px 0" />
          <div class="commentBox">
            <div class="person" v-if="roomDetail.commentsData.list.length > 0">
              <div class="avator">
                <img
                  :src="'http://101.133.132.172/public/userUploads/'+ roomDetail.commentsData.list[roomDetail.commentsData.list.length-1].avator"
                  alt
                />
              </div>
              <div class="person-box">
                <div
                  class="name"
                >{{getName(roomDetail.commentsData.list[roomDetail.commentsData.list.length-1].name)}}</div>
                <div
                  class="date"
                >{{roomDetail.commentsData.list[roomDetail.commentsData.list.length-1].date}}</div>
              </div>
            </div>
            <div
              class="content"
              v-if="roomDetail.commentsData.list.length > 0"
            >{{roomDetail.commentsData.list[roomDetail.commentsData.list.length-1].message}}</div>
          </div>
        </div>
      </div>

      <div class="notice">
        <div class="title">
          预订须知
          <span>以下规则由平台制定，请仔细阅读并遵守</span>
        </div>
        <Notice :type="0"></Notice>
      </div>
    </div>

    <van-submit-bar
      :price="roomDetail.roomData.price * roomDays * 100"
      button-type="warning"
      button-text="立即预定"
      @submit="goView(2, 4)"
    >
      <div class="icon">
        <a :href="'tel:'+roomDetail.landlordData.phoneNum">
          <van-icon name="phone-o" />联系店家
        </a>
      </div>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Lazyload, Dialog, Toast } from "vant";
import FacilityList from "@/components/FacilityList.vue";
import Notice from "@/components/Notice.vue";
import { roomDetailAPI } from "@/services/roomAPI.ts";
import {
  formatter,
  formatDate,
  getDiff,
  formatRoomDate,
  formatDate2,
  returnFloat,
  formatName
} from "@/common/ts/utill.ts";
import { formatFacilityList } from "@/common/ts/facility.ts";
import merge from "webpack-merge";
Vue.use(Lazyload, Dialog);

@Component({
  name: "RoomDetails",
  components: {
    FacilityList,
    Notice
  }
})
export default class RoomDetails extends Vue {
  $refs: { quickEntry: HTMLFormElement };
  images: any[] = [];
  date = {
    start: `${new Date().getMonth() + 1}月${new Date().getDate()}日`,
    days: 1,
    end: `${new Date().getMonth() + 1}月${new Date().getDate() + 1}日`
  };
  formatter: any = formatter;
  show: boolean = false;
  showPop: boolean = false;

  roomDetail: any = {
    roomData: {},
    houseData: {},
    landlordData: {},
    commentsData: {
      list: [],
      average: {}
    },
    facilityList: []
  };

  cacheFacilityList: any = {
    serviceList: [],
    basisList: [],
    showerList: [],
    kitchenList: []
  };

  get scoreMessage() {
    let score = this.roomDetail.commentsData.average.totalScore;
    if (score > 4.5) {
      return "超赞";
    } else if (score > 3.5) {
      return "赞";
    } else if (score > 2) {
      return "一般";
    } else {
      return "差";
    }
  }

  get roomDays() {
    return this.date.days;
  }

  get roomDate() {
    return formatRoomDate(this.date);
  }

  getName(name: string): string {
    return formatName(name);
  }

  initDate(): void {
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
      start: formatDate(searchStartDateObj),
      days: getDiff(searchStartDateObj, searchEndDateObj),
      end: formatDate(searchEndDateObj)
    };
  }

  mounted(): void {
    this.initDate();
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await roomDetailAPI({
      roomId: self.$route.query.id,
      searchStartDate: self.$route.query.searchStartDate
    });
    try {
      // console.log("获取房间信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.roomDetail = {
          roomData: res.data.data.roomData[0],
          houseData: res.data.data.houseData[0],
          landlordData: res.data.data.landlordData[0],
          commentsData: {
            list: res.data.data.commentsData.list,
            average: res.data.data.commentsData.average[0]
          },
          facilityList: res.data.data.facilityList[0]
        };
        self.formatData();
        let baseURL = `http://101.133.132.172/public/houseUploads/house${self.roomDetail.houseData.id}/room${self.roomDetail.roomData.id}`;
        for (let i = 1; i < 5; i++) {
          self.images.push(`${baseURL}/avator${i}.jpg`);
        }
      }
    } catch (error) {
      Toast.fail("获取房间信息失败");
      console.log("获取房间信息失败" + error);
    }
  }

  // 格式化数据
  formatData(): void {
    let self = this;
    if (self.roomDetail.commentsData.list.length === 0) {
      self.roomDetail.commentsData.average = {
        a_s: 5,
        h_s: 5,
        c_s: 5,
        d_s: 5,
        totalScore: 5
      };
    } else {
      for (let i = 0; i < self.roomDetail.commentsData.list.length; i++) {
        self.roomDetail.commentsData.list[i].date = formatDate2(
          self.roomDetail.commentsData.list[i].date
        );
      }
      self.roomDetail.commentsData.average = {
        h_s: returnFloat(self.roomDetail.commentsData.average.h_s),
        d_s: returnFloat(self.roomDetail.commentsData.average.d_s),
        a_s: returnFloat(self.roomDetail.commentsData.average.a_s),
        c_s: returnFloat(self.roomDetail.commentsData.average.c_s),
        totalScore: returnFloat(self.roomDetail.commentsData.average.totalScore)
      };
    }
    self.cacheFacilityList = formatFacilityList(self.roomDetail.facilityList);
  }

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
    this.$router.push({
      query: merge(this.$route.query, {
        searchStartDate: this.searchStartDate,
        searchDays: this.searchDays
      })
    });
    window.location.reload();
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 前往页面
  goView(index: number, id: string): void {
    switch (index) {
      case 0:
        this.$router.push({
          name: "Landlord",
          query: {
            landlordId: id,
            searchStartDate: this.$route.query.searchStartDate,
            searchDays: this.$route.query.searchDays
          }
        });
        break;
      case 1:
        this.$router.push({
          name: "RoomComment",
          query: { roomId: id }
        });
        break;
      case 2:
        if (
          this.roomDetail.roomData.guestsNum >=
          this.roomDetail.roomData.guestsNum.roommateNum
        ) {
          Toast.fail("很抱歉，当前房间房客已满");
        } else {
          this.$router.push({
            name: "SubmitOrder",
            query: {
              roomId: this.$route.query.id,
              searchStartDate: this.$route.query.searchStartDate,
              searchDays: this.$route.query.searchDays
            }
          });
        }
        break;
      case 3:
        this.$router.push({
          name: "HomePage"
        });
        break;
      default:
        break;
    }
  }

  // 展开服务设施详情弹窗
  showPopup(): void {
    this.showPop = true;
  }

  // 房屋介绍
  roomIntro(intro): void {
    Dialog.alert({
      title: `${this.roomDetail.houseData.houseName}`,
      message: intro,
      messageAlign: "left"
    }).then(() => {
      // on close
    });
  }
}
</script>

<style lang="less">
@import url("~@/common/style/Variable.less");
.room-details {
  .van-swipe {
    width: 100%;
    height: 240px;
  }
  .van-swipe-item img {
    width: 100%;
    height: 100%;
  }
  .van-icon {
    height: 14px;
    vertical-align: middle;
  }
  .van-submit-bar {
    background: @incarnadine;
    .icon {
      font-size: @min-size;
      a {
        color: @black;
      }
      i {
        display: block;
        font-size: @middle-size;
      }
    }
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");

.room-details {
  .my-swipe {
    width: 100%;
    height: 100px;
  }

  .wrapper {
    padding: 0 20px 65px;
  }

  .overview {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .date {
      height: 40px;
      line-height: 40px;
      font-size: @min-size;
      span {
        color: rgb(34, 149, 0);
        margin-left: 5px;
        font-weight: bold;
      }
    }
    .title {
      font-size: @middle-size;
      font-weight: bold;
      margin: 10px 0;
    }
    .info {
      margin: 10px 0 0;
      font-size: @min-size;
    }
  }

  .facility,
  .landlord,
  .comment,
  .notice {
    padding: 8px 0;
    .title {
      font-size: @middle-size;
      font-weight: bold;
      text-align: left;
      margin: 10px 0;
      line-height: @middle-size;
      span {
        font-size: @min-size;
        font-weight: 400;
        color: @gray-5;
      }
    }
    .notice-box,
    .box {
      box-shadow: 0 0 3px @shadow-color-1;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .facility,
  .comment,
  .landlord {
    .title span {
      float: right;
    }
  }

  .facility {
    .box {
      height: 220px;
    }
  }

  .service-pop {
    height: 60%;
    .wrapper {
      padding: 20px 20px 10px;
    }
  }

  .landlord {
    .box {
      .person {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .img {
          border-radius: 50%;
          overflow: hidden;
          width: 40px;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .name {
          font-size: @normal-size;
          font-weight: bold;
          margin-left: 15px;
        }
      }
      .intro {
        font-size: @min-size;
        text-align: left;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

        .title {
          font-size: @min-size;
          font-weight: bold;
        }
      }
    }
  }

  .comment {
    .box {
      .rateBox {
        display: flex;
        flex-direction: column;
        height: 60px;
        justify-content: space-between;
        align-items: flex-start;
        .info {
          font-size: @min-size;
          .iconxiaolian {
            font-size: 28px;
            color: @red;
            margin-right: 5px;
          }
          .num {
            font-size: @large-size;
            font-weight: bold;
          }
        }
        .rate {
          display: flex;
          justify-content: space-between;
          font-size: @min-size;
          color: @gray-6;
          width: 100%;
          div {
            flex: 1;
            text-align: left;
            border-right: 1px solid @gray-3;
            margin-right: 10px;
            height: 13px;
            line-height: 13px;
            span {
              font-size: @normal-size;
              color: @black;
            }
          }
        }
      }
      .commentBox {
        width: 100%;
        display: flex;
        flex-direction: column;
        .person {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .avator {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .person-box {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 10px;
          }
          .date {
            color: @gray-6;
            font-size: @min-size;
            flex: 1;
            text-align: right;
          }
        }
        .content {
          font-size: @min-size;
          text-align: left;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>