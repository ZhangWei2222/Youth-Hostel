<template>
  <div class="sing-in">
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" :border="false" />

    <div class="wrapper">
      <van-cell-group class="group">
        <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />

        <van-field
          v-model="password"
          required
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
        <van-button class="button" type="primary" block @click="singIn">登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
Vue.use(Toast);

@Component({
  name: "SingIn"
})
export default class InfoIndex extends Vue {
  // 登录信息
  username: string = "";
  password: string = "";

  onClickLeft() {
    this.$router.go(-1);
  }

  // 登录
  singIn() {
    Toast.success("登录成功");
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Variable.less");
.sing-in {
  background: @incarnadine;
  .wrapper {
    padding: 20px;
    height: 78vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
