<template>
  <div class="room-details">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" :border="false" />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <van-calendar
      v-model="show"
      :round="false"
      type="range"
      position="right"
      color="#86cd71"
      :formatter="formatter"
      @confirm="onConfirm"
    />

    <div class="wrapper">
      <div class="overview">
        <div class="date">
          2月9日-20日·1晚
          <span @click="show = true">修改日期</span>
        </div>
        <van-divider :style="{  width: '100%' }" />
        <div class="title">派快乐旅社</div>
        <div class="tags">
          <van-tag
            color="rgba(142, 218, 119, 0.47)"
            text-color="rgb(34, 149, 0)"
            size="medium"
          >4.8分·20条评价</van-tag>
          <van-tag color="#ffe1e1" text-color="#ad0000" size="medium">4人间</van-tag>
          <van-tag color="#ebedf0" text-color="#323233" size="medium">独卫</van-tag>
        </div>
        <div class="info">房源：3间卧室·12张床·2个卫生间·最多可住12人</div>
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
          <div class="sort">
            <div class="facility-icon">
              <i class="iconfont iconfuwuzhiliang" />
              <br />服务
            </div>
            <div class="facility-icons">
              <div
                v-for="(item, index) in facilityList.serviceList"
                :key="item.id"
                v-show="index <4"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                &nbsp;{{item.value}}
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="facility-icon">
              <i class="iconfont iconfangwuxinxi" />
              <br />基础
            </div>
            <div class="facility-icons">
              <div
                v-for="(item, index) in facilityList.basisList"
                :key="item.id"
                v-show="index <4"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                &nbsp;{{item.value}}
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="facility-icon">
              <i class="iconfont iconchongwuxiyu" />
              <br />洗浴
            </div>
            <div class="facility-icons">
              <div
                v-for="(item, index) in facilityList.showerList"
                :key="item.id"
                v-show="index <4"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                &nbsp;{{item.value}}
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="facility-icon">
              <i class="iconfont iconchufangyongpin" />
              <br />厨房
            </div>
            <div class="facility-icons">
              <div
                v-for="(item, index) in facilityList.kitchenList"
                :key="item.id"
                v-show="index <4"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                &nbsp;{{item.value}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <van-popup class="service-pop" v-model="showPop" position="bottom" closeable>
        <div class="wrapper">
          <div class="sort">
            <div class="pop-title">服务</div>
            <div class="pop-icons">
              <div
                v-for="item in facilityList.serviceList"
                :key="item.id"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                <br />
                {{item.value}}
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="pop-title">基础</div>
            <div class="pop-icons">
              <div
                v-for="item in facilityList.basisList"
                :key="item.id"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                <br />
                {{item.value}}
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="pop-title">洗浴</div>
            <div class="pop-icons">
              <div
                v-for="item in facilityList.showerList"
                :key="item.id"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                <br />
                {{item.value}}
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="pop-title">厨房</div>
            <div class="pop-icons">
              <div
                v-for="item in facilityList.kitchenList"
                :key="item.id"
                :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
              >
                <van-icon
                  :name="item.isHave ? 'checked': 'clear'"
                  :color="item.isHave ? '#07c160' : '#dcdee0'"
                />
                <br />
                {{item.value}}
              </div>
            </div>
          </div>
        </div>
      </van-popup>

      <div class="landlord">
        <div class="title">
          店家
          <span @click="goView(0, 1)">
            店家主页
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box">
          <div class="person">
            <div class="img">
              <img src="@/common/images/home.jpg" alt />
            </div>
            <div class="name">叮个房公寓</div>
          </div>
          <div style="padding: 5px;background: #f7f8fa;border-radius: 3px;">
            <div class="intro" @click="roomIntro()">
              <span class="title">房间介绍：</span>
              全新豪华装修，欧式风格，房屋南北通透，凉爽无比，干净舒适，全屋家私家电，各种配套设施齐全。1111111
            </div>
          </div>
        </div>
      </div>

      <div class="comment">
        <div class="title">
          房客评价
          <span @click="goView(1, 0)">
            全部63条
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box">
          <div class="rateBox">
            <div class="info">
              <i class="iconfont iconxiaolian"></i>
              <span class="num">4.8</span>
              <span>分 超赞</span>
            </div>
            <div class="rate">
              <div>
                描述
                <span>4.7</span>
              </div>
              <div>
                沟通
                <span>4.7</span>
              </div>
              <div>
                卫生
                <span>4.7</span>
              </div>
              <div>
                管理
                <span>4.7</span>
              </div>
            </div>
          </div>
          <van-divider />
          <div class="commentBox">
            <div class="person">
              <div class="avator">
                <img src="../../../static/un.jpg" alt />
              </div>
              <div class="person-box">
                <div class="name">z***3</div>
                <div class="date">2020年02月</div>
              </div>
            </div>
            <div class="content">不错，不错。交通便利，每天打扫很干净。不错，不错。交通便利，每天打扫很干净。不错，不错。交通便利，每天打扫很干净。</div>
          </div>
        </div>
      </div>

      <div class="notice">
        <div class="title">
          预订须知
          <span>以下规则由店家制定，请仔细阅读并遵守</span>
        </div>
        <div class="box">
          <div class="info">
            <div class="name">退订政策</div>
            <div class="tip">入住前3天可退全款，入住前一天可退房费的80%，入住当天不可退款</div>
          </div>
          <div class="info">
            <div class="name">入离时间</div>
            <div class="tip">14:00 之后可入住，12:30之前需退房</div>
          </div>
          <div class="info">
            <div class="name">需要注意</div>
            <div class="tip">店家有权根据个人信息和个人评价，对订单进行拒绝</div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar :price="3050" button-type="warning" button-text="立即预定" @submit="goView(2, 4)">
      <div class="icon">
        <a href="tel:13764567708">
          <van-icon name="phone-o" />联系店家
        </a>
      </div>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { formatter, formatDate, getDiff } from "../../common/utill";
import { Lazyload, Dialog } from "vant";
Vue.use(Lazyload, Dialog);

@Component({
  name: "RoomDetails"
})
export default class RoomDetails extends Vue {
  images: any[] = [
    "https://img.yzcdn.cn/vant/apple-1.jpg",
    "https://img.yzcdn.cn/vant/apple-2.jpg"
  ];
  date = {
    start: `${new Date().getMonth() + 1}月${new Date().getDate()}日`,
    days: 1,
    end: `${new Date().getMonth() + 1}月${new Date().getDate() + 1}日`
  };
  formatter: any = formatter;
  show: boolean = false;
  showPop: boolean = false;

  facilityList: any = {
    serviceList: [
      { id: 0, value: "自助入住", isHave: false },
      { id: 1, value: "床品更换", isHave: true },
      { id: 2, value: "行李寄存", isHave: true },
      { id: 3, value: "门禁系统", isHave: true }
    ],
    basisList: [
      { id: 0, value: "wifi", isHave: true },
      { id: 1, value: "电梯", isHave: true },
      { id: 2, value: "空调", isHave: true },
      { id: 3, value: "热水壶", isHave: false },
      { id: 4, value: "洗衣机", isHave: true },
      { id: 5, value: "电吹风", isHave: true },
      { id: 6, value: "电视", isHave: true },
      { id: 7, value: "饮水机", isHave: true },
      { id: 8, value: "电视机", isHave: false },
      { id: 9, value: "打扫工具", isHave: true },
      { id: 10, value: "工作区域", isHave: true },
      { id: 11, value: "电熨斗", isHave: false }
    ],
    showerList: [
      { id: 0, value: "热水淋浴", isHave: true },
      { id: 1, value: "牙具", isHave: true },
      { id: 2, value: "沐浴露", isHave: true },
      { id: 3, value: "拖鞋", isHave: true },
      { id: 4, value: "洗发水", isHave: false },
      { id: 5, value: "毛巾", isHave: false },
      { id: 6, value: "衣架", isHave: true },
      { id: 7, value: "香皂", isHave: true }
    ],
    kitchenList: [
      { id: 0, value: "电磁炉", isHave: false },
      { id: 1, value: "烹饪锅具", isHave: true },
      { id: 2, value: "调料", isHave: false },
      { id: 3, value: "餐具", isHave: true },
      { id: 4, value: "微波炉", isHave: true },
      { id: 5, value: "冰箱", isHave: false },
      { id: 6, value: "燃气灶", isHave: true },
      { id: 7, value: "刀具菜板", isHave: true }
    ]
  };

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

  onClickLeft() {
    this.$router.go(-1);
  }

  // 前往页面
  goView(index: number, id: string): void {
    switch (index) {
      case 0:
        this.$router.push({
          name: "Landlord",
          query: { landlordId: id }
        });
        break;
      case 1:
        this.$router.push({
          name: "RoomComment",
          query: { roomId: id }
        });
        break;
      case 2:
        this.$router.push({
          name: "SubmitOrder",
          query: { roomId: id }
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
  roomIntro(): void {
    Dialog.alert({
      title: "房间介绍",
      message:
        "  全新豪华装修，欧式风格，房屋南北通透，凉爽无比，干净舒适，全屋家私家电，各种配套设施齐全。1111111"
    }).then(() => {
      // on close
    });
  }
}
</script>

<style lang="less">
@import url("../../common/style/Variable.less");
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
@import url("../../common/style/Variable.less");

.room-details {
  .my-swipe {
    width: 100%;
    height: 100px;
  }

  .wrapper {
    padding: 0 20px 80px;
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
      margin: 10px 0;
    }
  }

  .facility,
  .landlord,
  .comment,
  .notice {
    padding: 10px 0;
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
    .box {
      box-shadow: 0 0 3px @shadow-color-1;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 10px;
      height: 130px;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .sort {
        display: flex;
        font-size: @min-size;
        height: 40px;
      }
      .facility-icon {
        width: 100px;
        font-weight: bold;
        text-align: center;
        i {
          font-size: @large-size;
        }
      }
      .facility-icons {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 100px;
          text-align: left;
        }
      }
    }
  }

  .service-pop {
    height: 60%;
    .wrapper {
      padding: 40px 20px 20px;
    }
    .sort {
      margin-bottom: 10px;
    }
    .pop-title {
      font-weight: bold;
      text-align: left;
    }
    .pop-icons {
      display: flex;
      font-size: @min-size;
      justify-content: space-between;
      flex-wrap: wrap;
      // flex-direction: column;
      div {
        width: 25%;
        margin-bottom: 10px;
      }
    }
  }

  .landlord {
    .box {
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .person {
        display: flex;
        align-items: center;
        .img {
          border-radius: 50%;
          overflow: hidden;
          width: 50px;
          height: 50px;
          img {
            width: 50px;
            height: 50px;
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
        display: -webkit-box; //将元素设为盒子伸缩模型显示
        -webkit-box-orient: vertical; //伸缩方向设为垂直方向
        -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号

        .title {
          font-size: @min-size;
          font-weight: bold;
        }
      }
    }
  }

  .comment {
    .box {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
              width: 40px;
              height: 40px;
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
        }
      }
    }
  }

  .notice {
    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .info {
      display: flex;
      text-align: left;
      line-height: 18px;
      .name {
        font-weight: bold;
        width: 80px;
      }
      .tip {
        font-size: @min-size;
        width: 280px;
      }
    }
  }
}
</style>