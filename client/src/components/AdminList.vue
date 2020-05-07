<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 17:04:05
 * @LastEditTime: 2020-05-07 17:50:32
 -->

<template>
  <div class="admin-list">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="order" v-for="item in list" :key="item.id">
        <van-image
          class="img"
          width="60"
          height="60"
          radius="3"
          fit="cover"
          :src="`http://101.133.132.172/public/userUploads/${item.userAvator?item.userAvator:'user.png'}`"
          @click="goView(0,item.userId)"
        />
        <div
          class="details"
          @click="goView(-1,item.id)"
          :style="{'color':item.status===-3 || item.status===-5 || item.status===-4 || item.status===-2 ? '#c8c9cc':'#323233'}"
        >
          <div class="title">{{item.userName}}</div>
          <div
            class="info"
          >{{getOrderDate(item.startDate,item.days)}}·{{item.days}}晚·{{item.allPrice}}元</div>
          <div
            :style="{'color':item.status===-1 || item.status===-6 ? '#bf3c20':item.status===-3 || item.status===-5 || item.status===-4 || item.status===-2 ? '#c8c9cc':'#323233'}"
          >{{getStatusText(item.status,item.isCommented)}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatAdminStatusText, formatOrderDate } from "@/common/ts/utill.ts";

@Component({
  name: "AdminList"
})
export default class AdminList extends Vue {
  list: any = [];
  loading: boolean = false;
  finished: boolean = false;

  @Prop()
  adminList;

  getStatusText(status: number, isCommented: boolean): String {
    return formatAdminStatusText(status, isCommented).text;
  }

  getOrderDate(startDate: any, days: number): any {
    return formatOrderDate(startDate, days);
  }

  goView(index: number, id: number): void {
    if (index === 0) {
      this.$router.push({
        name: "MyComment",
        query: { userId: id.toString() }
      });
    } else if (index === -1) {
      this.$router.push({
        name: "AdminDetail",
        query: { orderId: id.toString() }
      });
    }
  }

  onLoad(): void {
    let self = this;
    setTimeout(() => {
      for (let i = self.adminList.length - 1; i >= 0; i--) {
        self.list.push(self.adminList[i]);
      }
      self.loading = false;
      if (self.list.length >= self.adminList.length) {
        self.finished = true;
      }
    }, 0);
  }
}
</script>

<style lang="less">
.admin-list {
  .van-list__finished-text {
    font-size: 12px;
    line-height: 40px;
  }
}
</style>
<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.admin-list {
  .order {
    height: 60px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px @shadow-color;
    display: flex;
    align-items: center;
    background: @incarnadine;
    margin: 20px 0;
    justify-content: space-between;
    .img {
      width: 60px;
      height: 60px;
      border-radius: 3px;
      object-fit: cover;
    }
    .details {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 77%;
      .title {
        font-weight: bold;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>