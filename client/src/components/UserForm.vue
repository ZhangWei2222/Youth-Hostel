<template>
  <div class="user-form">
    <van-field
      v-model="userForm.name"
      :required="!isEdit"
      clearable
      label="用户名"
      placeholder="请输入用户名"
      :disabled="isEdit"
    />

    <van-field
      v-if="!isEdit"
      v-model="userForm.password"
      required
      clearable
      type="password"
      label="密码"
      placeholder="请输入密码"
    />
    <van-field
      v-else
      v-model="cachePassword"
      required
      clearable
      type="password"
      label="密码"
      placeholder="请输入密码"
    />

    <van-field
      readonly
      :required="!isEdit"
      clickable
      label="性别"
      v-model="userForm.sex"
      placeholder="请选择性别"
      @click="showSexPicker = true"
      :disabled="isEdit"
    />
    <van-popup v-if="!isEdit" v-model="showSexPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="sexColumns"
        @cancel="showSexPicker = false"
        @confirm="onSexConfirm"
      />
    </van-popup>

    <van-field
      readonly
      :required="!isEdit"
      clickable
      label="出生年月"
      v-model="userForm.bornDate.split('T')[0]"
      placeholder="请选择日期"
      @click="showBornPicker = true"
      :disabled="isEdit"
    />
    <van-popup v-if="!isEdit" v-model="showBornPicker" position="bottom">
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
      v-model="userForm.phoneNum"
      required
      clearable
      type="digit"
      label="手机号"
      placeholder="请输入手机号"
    />

    <van-field
      v-model="userForm.schoolName"
      :required="!isEdit"
      clearable
      label="学校"
      placeholder="请输入学校"
      :disabled="isEdit"
    >
      <template #button v-if="!isEdit">
        <van-button size="small" type="primary" @click="authenSchool">高校认证</van-button>
      </template>
    </van-field>

    <van-field
      readonly
      :required="!isEdit"
      clickable
      label="学历"
      v-model="userForm.education"
      placeholder="请选择学历"
      @click="showEducationPicker = true"
      :disabled="isEdit"
    />
    <van-popup v-if="!isEdit" v-model="showEducationPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="educationColumns"
        @cancel="showEducationPicker = false"
        @confirm="onEducationConfirm"
      />
    </van-popup>

    <van-field
      readonly
      :required="!isEdit"
      clickable
      label="毕业时间"
      v-model="userForm.graduationTime.split('T')[0]"
      placeholder="请选择日期"
      @click="showGraduationTimePicker = true"
      :disabled="isEdit"
    />
    <van-popup v-if="!isEdit" v-model="showGraduationTimePicker" position="bottom">
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
      v-model="userForm.message"
      rows="2"
      autosize
      label="入住理由"
      type="textarea"
      maxlength="80"
      placeholder="请输入入住理由"
      show-word-limit
      clearable
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import md5 from "js-md5";
import { Toast } from "vant";

interface CacheUser {
  name: string;
  password: string;
  sex: string;
  bornDate: any;
  phoneNum: string;
  schoolName: string;
  education: string;
  graduationTime: any;
  message: string;
  avator: string;
}
@Component({
  name: "UserForm"
})
export default class UserForm extends Vue {
  @Prop()
  userInfo: any;

  userForm: CacheUser = {
    name: "",
    password: "",
    sex: "",
    bornDate: "",
    phoneNum: "",
    schoolName: "",
    education: "",
    graduationTime: "",
    message: "",
    avator: ""
  };
  isEdit: boolean = false;
  cachePassword: string = "000000";
  isAuthen: boolean = false;

  @Watch("userInfo")
  getUserInfo(cur: any, old: any): void {
    this.userForm = this.userInfo;
    this.isEdit = true;
  }

  @Watch("cachePassword")
  getCachePassword(cur: any, old: any): void {
    if (cur) {
      this.userForm.password = md5(cur);
    } else {
      this.userForm.password = "";
    }
    console.log(this.userForm.password);
  }

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

  // 选择性别
  onSexConfirm(value: string): void {
    this.userForm.sex = value;
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
    this.userForm.bornDate = timer;
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
    this.userForm.education = value;
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
    this.userForm.graduationTime = timer;
    this.showGraduationTimePicker = false;
  }

  // 进行高校认证
  authenSchool(): void {
    this.isAuthen = true;
    Toast.success("高校认证成功");
  }
}
</script>

<style scoped lang="less">
@import url("~@/common/style/Variable.less");
.user-form {
}
</style>