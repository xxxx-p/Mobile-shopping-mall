<template>
  <div class="login">
    <van-nav-bar class="tab header" title="收货地址" @click-left="selectretrun" left-arrow />
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
    },
    selectretrun() {
      this.$router.go(-1);
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
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    box-sizing: border-box;
  }

  .body {
    background-color: white;
    height: 95%;
    font-size: 12px;

    input {
      border: 0;
      width: 100%;
      height: 48px;
      border-bottom: 0.5px solid #ccc;
      padding-left: 12px;
      padding-right: 23px;
      box-sizing: border-box;
      margin-bottom: 9.5px;
    }

    .btn {
      font-size: 12px;
      background: #ccc;
      width: 98px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      border-radius: 20px;
      position: absolute;
      right: 12px;
      top: 98px;
    }

    .sub {
      width: 348px;
      height: 48px;
      margin-left: 12px;
      background: #ccc;
      text-align: center;
      line-height: 48px;
      color: #fff;
      border-radius: 23px;
      font-size: 18px;
      margin-top: 9.5px;
    }

    .blue {
      background-color: blue;
    }
  }
}
</style>