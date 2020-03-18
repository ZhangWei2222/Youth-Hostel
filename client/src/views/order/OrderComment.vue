<template>
  <div class="order-comment">
    <van-nav-bar title="订单评价" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <div class="rate-box">
        <div class="rate">
          描述
          <van-rate v-model="comment.describeScore" />
        </div>
        <div class="rate">
          沟通
          <van-rate v-model="comment.communicateScore" />
        </div>
        <div class="rate">
          卫生
          <van-rate v-model="comment.hygieneScore" />
        </div>
        <div class="rate">
          管理
          <van-rate v-model="comment.administrationScore" />
        </div>
      </div>

      <van-field
        class="field"
        v-model="comment.message"
        rows="3"
        autosize
        label="评价"
        type="textarea"
        maxlength="150"
        placeholder="您的评价将会帮助到其他小伙伴哦 >-<"
        show-word-limit
      />

      <van-button class="button" type="info" @click="onCommit()">提交</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import { orderCommentsAPI } from "@/services/orderAPI.ts";

interface comment {
  describeScore: number;
  communicateScore: number;
  hygieneScore: number;
  administrationScore: number;
  message: string;
  orderId: number;
  roomId: number;
}
@Component({
  name: "OrderComment"
})
export default class OrderComment extends Vue {
  comment: comment = {
    describeScore: 5,
    communicateScore: 5,
    hygieneScore: 5,
    administrationScore: 5,
    message: "",
    orderId: 0,
    roomId: 0
  };
  value: number = 5;
  message: string = "";

  onClickLeft(): void {
    this.$router.go(-1);
  }

  async onCommit(): Promise<any> {
    let self = this;
    self.comment.orderId = Number(this.$route.query.orderId);
    self.comment.roomId = Number(this.$route.params.roomId);
    if (!self.comment.message) self.comment.message = "默认好评。";
    const res = await orderCommentsAPI(self.comment);
    try {
      // console.log("评价成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        Toast.success("评价成功");
        self.$router.go(-1);
      } else if (res.data.code === 104) {
        Toast.fail(res.data.msg);
        self.$router.push("SignIn");
      }
    } catch (error) {
      Toast.fail("评价失败");
      console.log("评价失败" + error);
    }
  }
}
</script>

<style lang="less" >
@import url("~@/common/style/Variable.less");
.order-comment {
  .van-cell {
    padding: 10px;
    background: @incarnadine;
    border-radius: 5px;
    .van-field__label {
      width: 60px;
    }
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.order-comment {
  .wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .rate-box {
    width: 100%;
  }
  .rate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    div {
      margin-left: 10px;
    }
  }

  .field {
    margin: 10px;
  }

  .button {
    margin-top: 20px;
    width: 140px;
  }
}
</style>

