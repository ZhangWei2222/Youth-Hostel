<template>
  <div class="hello">
    <div class="box ignore">{{ msg }} + {{ num }}</div>

    <el-button @click="handleChange">+</el-button>
    {{ myCount }}
    <el-button type="primary">-</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
// import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component({})
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
<style scoped lang="less">
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}

.ignore {
  margin: 10px;
  background-color: red;
}
.box {
  width: 180px;
  height: 300px;
  font-size: 30px;
}
</style>
