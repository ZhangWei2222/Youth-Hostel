<template>
  <div class="sign-up">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" :border="false" />
    <div class="wrapper">
      <van-cell-group class="group">
        <van-field v-model="name" required clearable label="用户名" placeholder="请输入用户名" />

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
          v-model="sex"
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
          v-model="bornDate"
          placeholder="请选择日期"
          @click="showBornPicker = true"
        />
        <van-popup v-model="showBornPicker" position="bottom">
          <van-datetime-picker
            :value="currentDate"
            type="year-month"
            :min-date="minDate"
            :max-date="maxBirDate"
            :formatter="formatter"
            @confirm="onBornConfirm"
          />
        </van-popup>

        <van-field
          v-model="phoneNum"
          required
          clearable
          type="digit"
          label="手机号"
          placeholder="请输入手机号"
        />

        <van-field v-model="schoolName" required clearable label="学校" placeholder="请输入学校" />

        <van-field
          readonly
          required
          clickable
          label="学历"
          v-model="education"
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
            :value="currentDate"
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
          label="入住理由"
          type="textarea"
          maxlength="80"
          placeholder="请输入入住理由"
          show-word-limit
          clearable
        />
        <van-button class="button" type="primary" block @click="signUp">注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import md5 from "js-md5";
const { signUpAPI } = require("@/services/loginAPI.ts");

@Component({
  name: "SignUp"
})
export default class SignUp extends Vue {
  // 注册信息
  name: string = "";
  password: string = null;
  sex: string = "";
  bornDate: any = "";
  phoneNum: string = null;
  schoolName: string = "";
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
  maxBirDate: any = new Date(2010, 11, 1);
  maxDate: any = new Date(2025, 1, 1);
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
    this.bornDate = timer;
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

  // 校验表单是否有空，有空返回 false
  checkEmpty(obj: any): boolean {
    let empty = null;
    for (const key in obj) {
      if (obj[key] === null || obj[key] === "") {
        empty = true;
        break;
      } else {
        empty = false;
      }
    }
    return empty;
  }

  // 校验手机号码是否格式正确
  checkPhone(mobile: string): boolean {
    var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (mobile && mobile.length === 11) {
      if (phone.test(mobile)) {
        return true;
      }
    }
    return false;
  }

  // 注册
  async signUp(): Promise<any> {
    let self = this;

    let params = {
      name: self.name,
      password: self.password && md5(self.password),
      sex: self.sex,
      bornDate: self.bornDate,
      phoneNum: self.phoneNum,
      schoolName: self.schoolName,
      education: self.education,
      graduationTime: self.graduationTime,
      message: self.message
    };

    if (self.checkPhone(params.phoneNum) && !self.checkEmpty(params)) {
      const res = await signUpAPI(params);

      try {
        console.log("注册信息" + JSON.stringify(res.data));
        if (res.data.code === 0) {
          Toast.success(res.data.msg);
          self.$router.replace("/signIn");
        } else {
          Toast.fail("注册失败" + res.data.msg);
        }
      } catch (error) {
        Toast.fail("注册失败");
        console.log("注册失败" + error);
      }
    } else {
      Toast.fail("请正确填写信息");
    }
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.sign-up {
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
