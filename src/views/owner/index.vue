<template>
  <div class="own-index">
    <van-nav-bar title="我的页面" left-arrow @click-left="onClickLeft" />

    <div class="person">
      <van-image
        round
        width="4.5rem"
        height="4.5rem"
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="name">混世大魔王</div>
    </div>

    <div class="icons">
      <div class="icon">
        <van-icon name="user-o" size="18" />我的信息
      </div>
      <div class="icon">
        <van-icon name="orders-o" size="18" />我的订单
      </div>
      <div class="icon">
        <van-icon name="comment-o" size="18" />我的评价
      </div>
    </div>
    <van-button class="exit-button" type="primary" block>退出登录</van-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "@/layout/Header.vue";
import { State, Mutation } from "vuex-class";
// import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component({
  name: "HomePage",
  components: { Header }
})
export default class HelloWorld extends Vue {
  msg: string = "Welcome to Your Vue.js AppAAA";
  num: number = 1;

  // @State count;
  @State("count") myCount;
  // @Mutation("add") mutationAdd;
  @Mutation add;

  created() {
    console.log(this.myCount);
  }

  mounted() {
    // let self = this;
    // //显示列表
    // this.axios.get("http://localhost:4444/api/getBooks").then((res, err):void => {
    //   if (res.data.code > 0) {
    //     console.log(res.data.data);
    //   } else {
    //     this.$message({
    //       showClose: true,
    //       message: `获取书本列表错误：${err}`,
    //       type: "warning"
    //     });
    //   }
    // });
  }

  handleChange() {
    this.add(this.myCount);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.own-index {
  .person {
    background: yellow;
    width: 85%;
    height: 180px;
    border-radius: 10px;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 30px;

    .name {
      margin-left: 30px;
    }
  }

  .icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 60px;
    .icon {
      display: flex;
      flex-direction: column;
    }
  }

  .exit-button {
    position: fixed;
    bottom: 140px;
  }
}
</style>
