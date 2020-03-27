<template>
  <div class="login">
    <div class="header">登陆/注册</div>
    <div class="body">
      <input v-model="phone" type="number" placeholder="输入手机号(新手机号自动注册)" />
      <div>
        <input type="number" v-model="codes" placeholder="输入手机验证码" />
        <div :class="getcode?'btn blue':'btn'" @click="getCode">获取验证码</div>
      </div>
      <div :class="getlogin?'sub blue':'sub'" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      phone: "",
      codes: "",
      getcode: false,
      getlogin: false
    };
  },
  watch: {
    phone(New) {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.test(New)) {
        this.getcode = true;
      } else {
        this.getcode = false;
      }
    },
    codes(New) {
      if (New == this.code) {
        this.getlogin = true;
      } else {
        this.getlogin = false;
      }
    }
  },
  methods: {
    getCode() {
      if (this.getcode) {
        //随机生成四位数公式Math.floor(Math.random()*(max-min))+min;
        this.code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
        let codes = this.code;
        this.$dialog.confirm({
          title: "提示",
          message: `${codes}`
        });
      } else {
        return;
      }
    },
    login() {
      if (this.getlogin) {
        axios.post("api/nottoken/login", { phone: this.phone }).then(res => {
          let storage = window.localStorage;
          storage.setItem("token", res.data.data.token);
          this.$router.push("/My");
        });
      } else {
        return;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.login {
  height: 100%;
  width: 100%;

  .header {
    background-color: rgb(248, 248, 248);
    color: rgb(0, 0, 0);
    height: 5%;
    text-align: center;
    padding: 0.266667rem 0.08rem;
    font-weight: 700;
    font-size: 0.426667rem;
    box-sizing: border-box;
  }

  .body {
    background-color: white;
    height: 95%;
    font-size: 0.4rem;

    input {
      border: 0;
      width: 100%;
      height: 1.333333rem;
      border-bottom: 0.5px solid #ccc;
      padding-left: 0.32rem;
      padding-right: 0.666667rem;
      box-sizing: border-box;
      margin-bottom: 0.266667rem;
    }

    .btn {
      font-size: 0.4rem;
      background: #ccc;
      width: 2.666667rem;
      height: 1.066667rem;
      text-align: center;
      line-height: 1.066667rem;
      color: #fff;
      border-radius: 0.533333rem;
      position: absolute;
      right: 0.32rem;
      top: 2.666667rem;
    }

    .sub {
      width: 9.333333rem;
      height: 1.333333rem;
      margin-left: 0.32rem;
      background: #ccc;
      text-align: center;
      line-height: 1.333333rem;
      color: #fff;
      border-radius: 0.666667rem;
      font-size: 0.48rem;
      margin-top: 0.266667rem;
    }

    .blue {
      background-color: blue;
    }
  }
}
</style>