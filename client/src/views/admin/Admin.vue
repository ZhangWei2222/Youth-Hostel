<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 16:11:06
 * @LastEditTime: 2020-04-30 17:24:40
 -->
<template>
  <div class="own-index">
    <van-nav-bar title="店家管理页面" :border="false">
      <template #right>
        <van-icon name="home-o" @click="goViews(0)" />
      </template>
    </van-nav-bar>

    <div class="wrapper">
      <div class="person">
        <div class="image">
          <img :src="'http://101.133.132.172/public/landlordUploads/'+ landlord.avator" alt />
        </div>
        <div class="name" v-if="this.isSignIn">{{landlord.name}}</div>
        <div class="name" v-else>
          <span @click="goViews(-1)">登录</span>
        </div>
      </div>

      <div class="title" v-if="this.isSignIn">订单列表</div>

      <AdminList
        ref="adminList"
        :adminList="adminList"
        v-if="this.isSignIn && adminList.length > 0"
      ></AdminList>
      <div
        v-if="this.isSignIn && adminList.length === 0"
        :style="{'text-align':'left','margin':'20px 0'}"
      >暂无订单</div>
      <van-button class="exit-button" type="info" block @click="signOut" v-if="this.isSignIn">退出登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Dialog, Toast } from "vant";
import cookie from "js-cookie";
import { adminInfoAPI, adminListAPI } from "@/services/adminAPI.ts";
import AdminList from "@/components/AdminList.vue";

interface CacheLandlord {
  name: string;
  password: string;
  phoneNum: string;
  avator: string;
}

@Component({
  name: "OwnerIndex",
  components: {
    AdminList
  }
})
export default class OwnerIndex extends Vue {
  $refs: { quickEntry: HTMLFormElement };
  isSignIn: boolean = false;
  landlord: CacheLandlord = {
    name: "",
    password: "",
    phoneNum: "",
    avator: "landlord.png"
  };
  adminList: any = [];

  mounted() {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await adminInfoAPI();
    try {
      // console.log("获取店家信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.isSignIn = true;
        self.landlord = res.data.data[0];
        if (!self.landlord["avator"]) {
          self.landlord["avator"] = "landlord.png";
        }
        self.getAdminList();
      }
    } catch (error) {
      Toast.fail("获取店家信息失败");
      console.log("获取店家信息失败" + error);
    }
  }

  async getAdminList(): Promise<any> {
    let self = this;
    const res = await adminListAPI();
    try {
      // console.log("获取订单信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.adminList = res.data.data;
        if (this.$refs["adminList"]) this.$refs["adminList"].onLoad();
      }
    } catch (error) {
      Toast.fail("获取店家信息失败");
      console.log("获取店家信息失败" + error);
    }
  }

  signOut(): void {
    let self = this;
    Dialog.confirm({
      title: "登出",
      message: "确定要登出吗?"
    })
      .then(() => {
        cookie.remove("landlord_token");
        self.isSignIn = false;
        Toast("你已登出!");
        self.landlord.avator = "landlord.png";
        window.scrollTo(0, 0);
        window.location.reload();
      })
      .catch(() => {
        Toast("你已取消操作!");
      });
  }

  goViews(key): void {
    switch (key) {
      case -1:
        this.$router.push("/signIn");
        this.$router.push({
          name: "SignIn",
          query: { type: "admin" }
        });
        break;
      case 0:
        this.$router.push("/home");
        break;
    }
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.own-index {
  .wrapper {
    padding: 0 20px 20px;
  }

  .person {
    background: @yellow;
    height: 90px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 15px;
    .image {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid @gray-3;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      font-size: @middle-size;
      font-weight: 600;
      margin-left: 15px;
    }
  }

  .title {
    font-size: @middle-size;
    font-weight: bold;
    text-align: left;
    margin-top: 30px;
  }

  .button-wrapper {
    // position: fixed;
    // width: 90%;
    // bottom: 0;
    // padding: 20px;
    // left: 50%;
    // transform: translateX(-50%);
    .exit-button {
      margin-top: 50px;
    }
  }
}
</style>
