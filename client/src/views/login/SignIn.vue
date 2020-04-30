<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-04-30 10:47:05
 -->
<template>
  <div class="sign-in">
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
        <van-button class="button" type="primary" block @click="signIn">登录</van-button>
        <van-button class="button" type="info" block to="signUp">去注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import md5 from "js-md5";
import cookie from "js-cookie";
import { signInAPI, landlordSignInAPI } from "@/services/loginAPI.ts";

@Component({
  name: "SignIn"
})
export default class SignIn extends Vue {
  // 登录信息
  username: string = "";
  password: string = "";

  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 登录
  async signIn(): Promise<any> {
    let self = this;
    if (self.username && self.password) {
      let res;
      if (self.$route.query.type && self.$route.query.type === "admin") {
        res = await landlordSignInAPI({
          username: self.username,
          password: md5(self.password)
        });
        try {
          console.log("店家登录信息" + JSON.stringify(res.data));
          if (res.data.code === 0) {
            Toast.success(res.data.msg);
            cookie.set("landlord_token", res.data.token, {
              expires: 1,
              path: ""
            });
            self.$router.replace("/admin");
          } else {
            Toast.fail(res.data.msg);
          }
        } catch (error) {
          Toast.fail("店家登录失败");
          console.log("店家登录失败" + error);
        }
      } else {
        res = await signInAPI({
          username: self.username,
          password: md5(self.password)
        });
        try {
          console.log("用户登录信息" + JSON.stringify(res.data));
          if (res.data.code === 0) {
            Toast.success(res.data.msg);
            cookie.set("assent_token", res.data.token, {
              expires: 1,
              path: ""
            });
            if (self.$route.query.redirect) {
              self.$router.replace("" + self.$route.query.redirect);
            } else {
              self.$router.replace("/");
            }
          } else {
            Toast.fail(res.data.msg);
          }
        } catch (error) {
          Toast.fail("用户登录失败");
          console.log("用户登录失败" + error);
        }
      }
    } else {
      Toast.fail("请正确填写信息");
    }
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.sign-in {
  background: @incarnadine;
  height: 100%;
  .wrapper {
    padding: 20px;
    // height: 78vh;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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
    margin: 10px 0 0;
  }
}
</style>
