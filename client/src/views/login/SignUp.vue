<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-05-06 11:57:47
 -->
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
import { checkPhone, checkEmpty } from "@/common/ts/utill.ts";

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

    if (this.$refs["UserForm"].isAuthen) {
      if (checkEmpty(params)) {
        Toast.fail("请检查信息是否完整");
      } else if (!checkPhone(params.phoneNum)) {
        Toast.fail("请检查手机号码是否正确");
      } else if (this.$refs["UserForm"].errorMessage) {
        Toast.fail("请确认密码");
      } else {
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
      }
    } else {
      Toast.fail("请完成高校认证");
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
    margin-bottom: 50px;
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
