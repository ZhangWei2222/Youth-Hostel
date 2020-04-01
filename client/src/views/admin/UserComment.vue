<template>
  <div class="user-comment">
    <van-nav-bar title="房客评价" :border="false" left-arrow @click-left="onClickLeft" />
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
import { userCommentsAPI } from "@/services/adminAPI.ts";

interface comment {
  describeScore: number;
  communicateScore: number;
  hygieneScore: number;
  administrationScore: number;
  message: string;
  orderId: number;
  userId: number;
  landlordId: number;
}
@Component({
  name: "UserComment"
})
export default class UserComment extends Vue {
  comment: comment = {
    describeScore: 5,
    communicateScore: 5,
    hygieneScore: 5,
    administrationScore: 5,
    message: "",
    orderId: 0,
    userId: 0,
    landlordId: 0
  };
  value: number = 5;
  message: string = "";

  onClickLeft(): void {
    this.$router.go(-1);
  }

  async onCommit(): Promise<any> {
    let self = this;
    self.comment.orderId = Number(this.$route.query.orderId);
    self.comment.userId = Number(this.$route.params.userId);
    self.comment.landlordId = Number(this.$route.params.landlordId);
    if (!self.comment.message) self.comment.message = "默认好评。";
    const res = await userCommentsAPI(self.comment);
    try {
      // console.log("评价成功" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        Toast.success("评价房客成功");
        self.$router.go(-1);
      }
    } catch (error) {
      Toast.fail("评价房客失败");
      console.log("评价房客失败" + error);
    }
  }
}
</script>

<style lang="less" >
@import url("~@/common/style/Variable.less");
.user-comment {
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
.user-comment {
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

