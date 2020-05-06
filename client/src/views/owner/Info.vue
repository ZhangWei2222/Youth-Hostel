<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-06 16:09:44
 * @LastEditTime: 2020-05-06 11:55:46
 -->
<template>
  <div class="info-index">
    <van-nav-bar title="编辑个人信息" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <van-cell-group class="group">
        <UserForm ref="UserForm" :userInfo="userInfo"></UserForm>
        <van-button class="button" type="primary" block @click="editInfo">确定</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import UserForm from "@/components/UserForm.vue";
import { userInfoAPI, editUserInfoAPI } from "@/services/userAPI.ts";
import { checkPhone } from "@/common/ts/utill.ts";

@Component({
  name: "InfoIndex",
  components: {
    UserForm
  }
})
export default class InfoIndex extends Vue {
  $refs: { quickEntry: HTMLFormElement };
  userInfo = {};

  mounted(): void {
    this.init();
  }

  // 获取用户信息
  async init(): Promise<any> {
    let self = this;
    const res = await userInfoAPI();
    try {
      console.log("获取用户信息成功" + JSON.stringify(res.data));
      self.userInfo = res.data.data[0];
    } catch (error) {
      Toast.fail("获取用户信息失败");
      console.log("获取用户信息失败" + error);
    }
  }

  // 返回键
  onClickLeft(): void {
    this.$router.go(-1);
  }

  // 编辑
  async editInfo(): Promise<any> {
    let self = this;
    let userForm = self.$refs["UserForm"].userForm;
    let errorMessage = self.$refs["UserForm"].errorMessage;
    if (
      userForm.password &&
      !errorMessage &&
      checkPhone(userForm.phoneNum) &&
      userForm.message
    ) {
      const res = await editUserInfoAPI({
        id: userForm.id,
        password: userForm.password,
        phoneNum: userForm.phoneNum,
        message: userForm.message
      });
      try {
        console.log("编辑信息" + JSON.stringify(res.data));
        if (res.data.code === 0) {
          Toast.success(res.data.msg);
          window.location.reload();
        }
      } catch (error) {
        Toast.fail("修改失败");
        console.log("修改失败" + error);
      }
    } else {
      Toast.fail("请正确填写信息");
    }
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.info-index {
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
