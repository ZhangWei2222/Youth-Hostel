<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-03-10 18:28:48
 -->
<template>
  <div class="room-comment">
    <van-nav-bar title="房间评价" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <CommentRate :userInfo="roomComments" :type="1"></CommentRate>
      <div class="divider"></div>
      <CommentList :userInfo="roomComments" :type="1"></CommentList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CommentList from "@/components/CommentList.vue";
import CommentRate from "@/components/CommentRate.vue";
import { Toast } from "vant";
import { roomCommentsAPI } from "@/services/roomAPI.ts";

interface roomComments {
  data: any[];
  average: any;
}
@Component({
  name: "RoomComment",
  components: {
    CommentList,
    CommentRate
  }
})
export default class RoomComment extends Vue {
  roomComments: roomComments = {
    data: [],
    average: {}
  };

  mounted(): void {
    this.init();
  }

  // 获取房间评论信息
  async init(): Promise<any> {
    let self = this;
    const res = await roomCommentsAPI({
      roomId: self.$route.query.roomId
    });
    try {
      // console.log("获取房间评论信息成功" + JSON.stringify(res.data));
      self.roomComments = {
        data: res.data.data,
        average: res.data.average[0]
      };
    } catch (error) {
      Toast.fail("获取房间评论信息失败");
      console.log("获取房间评论信息失败" + error);
    }
  }

  onClickLeft(): void {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.room-comment {
  .divider {
    width: 100%;
    height: 10px;
    background-color: @gray-2;
  }
}
</style>