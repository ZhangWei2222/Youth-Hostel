<template>
  <div class="own-index">
    <van-nav-bar title="我的页面" :border="false" />

    <div class="wrapper">
      <div class="person">
        <van-image
          round
          width="4.5rem"
          height="4.5rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-uploader :after-read="afterRead" />
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
import { userInfoAPI } from "@/services/userAPI.ts";

@Component({
  name: "OwnerIndex"
})
export default class OwnerIndex extends Vue {
  //    src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3745037406,2431076780&fm=15&gp=0.jpg" 未登录图片

  isSignIn: boolean = false;
  user = {};

  // 初始化
  mounted() {
    this.init();
  }

  async init(): Promise<any> {
    let self = this;
    const res = await userInfoAPI();
    try {
      console.log(res);
      if (res.data.code === 0) {
        self.isSignIn = true;
        self.user = res.data.data[0];
      }
    } catch (error) {
      Toast.fail("获取用户信息失败");
      console.log("获取用户信息失败" + error);
    }
  }

  afterRead(file) {
    // 此时可以自行将文件上传至服务器
    // console.log(file.file);

    let params = new FormData(); // 创建一个form对象,必须是form对象否则后端接受不到数据
    params.append("avatar", file.file); // append 向form表单添加数据
    console.log(params.get("avatar"));
    // 添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    this.axios
      .post("http://localhost:4442/user/image", params, config)
      .then(
        function(res) {
          console.log(res);
          this.imageSave = res.data.image;
          sessionStorage.setItem("headImg", this.imageSave); // 将图片保存，并能够在其他地方加载显示
          this.router.go(0); // 刷新页面，头像改变
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
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
        this.$router.push("/order");
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
