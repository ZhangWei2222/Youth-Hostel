<template>
  <div class="home-page">
    <van-nav-bar title="青旅预订" left-arrow @click-left="onClickLeft" />
    <div class="img"></div>
    <div class="search">
      <van-field v-model="text" placeholder="输入目的地、城市或店名" />
      <van-button type="primary" block>查找房间</van-button>
    </div>
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

<style scoped lang="scss">
.home-page {
  .img {
    width: 100%;
    height: 550px;
    background: url("../assets/home.jpg") no-repeat;
    background-size: 100%;
    background-position: center;
  }

  .search {
    width: 80%;
    height: 400px;
    background: yellow;
    margin: auto;
    margin-top: -36px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    align-items: center;
  }
}
</style>
