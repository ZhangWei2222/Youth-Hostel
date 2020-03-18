<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-18 16:22:22
 -->
<template>
  <div class="my-comment">
    <van-nav-bar title="我的评价" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <CommentRate :userInfo="userInfo"></CommentRate>
      <div class="divider"></div>
      <CommentList :userInfo="userInfo"></CommentList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CommentList from "@/components/CommentList.vue";
import CommentRate from "@/components/CommentRate.vue";
import { Toast } from "vant";
import { userCommentsAPI } from "@/services/userAPI.ts";

interface userInfo {
  data: any[];
  average: any;
}
@Component({
  name: "MyComment",
  components: {
    CommentList,
    CommentRate
  }
})
export default class MyComment extends Vue {
  userInfo: userInfo = {
    data: [],
    average: {}
  };

  mounted(): void {
    this.init();
  }

  // 获取用户评论信息
  async init(): Promise<any> {
    let self = this;
    const res = await userCommentsAPI();
    try {
      // console.log("获取用户评论信息成功" + JSON.stringify(res.data));
      self.userInfo.data = res.data.data;
      self.userInfo.average = res.data.average[0];
      if (self.userInfo.data.length === 0) {
        self.userInfo.average = {
          q_s: 5,
          h_s: 5,
          c_s: 5,
          d_s: 5,
          totalScore: 5
        };
      }
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

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.my-comment {
  .divider {
    width: 100%;
    height: 10px;
    background-color: @gray-2;
  }
}
</style>