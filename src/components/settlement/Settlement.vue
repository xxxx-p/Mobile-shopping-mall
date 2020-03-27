<template>
  <div>
    <van-nav-bar class="tab" @click-left="selectreturn" title="叮当买菜" left-arrow />
    <van-nav-bar class="home" v-show="chosenAddressId==''" @click-left="selectaddress">
      <template #left>
        <van-icon name="add" />
        <span>请添加收货地址</span>
      </template>
      <template #right>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="home" v-show="chosenAddressId!=''" @click-left="selectaddress">
      <template #left>
        <div class="address-header">
          <span>{{addressinfo.address}}</span>
          <div class="address-body">
            <span>{{addressinfo.name}}</span>
            <span>{{addressinfo.tel}}</span>
          </div>
        </div>
      </template>
      <template #right>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <div class="order-hr"></div>
    <van-nav-bar class="item" left-text="送达时间">
      <template #right>
        <span @click="showPopup" v-show="selectTime==''">选择配送时间</span>
        <span @click="showPopup" v-show="selectTime!=''">{{selectTime[0]}}{{selectTime[1]}}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item shop">
      <template #left>
        <div class="img-con">
          <div v-for="(item,index) in imgicon" :key="index" class="img-item">
            <img :src="item" />
          </div>
        </div>
      </template>
      <template #right>
        <span>共{{count}}件</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item" left-text="备注" style="margin-bottom:.6rem">
      <template #title>
        <input type="text" placeholder="选填,告诉小哥你的特殊要求" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item" left-text="支付方式">
      <template #right>
        <span @click="selectMoney">{{moneyColumns[0].values[0]}}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item" left-text="优惠券" style="margin-bottom:.3rem">
      <template #right>
        <span>0张可用</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item" left-text="商品金额">
      <template #right>
        <span>{{price}}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item" left-text="配送费">
      <template #right>
        <span>10</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar class="item" left-text="积分">
      <template #right>
        <span>+{{price}}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-submit-bar :price="allprice" @submit="selectsub" button-text="提交订单" />
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        title="选择配送时间"
        @change="changeToday"
        @confirm="selectconfirm"
        :columns="columns"
      />
    </van-popup>
    <van-popup v-model="moneyShow" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar title="选择支付方式" :columns="moneyColumns" @confirm="moneyOnConfirm" />
    </van-popup>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import areaList from "../../assets/js/area.js";
