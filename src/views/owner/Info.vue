<template>
  <div class="info-index">
    <van-nav-bar title="编辑个人信息" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <van-cell-group class="group">
        <van-field disabled v-model="username" label="用户名" />

        <van-field
          v-model="password"
          required
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
        />

        <van-field disabled label="性别" v-model="sex" />

        <van-field disabled label="出生年月" v-model="born" />

        <van-field
          v-model="phone"
          required
          clearable
          type="number"
          label="手机号"
          placeholder="请输入手机号"
        />

        <van-field disabled v-model="schoolname" label="学校" />

        <van-field disabled label="学历" v-model="education" />

        <van-field disabled label="毕业时间" v-model="graduationTime" />

        <van-field
          required
          v-model="message"
          rows="2"
          autosize
          label="入住目的"
          type="textarea"
          maxlength="120"
          placeholder="请输入入住目的"
          show-word-limit
          clearable
        />
        <van-button class="button" type="primary" block @click="onConfirm">确定</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
Vue.use(Toast);

@Component({
  name: "InfoIndex"
})
export default class InfoIndex extends Vue {
  // 注册信息
  username: string = "混世大魔王";
  password: string = "123";
  sex: string = "女";
  born: any = "1998-10";
  phone: number = 17310580023;
  schoolname: string = "广东工业大学";
  education: string = "本科";
  graduationTime: any = "2020-06";
  message: string = "123456789";

  // 返回键
  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 注册
  onConfirm(): void {
    Toast.success("修改成功");
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Variable.less");
.info-index {
  background: @incarnadine;
  .wrapper {
    padding: 30px 20px;
    height: 93vh;
  }

  .group {
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 5px @shadow-color;
  }

  .button {
    margin: 20px 0 0;
  }
}
</style>
