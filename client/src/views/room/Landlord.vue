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
          <span>{{landlordInfo.average.totalScore}}</span>
        </div>
        <div class="item">
          评价数
          <span>{{landlordInfo.data.length}}</span>
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
        <CommentList :userInfo="landlordInfo" :type="1"></CommentList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import RoomList from "@/components/RoomList.vue";
import CommentList from "@/components/CommentList.vue";
import { Toast } from "vant";
import { landlordCommentsAPI } from "@/services/roomAPI.ts";
import { formatDate2, returnFloat } from "@/common/utill.ts";

interface landlordInfo {
  data: any[];
  average: any;
}
@Component({
  name: "LandlordIndex",
  components: {
    RoomList,
    CommentList
  }
})
export default class LandlordIndex extends Vue {
  landlordInfo: landlordInfo = {
    data: [],
    average: {}
  };
  active: number = 0;

  mounted(): void {
    this.init();
  }

  // 获取店家评论信息
  async init(): Promise<any> {
    let self = this;
    const res = await landlordCommentsAPI({
      landlordId: 1
    });
    try {
      console.log("获取店家评论信息成功" + JSON.stringify(res.data));
      self.landlordInfo.data = res.data.data;
      for (let i = 0; i < self.landlordInfo.data.length; i++) {
        self.landlordInfo.data[i].date = formatDate2(
          self.landlordInfo.data[i].date
        );
      }
      self.landlordInfo.average = res.data.average[0];
      self.landlordInfo.average = {
        h_s: returnFloat(self.landlordInfo.average.h_s),
        d_s: returnFloat(self.landlordInfo.average.d_s),
        q_s: returnFloat(self.landlordInfo.average.a_s),
        c_s: returnFloat(self.landlordInfo.average.c_s),
        totalScore: parseFloat(
          returnFloat(self.landlordInfo.average.totalScore)
        )
      };
    } catch (error) {
      Toast.fail("获取用户评论信息失败");
      console.log("获取用户评论信息失败" + error);
    }
  }

  onClickLeft(): void {
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
@import url("~@/common/style/Variable.less");
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