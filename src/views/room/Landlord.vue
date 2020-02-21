<template>
  <div class="landlord-index">
    <van-nav-bar title="店家主页" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <div class="person">
        <div class="img">
          <img src="@/common/images/home.jpg" alt />
        </div>
        <div class="name">叮个房公寓</div>
      </div>

      <div class="rateBox">
        <div class="item">
          房间数
          <span>20</span>
        </div>
        <div class="item">
          整体评分
          <span>4.7</span>
        </div>
        <div class="item">
          评价数
          <span>40</span>
        </div>
      </div>
    </div>

    <van-tabs class="tabs" v-model="active" color="#86cd71" sticky>
      <van-tab class="tab">
        <div slot="title">房源</div>
        <!-- 商品列表 -->
        <RoomList></RoomList>
      </van-tab>

      <van-tab class="tab">
        <div slot="title">评价</div>
        <CommonList></CommonList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import RoomList from "@/components/RoomList.vue";
import CommonList from "@/components/CommonList.vue";

@Component({
  name: "LandlordIndex",
  components: {
    RoomList,
    CommonList
  }
})
export default class LandlordIndex extends Vue {
  active: number = 0;
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style lang="less">
.landlord-index {
  .van-hairline--top-bottom:after,
  .van-hairline-unset--top-bottom:after {
    border: none;
  }
}
</style>
<style scoped lang="less">
@import url("../../common/style/Variable.less");
.landlord-index {
  .wrapper {
    padding: 20px 20px 0 20px;
  }
  .person {
    display: flex;
    align-items: center;
    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
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
  .rateBox {
    box-shadow: 0 0 3px @shadow-color-1;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    height: 50px;
    color: @gray-6;
    font-size: @min-size;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .item {
      margin-right: 60px;
      span {
        display: block;
        font-size: @middle-size;
        color: @black;
        font-weight: bold;
      }
    }
  }
}
</style>