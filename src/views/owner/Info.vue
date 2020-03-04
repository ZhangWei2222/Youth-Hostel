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
import { userInfoAPI } from "@/services/userAPI.ts";

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
      console.log("获取用户信息成功" + res);
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

  // 注册
  editInfo(): void {
    Toast.success("修改成功");
    console.log(this.$refs["UserForm"].userForm);
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
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
