<template>
  <div class="facility-list">
    <div :class="isPop ? 'service-pop' : 'service'">
      <div class="title">
        <i v-if="!isPop" :class="!isPop ? 'iconfont ' + result.iconType : ''" />
        <br v-if="!isPop" />
        {{result.name}}
      </div>
      <div class="icons">
        <div
          v-for="(item, index) in result.list"
          :key="item.id"
          v-show="isPop ? index < result.list.length : index < 4"
          :style="{'color':item.isHave ? '#323233' : '#dcdee0'}"
        >
          <van-icon
            :name="item.isHave ? 'checked': 'clear'"
            :color="item.isHave ? '#07c160' : '#dcdee0'"
          />
          <br v-if="isPop" />
          {{item.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "FacilityList"
})
export default class FacilityList extends Vue {
  @Prop()
  type: number;

  @Prop()
  isPop: boolean;

  @Prop()
  list;

  result: any = {
    name: String,
    list: []
  };

  mounted() {
    switch (this.type) {
      case 1:
        this.result.name = "服务";
        this.result.list = this.list.serviceList;
        this.result.iconType = "iconfuwuzhiliang";
        break;
      case 2:
        this.result.name = "基础";
        this.result.list = this.list.basisList;
        this.result.iconType = "iconfangwuxinxi";
        break;
      case 3:
        this.result.name = "洗浴";
        this.result.list = this.list.showerList;
        this.result.iconType = "iconchongwuxiyu";
        break;
      case 4:
        this.result.name = "厨房";
        this.result.list = this.list.kitchenList;
        this.result.iconType = "iconchufangyongpin";
        break;
      default:
        break;
    }
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.facility-list {
  .service {
    display: flex;
    font-size: @min-size;
    height: 40px;
    .title {
      width: 100px;
      font-weight: bold;
      text-align: center;
      i {
        font-size: @large-size;
      }
    }
    .icons {
      display: flex;
      flex-wrap: wrap;
      div {
        width: 100px;
        text-align: left;
      }
    }
  }

  .service-pop {
    margin-bottom: 10px;
    .title {
      font-weight: bold;
      text-align: left;
    }
    .icons {
      display: flex;
      font-size: @min-size;
      justify-content: space-between;
      flex-wrap: wrap;
      div {
        width: 25%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>