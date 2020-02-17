<template>
  <div class="sing-up">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <van-cell-group class="group">
        <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />

        <van-field
          v-model="password"
          required
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
        />

        <van-field
          readonly
          required
          clickable
          label="性别"
          :value="sex"
          placeholder="请选择性别"
          @click="showSexPicker = true"
        />
        <van-popup v-model="showSexPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="sexColumns"
            @cancel="showSexPicker = false"
            @confirm="onSexConfirm"
          />
        </van-popup>

        <van-field
          readonly
          required
          clickable
          label="出生年月"
          v-model="born"
          placeholder="请选择日期"
          @click="showBornPicker = true"
        />
        <van-popup v-model="showBornPicker" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="onBornConfirm"
          />
        </van-popup>

        <van-field v-model="phone" required clearable type="tel" label="手机号" placeholder="请输入手机号" />

        <van-field v-model="schoolname" required clearable label="学校" placeholder="请输入学校" />

        <van-field
          readonly
          required
          clickable
          label="学历"
          :value="education"
          placeholder="请选择学历"
          @click="showEducationPicker = true"
        />
        <van-popup v-model="showEducationPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="educationColumns"
            @cancel="showEducationPicker = false"
            @confirm="onEducationConfirm"
          />
        </van-popup>

        <van-field
          readonly
          required
          clickable
          label="毕业时间"
          v-model="graduationTime"
          placeholder="请选择日期"
          @click="showGraduationTimePicker = true"
        />
        <van-popup v-model="showGraduationTimePicker" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="onGraduationTimeConfirm"
          />
        </van-popup>

        <van-field
          required
          v-model="message"
          rows="2"
          autosize
          label="入住目的"
          type="textarea"
          maxlength="120"
          placeholder="请输入入住目的"
          show-word-limit
          clearable
        />
        <van-button class="button" type="primary" block @click="singUp">注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
Vue.use(Toast);

@Component({
  name: "SingUp"
})
export default class InfoIndex extends Vue {
  // 注册信息
  username: string = "";
  password: string = "";
  sex: string = "";
  born: any = "";
  phone: number = null;
  schoolname: string = "";
  education: string = "";
  graduationTime: any = "";
  message: string = "";

  // 性别下拉框
  showSexPicker: boolean = false;
  sexColumns: string[] = ["男", "女"];
  // 出生年月选择器
  showBornPicker: boolean = false;
  currentDate: any = new Date();
  minDate: any = new Date(1970, 0, 1);
  maxDate: any = new Date(2025, 10, 1);
  // 学历下拉框
  showEducationPicker: boolean = false;
  educationColumns: string[] = ["博士", "硕士", "本科", "高中", "初中", "小学"];
  // 毕业时间选择器
  showGraduationTimePicker: boolean = false;

  // 返回键
  onClickLeft(): void {
    this.$router.go(-1);
  }
  // 选择性别
  onSexConfirm(value: string): void {
    this.sex = value;
    this.showSexPicker = false;
  }
  // 选择出生年月
  onBornConfirm(value: any): void {
    var date = value;
    var m = date.getMonth() + 1;
    if (m >= 1 && m <= 9) {
      m = "0" + m;
    }
    var timer = date.getFullYear() + "-" + m;
    this.born = timer;
    this.showBornPicker = false;
  }
  // 格式化时间
  formatter(type: string, val: string): any {
    if (type === "year") {
      return `${val}年`;
    } else if (type === "month") {
      return `${val}月`;
    }
    return val;
  }
  // 选择学历
  onEducationConfirm(value: string): void {
    this.education = value;
    this.showEducationPicker = false;
  }
  // 选择毕业时间
  onGraduationTimeConfirm(value: any): void {
    var date = value;
    var m = date.getMonth() + 1;
    if (m >= 1 && m <= 9) {
      m = "0" + m;
    }
    var timer = date.getFullYear() + "-" + m;
    this.graduationTime = timer;
    this.showGraduationTimePicker = false;
  }

  // 注册
  singUp() {
    Toast.success("注册成功");
  }
}
</script>

<style scoped lang="less">
@import url("../../common/style/Variable.less");
.sing-up {
  background: @incarnadine;
  .wrapper {
    padding: 30px 20px;
    height: 93vh;
  }

  .group {
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 5px @shadow-color;
  }

  .button {
    margin: 20px 0 0;
  }
}
</style>
