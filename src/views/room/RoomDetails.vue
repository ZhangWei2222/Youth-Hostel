<template>
  <div class="room-details">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" :border="false" />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="wrapper">
      <div class="overview">
        <div class="date">
          2月9日-20日·1晚
          <span>修改日期</span>
        </div>
        <van-divider
          class="divider"
          :style="{ borderColor: '#c8c9cc', width: '100%', margin: '0' }"
        />
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
          <span>
            查看详情
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box"></div>
      </div>

      <div class="landlord">
        <div class="title">店家</div>
        <div class="box"></div>
      </div>

      <div class="comment">
        <div class="title">
          房客评价
          <span>
            全部
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="box"></div>
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

    <van-submit-bar :price="3050" button-type="warning" button-text="立即预定" @submit="onSubmit">
      <div class="icon">
        <van-icon name="phone-o" />联系店家
      </div>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Lazyload } from "vant";
Vue.use(Lazyload);

@Component({
  name: "RoomDetails"
})
export default class RoomDetails extends Vue {
  images: any[] = [
    "https://img.yzcdn.cn/vant/apple-1.jpg",
    "https://img.yzcdn.cn/vant/apple-2.jpg"
  ];

  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style lang="less">
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
    height: 18px;
    vertical-align: middle;
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
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
    }
  }

  .facility,
  .comment {
    .title span {
      float: right;
    }
  }

  .notice {
    .box {
      box-shadow: 0 0 3px @shadow-color-1;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 10px;
      height: 130px;
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