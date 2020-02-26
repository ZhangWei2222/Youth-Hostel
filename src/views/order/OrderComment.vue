<template>
  <div class="order-comment">
    <van-nav-bar title="订单评价" :border="false" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <div class="rate-box">
        <div class="rate">
          描述
          <van-rate v-model="value" />
        </div>
        <div class="rate">
          沟通
          <van-rate v-model="value" />
        </div>
        <div class="rate">
          卫生
          <van-rate v-model="value" />
        </div>
        <div class="rate">
          管理
          <van-rate v-model="value" />
        </div>
      </div>

      <van-field
        class="field"
        v-model="message"
        rows="3"
        autosize
        label="评价"
        type="textarea"
        maxlength="150"
        placeholder="您的评价将会帮助到其他小伙伴哦 >-<"
        show-word-limit
      />

      <van-button class="button" type="info" @click="goSearch()">提交</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "OrderComment"
})
export default class OrderComment extends Vue {
  value: number = 5;
  message: string = "";

  onClickLeft(): void {
    this.$router.go(-1);
  }
}
</script>

<style lang="less" >
@import url("../../common/style/Variable.less");
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
@import url("../../common/style/Variable.less");
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

