<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-09 18:38:47
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
import { formatDate2, returnFloat } from "@/common/utill.ts";

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
      console.log("获取用户评论信息成功" + JSON.stringify(res.data));
      self.userInfo.data = res.data.data;
      for (let i = 0; i < self.userInfo.data.length; i++) {
        self.userInfo.data[i].date = formatDate2(self.userInfo.data[i].date);
      }
      self.userInfo.average = res.data.average[0];
      self.userInfo.average = {
        h_s: returnFloat(self.userInfo.average.h_s),
        d_s: returnFloat(self.userInfo.average.d_s),
        q_s: returnFloat(self.userInfo.average.q_s),
        c_s: returnFloat(self.userInfo.average.c_s),
        totalScore: parseFloat(returnFloat(self.userInfo.average.totalScore))
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