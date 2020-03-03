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

  facilityList: any = {
    serviceList: [
      { id: 0, value: "自助入住", isHave: false },
      { id: 1, value: "床品更换", isHave: true },
      { id: 2, value: "行李寄存", isHave: true },
      { id: 3, value: "门禁系统", isHave: true }
    ],
    basisList: [
      { id: 0, value: "wifi", isHave: true },
      { id: 1, value: "电梯", isHave: true },
      { id: 2, value: "空调", isHave: true },
      { id: 3, value: "热水壶", isHave: false },
      { id: 4, value: "洗衣机", isHave: true },
      { id: 5, value: "电吹风", isHave: true },
      { id: 6, value: "电视", isHave: true },
      { id: 7, value: "饮水机", isHave: true },
      { id: 8, value: "电视机", isHave: false },
      { id: 9, value: "打扫工具", isHave: true },
      { id: 10, value: "工作区域", isHave: true },
      { id: 11, value: "电熨斗", isHave: false }
    ],
    showerList: [
      { id: 0, value: "热水淋浴", isHave: true },
      { id: 1, value: "牙具", isHave: true },
      { id: 2, value: "沐浴露", isHave: true },
      { id: 3, value: "拖鞋", isHave: true },
      { id: 4, value: "洗发水", isHave: false },
      { id: 5, value: "毛巾", isHave: false },
      { id: 6, value: "衣架", isHave: true },
      { id: 7, value: "香皂", isHave: true }
    ],
    kitchenList: [
      { id: 0, value: "电磁炉", isHave: false },
      { id: 1, value: "烹饪锅具", isHave: true },
      { id: 2, value: "调料", isHave: false },
      { id: 3, value: "餐具", isHave: true },
      { id: 4, value: "微波炉", isHave: true },
      { id: 5, value: "冰箱", isHave: false },
      { id: 6, value: "燃气灶", isHave: true },
      { id: 7, value: "刀具菜板", isHave: true }
    ]
  };

  result: any = {
    name: String,
    list: []
  };

  mounted() {
    switch (this.type) {
      case 1:
        this.result.name = "服务";
        this.result.list = this.facilityList.serviceList;
        this.result.iconType = "iconfuwuzhiliang";
        break;
      case 2:
        this.result.name = "基础";
        this.result.list = this.facilityList.basisList;
        this.result.iconType = "iconfangwuxinxi";
        break;
      case 3:
        this.result.name = "洗浴";
        this.result.list = this.facilityList.showerList;
        this.result.iconType = "iconchongwuxiyu";
        break;
      case 4:
        this.result.name = "厨房";
        this.result.list = this.facilityList.kitchenList;
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