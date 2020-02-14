<template>
  <div class="header">
    <i class="arrow el-icon-arrow-left"></i>
    <div class="title">我是头部</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
.header {
  height: 70px;
  // background: red;

  .arrow {
    float: left;
    left: 10px;
    position: absolute;
    line-height: 70px;
  }

  .title {
    font-size: 28px;
    color: #333;
    line-height: 70px;
  }
}
</style>
