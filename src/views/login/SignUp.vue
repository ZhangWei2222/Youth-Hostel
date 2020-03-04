<template>
  <div class="sign-up">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <van-cell-group class="group">
        <UserForm ref="UserForm"></UserForm>
        <van-button class="button" type="primary" block @click="signUp">注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import md5 from "js-md5";
import UserForm from "@/components/UserForm.vue";
import { signUpAPI } from "@/services/loginAPI.ts";

@Component({
  name: "SignUp",
  components: {
    UserForm
  }
})
export default class SignUp extends Vue {
  $refs: { quickEntry: HTMLFormElement };

  // 返回键
  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 校验表单是否有空，有空返回 false
  checkEmpty(obj: any): boolean {
    let empty = null;
    for (const key in obj) {
      if (obj[key] === null || obj[key] === "") {
        empty = true;
        break;
      } else {
        empty = false;
      }
    }
    return empty;
  }

  // 校验手机号码是否格式正确
  checkPhone(mobile: string): boolean {
    var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (mobile && mobile.length === 11) {
      if (phone.test(mobile)) {
        return true;
      }
    }
    return false;
  }

  // 注册
  async signUp(): Promise<any> {
    let self = this;
    let userForm = this.$refs["UserForm"].userForm;
    let params = {
      name: userForm.name,
      password: userForm.password && md5(userForm.password),
      sex: userForm.sex,
      bornDate: userForm.bornDate,
      phoneNum: userForm.phoneNum,
      schoolName: userForm.schoolName,
      education: userForm.education,
      graduationTime: userForm.graduationTime,
      message: userForm.message
    };

    if (self.checkPhone(params.phoneNum) && !self.checkEmpty(params)) {
      const res = await signUpAPI(params);

      try {
        console.log("注册信息" + JSON.stringify(res.data));
        if (res.data.code === 0) {
          Toast.success(res.data.msg);
          self.$router.replace("/signIn");
        } else {
          Toast.fail("注册失败" + res.data.msg);
        }
      } catch (error) {
        Toast.fail("注册失败");
        console.log("注册失败" + error);
      }
    } else {
      Toast.fail("请正确填写信息");
    }
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.sign-up {
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
