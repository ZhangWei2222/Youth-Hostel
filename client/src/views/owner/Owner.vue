<template>
  <div class="own-index">
    <van-nav-bar title="我的页面" :border="false" />

    <div class="wrapper">
      <div class="person">
        <van-uploader :before-read="beforeRead" :after-read="afterRead">
          <div class="image">
            <img :src="'http://101.133.132.172/public/userUploads/'+ user.avator" alt />
          </div>
        </van-uploader>
        <div class="name" v-if="this.isSignIn">{{user.name}}</div>
        <div class="name" v-else>
          <span @click="goViews(-1)">注册</span> /
          <span @click="goViews(-2)">登录</span>
        </div>
      </div>

      <div class="icons">
        <div class="icon" @click="goViews(0)">
          <van-icon name="user-o" size="6vw" />
          <div class="text">我的信息</div>
        </div>
        <div class="icon" @click="goViews(1)">
          <van-icon name="orders-o" size="6vw" />
          <div class="text">我的订单</div>
        </div>
        <div class="icon" @click="goViews(2)">
          <van-icon name="comment-o" size="6vw" />
          <div class="text">我的评价</div>
        </div>
      </div>
      <van-button class="exit-button" type="info" block @click="signOut" v-if="this.isSignIn">退出登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Dialog, Toast } from "vant";
import cookie from "js-cookie";
import { userInfoAPI, userImageAPI } from "@/services/userAPI.ts";
import { State, Mutation } from "vuex-class";

interface CacheUser {
  name: string;
  password: string;
  sex: string;
  bornDate: any;
  phoneNum: string;
  schoolName: string;
  education: string;
  graduationTime: any;
  message: string;
  avator: string;
}

@Component({
  name: "OwnerIndex"
})
export default class OwnerIndex extends Vue {
  @State userState;
  @Mutation SET_USER_AVATOR;

  isSignIn: boolean = false;
  user: CacheUser = {
    name: "",
    password: "",
    sex: "",
    bornDate: "",
    phoneNum: "",
    schoolName: "",
    education: "",
    graduationTime: "",
    message: "",
    avator: "user.png"
  };

  // 初始化
  mounted() {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await userInfoAPI();
    try {
      console.log("获取用户信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        self.isSignIn = true;
        self.user = res.data.data[0];
        if (!self.user["avator"]) {
          self.user["avator"] = "user.png";
        }
      }
    } catch (error) {
      Toast.fail("获取用户信息失败");
      console.log("获取用户信息失败" + error);
    }
  }

  beforeRead(file: any): boolean {
    if (!this.user["id"]) {
      Toast.fail("用户未登录");
      return false;
    }
    return true;
  }

  async afterRead(file): Promise<any> {
    let self = this;

    let params = new FormData(); // 创建一个form对象,必须是form对象否则后端接受不到数据
    params.append("avatar", file.file); // append 向form表单添加数据
    // 添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
    params.append("id", self.user["id"]);

    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    const res = await userImageAPI(params, config);

    try {
      console.log("上传头像信息" + JSON.stringify(res.data));
      if (res.data.code === 0) {
        Toast.success(res.data.msg);
        self.SET_USER_AVATOR(res.data.filename);
        self.$router.go(0);
      } else {
        Toast.fail(res.data.msg);
      }
    } catch (error) {
      Toast.fail("上传失败");
      console.log("上传失败" + error);
    }
  }

  goViews(key): void {
    switch (key) {
      case -1:
        this.$router.push("/signUp");
        break;
      case -2:
        this.$router.push("/signIn");
        break;
      case 0:
        this.$router.push("/info");
        break;
      case 1:
        this.$router.push("/orderlist");
        break;
      case 2:
        this.$router.push("/my-comment");
        break;
      default:
        break;
    }
  }

  signOut(): void {
    let self = this;
    Dialog.confirm({
      title: "登出",
      message: "确定要登出吗?"
    })
      .then(() => {
        cookie.remove("assent_token");
        self.isSignIn = false;
        Toast("你已登出!");
        self.$router.go(0);
      })
      .catch(() => {
        Toast("你已取消操作!");
      });
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

  .icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 40px;
    .icon {
      display: flex;
      flex-direction: column;
      .text {
        margin-top: 10px;
      }
    }
  }

  .exit-button {
    margin-top: 50px;
  }
}
</style>