export default {
  name: "Settlement",
  data() {
    return {
      Delivery: 10, //配送费
      show: false, //配送
      moneyShow: false, //余额弹窗
      areaList,
      moneyType: "余额",
      columns: [
        // 第一列
        {
          values: ["今天", "明天"],
          defaultIndex: 0
        },
        // 第二列
        {
          values: [],
          defaultIndex: 0
        }
      ],
      selectTime: "", //配送时间
      moneyColumns: [
        {
          values: ["余额"],
          defaultIndex: 0
        }
      ]
    };
  },
  activated() {
    this.getaddress();
  },
  computed: {
    ...mapGetters([
      "price",
      "count",
      "imgicon",
      "address",
      "chosenAddressId",
      "addressinfo",
      "selectshop"
    ]),

    allprice() {
      return (this.price + this.Delivery) * 100;
    }
  },
  watch: {
    chosenAddressId(newVal) {
      this.address.forEach(item => {
        if (newVal == item.id) {
          this.SET_ADDRESSINFO(item);
          return;
        }
      });
    }
  },
  methods: {
    selectaddress() {
      this.$router.push("/Address");
    },
    selectreturn() {
      this.$router.go(-1);
    },
    getaddress() {
      axios
        .get("api/index/searchAddress", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          let data = res.data.data;
          data.forEach(item => {
            item.name = item.address_name;
            item.tel = item.address_phone;
            item.province = item.address_province;
            item.city = item.address_city;
            item.county = item.address_county;
            item.areaCode = item.address_areacode;
            item.address = `${item.address_province}${item.address_city}${item.address_county}${item.address_addressDetail}`;
            item.addressDetail = item.address_addressDetail;
          });
          this.SET_ADDRESS(data);
        });
    },
    showPopup() {
      this.getTodayTime();
      this.show = true;
    },
    selectconfirm(val) {
      this.selectTime = val;
      this.show = false;
    },
    selectMoney() {
      this.moneyShow = true;
    },
    moneyOnConfirm(val) {
      this.moneyType = val[0];
      this.moneyShow = false;
    },
    changeToday(picker, values) {
      if (values[0] == "明天") {
        let arr = this.columns;
        arr[1].values = [];
        let hour = 7;
        while (hour < 23) {
          arr[1].values.push(`${hour}:00~${hour}:29`);
          arr[1].values.push(`${hour}:30~${hour}:59`);
          hour++;
        }
      } else {
        this.getTodayTime();
      }
    },
    getTodayTime() {
      let arr = this.columns;
      let date = new Date();
      arr[1].values = [];
      let hour = date.getHours();
      let minu = date.getMinutes() + 30;
      let minus = minu;
      if (minu > 60) {
        hour++;
        minu -= 60;
      }
      if (minu > 0 && minu < 30) {
        minu = 0 + "0";
      } else {
        minus = 59;
        minu = 30;
      }
      minu = minu / 10 + "0";
      while (hour < 24) {
        arr[1].values.push(`${hour}:${minu}~${hour}:${minus}`);
        if (minus == 59) {
          hour++;
          arr[1].values.push(`${hour}:00~${hour}:29`);
        } else {
          arr[1].values.push(`${hour}:30~${hour}:59`);
          hour++;
        }
      }
    },
    selectsub() {
      if (Object.keys(this.addressinfo).length === 0) {
        this.$router.push("/Address");
        return;
      }
      if (!this.selectTime.length) {
        this.showPopup();
        return;
      }
      this.axiosPostList();
    },
    axiosPostList() {
      let list = [];
      let i = 0;
      this.selectshop.forEach(item => {
        list[i] = {};
        list[i].name = item.name;
        list[i].number = item.count;
        list[i].url = item.propaganda.url;
        list[i].price = item.price;
        list[i].checkeds = true;
        list[i].val = 0;
        i++;
      });

      this.axiosPostaddOrder(list).then(res => {
        let data = res.data.data;
        this.$dialog
          .confirm({
            title: "叮咚买菜",
            message: "￥" + (this.price + this.Delivery),
            confirmButtonText: "确认支付",
            cancelButtonText: "取消支付",
            confirmButtonColor: "green",
            cancelButtonColor: "green"
          })
          .then(() => {
            this.axiosPostaddPays(data).then(() => {
              this.$dialog({
                message: "支付成功！"
              });
              this.$router.push("/My");
            });
          })
          .catch(() => {
            this.$dialog({
              message: "取消成功，订单已在待支付中喔~"
            });
            this.$router.push("/My");
          });
      });
    },
    axiosPostaddOrder(list) {
      return new Promise(resolve => {
        axios
          .post(
            "api/index/addOrder",
            {
              order_address: {
                id: this.addressinfo.id,
                tel: this.addressinfo.tel,
                name: this.addressinfo.name,
                address: this.addressinfo.address
              },
              order_time: this.selectTime[0] + this.selectTime[1],
              order_order: list,
              order_price: this.price,
              order_delivery: this.Delivery,
              order_payment: this.moneyType,
              allPrice: this.price + this.Delivery
            },
            {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }
          )
          .then(res => {
            resolve(res);
          });
      });
    },
    axiosPostaddPays(data) {
      return new Promise(resolve => {
        axios
          .post(
            "api/index/addPays",
            {
              id: data.id,
              price: data.price
            },
            {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }
          )
          .then(() => {
            resolve();
          });
      });
    },
    ...mapMutations({
      SET_ADDRESS: "SET_ADDRESS",
      SET_ADDRESSINFO: "SET_ADDRESSINFO"
    })
  }
};
</script>
<style lang="stylus" scoped>
.tab {
  background-color: rgb(248, 248, 248);
  color: rgb(0, 0, 0);

  .van-nav-bar__title {
    font-weight: 700;
  }

  .van-icon-arrow-left {
    font-size: 0.62rem;
  }
}

.home {
  height: 2rem;

  .van-nav-bar__left, .van-nav-bar__right {
    height: 2rem;
    line-height: 2rem;
    font-size: 0.613333rem;

    .address-header {
      height: 100%;
      display: flex;
      flex-direction: column;

      span {
        height: 1.066667rem;
        line-height: 1.2rem;
        color: #131313;
        font-size: 0.4rem;
        font-weight: 600;
      }

      .address-body {
        display: flex;

        span {
          height: 1.126667rem;
          line-height: 0.533333rem;
          font-weight: 1;
        }
      }
    }

    span {
      margin-left: 0.266667rem;
      font-size: 0.4rem;
    }

    .van-icon-arrow {
      font-size: 0.4rem;
      color: #aaa !important;
    }
  }
}

.item {
  .van-nav-bar__left .van-nav-bar__text {
    color: black;
  }

  .van-nav-bar__right {
    color: #23884c;
    font-size: 0.346667rem;
    display: flex;
    align-items: center;
  }

  input {
    border: 0;
    width: 110%;
    padding: 0;
    margin-bottom: 0.8rem;
  }
}

.shop {
  height: 2.266667rem;
  margin-bottom: 0.266667rem;

  .van-nav-bar__right {
    height: 100%;
  }

  .van-nav-bar__left {
    height: 100%;

    .img-con {
      width: 7.066667rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: 100%;

      .img-item {
        width: 0.88rem;
        height: 0.88rem;
        margin-right: 0.566667rem;
        flex-shrink: 0;

        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}

.order-hr {
  width: 100%;
  height: 0.133333rem;
  margin-bottom: 0.266667rem;
  background-image: repeating-linear-gradient(-45deg, #fd3ff7, #fd3ff7 5%, #fff 0, #fff 10%, #367dff 0, #367dff 15%, #fff 0, #fff 20%);
}
</style>