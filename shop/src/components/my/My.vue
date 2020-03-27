<template>
  <div class="my">
    <div class="header">
      <div class="header-img">
        <img :src="this.user.image" />
      </div>
      <div class="header-con">
        <span>会员号：{{this.user.id}}</span>
        <span>手机号:{{this.user.phone}}</span>
      </div>
      <div class="cuIcon-right"></div>
    </div>
    <div class="Card">
      <div class="card-con">
        <span class="num">0</span>
        <span>优惠券</span>
      </div>
      <div class="card-con">
        <span class="num">{{this.user.integral}}</span>
        <span>积分</span>
      </div>
      <div class="card-con">
        <span class="num">{{this.user.money}}</span>
        <span>余额</span>
      </div>
    </div>
    <div class="Tab">
      <div class="tab-header" @click.stop="selectItem(0)">
        <div class="tab-left">
          <div class="cuIcon-edit"></div>
          <span>我的订单</span>
        </div>
        <div class="tab-right">
          <span>查看全部订单</span>
          <div class="cuIcon-right"></div>
        </div>
      </div>
      <div class="tab-body">
        <div class="tab-con">
          <van-icon class-prefix="cuIcon-pay" @click.stop="selectItem(1)" :badge="nopaid" />
          <span>待支付</span>
        </div>
        <div class="tab-con">
          <van-icon class-prefix="cuIcon-send" @click.stop="selectItem(2)" :badge="noship" />
          <span>待发货</span>
        </div>
        <div class="tab-con">
          <van-icon class-prefix="cuIcon-deliver" @click.stop="selectItem(3)" badg />
          <span>待收货</span>
        </div>
        <div class="tab-con">
          <van-icon class-prefix="cuIcon-comment" @click.stop="selectItem(4)" badg />
          <span>待评价</span>
        </div>
        <div class="tab-con">
          <van-icon class-prefix="cuIcon-sponsor" @click.stop="selectItem(5)" badge />
          <span>退款</span>
        </div>
      </div>
    </div>
    <div class="item-con">
      <div class="item">
        <div class="cuIcon-friendaddfill"></div>
        <div class="text">邀请好友</div>
        <div class="cuIcon-right"></div>
      </div>
      <router-link :to="{path:'/Address'}">
        <div class="item">
          <div class="cuIcon-addressbook"></div>
          <div class="text">收货地址</div>
          <div class="cuIcon-right"></div>
        </div>
      </router-link>
    </div>
    <div class="item">
      <div class="cuIcon-card"></div>
      <div class="text">我的绿卡</div>
      <div class="cuIcon-right"></div>
    </div>
    <div class="item-con">
      <div class="item">
        <div class="cuIcon-dianhua"></div>
        <div class="text">联系电话</div>
        <div class="cuIcon-right"></div>
      </div>
      <div class="item">
        <div class="cuIcon-commentfill"></div>
        <div class="text">意见反馈</div>
        <div class="cuIcon-right"></div>
      </div>
    </div>
    <div class="item">
      <div class="cuIcon-infofill"></div>
      <div class="text">关于</div>
      <div class="cuIcon-right"></div>
    </div>
    <div class="footer">
      <span>当前版本：1.0</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return { user: {}, aa: {}, nopaid: "", noship: "" };
  },
  activated() {
    this.getLogin();
  },
  methods: {
    getHome() {
      axios
        .get("api/index/getHome", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.nopaid = "";
          this.noship = "";
          let list = res.data.data.userList;
          let orderlist = res.data.data.orderNumber;
          for (let key in list) {
            this.$set(this.user, key, list[key]);
          }
          orderlist.forEach(item => {
            if (item.order_states == 1) {
              this.nopaid++;
            }
            if (item.order_states == 2) {
              this.noship++;
            }
          });
        });
    },
    getLogin() {
      if (localStorage.getItem("token")) {
        this.getHome();
      } else {
        this.$dialog
          .confirm({
            title: "温馨提示",
            message: "你还没有登录，现在去登陆？"
          })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            this.$router.push("/");
          });
      }
    },
    selectItem(index) {
      this.$router.push({ path: "/Allorder", query: { id: index } });
    }
  }
};
</script>
<style lang="stylus" scoped>
.my {
  height: 100%;
  width: 100%;

  .header {
    display: flex;
    justify-content: center;
    padding: 22px;
    box-sizing: border-box;
    width: 100%;
    background: #3bba63;

    .header-img {
      width: 60px;
      height: 100%;
      box-sizing: border-box;
      margin-right: 20px;
      border-radius: 30px;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .header-con {
      display: flex;
      padding: 10px;
      flex: 1;
      flex-direction: column;
      font-size: 13px;
      color: #fff;

      span {
        margin-bottom: 10px;
      }
    }

    .cuIcon-right {
      text-align: center;
      line-height: 59px;
      color: #fff;
      font-size: 20px;
    }
  }

  .Card {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 75px;
    background: #fff;

    .card-con {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      width: 1249px;
      height: 75px;
      justify-content: center;
      align-items: center;

      span {
        margin-bottom: 5px;
      }

      .num {
        font-weight: 700;
        color: #322f30;
      }
    }
  }

  .Tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 140px;
    background: #fff;
    padding: 5px 12px 5px 12px;
    margin-top: 9.5px;
    box-sizing: border-box;

    .tab-con {
      color: #878787;
      font-size: 33.75px;
    }

    .tab-header {
      display: flex;
      border-bottom: 1px solid #ebebeb;
      width: 100%;
      height: 47px;
      justify-content: space-between;
      margin-top: 5px;

      .tab-left {
        display: flex;

        span {
          color: #0f0f0f;
          font-size: 12px;
        }

        .cuIcon-edit {
          color: #ffd944;
          font-size: 18px;
          font-weight: 900;
          margin-right: 9.5px;
        }
      }

      .tab-right {
        display: flex;

        span {
          color: #909090;
          margin-right: 5px;
          font-size: 12px;
        }

        .cuIcon-right {
          color: #c6c6c6;
          font-size: 12px;
        }
      }
    }

    .tab-body {
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: center;
      position: relative;
      top: 9.5px;

      .tab-con {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        align-items: center;
        height: 90px;

        .van-info {
          top: 9.75px;
          right: 12px;
        }

        span {
          width: 100%;
          height: 38px;
          line-height: 30px;
          color: #131313;
          font-size: 13px;
          text-align: center;
        }
      }
    }
  }

  .item-con {
    margin-top: 9.5px;
    margin-bottom: 12px;

    .item {
      display: flex;
      justify-content: center;
      height: 48px;
      background-color: white;
      align-items: center;
      padding: 0 20px;

      .cuIcon-friendaddfill, .cuIcon-addressbook, .cuIcon-dianhua, .cuIcon-commentfill {
        font-size: 18px;
        margin-right: 9.5px;
        color: #fec535;
      }

      .cuIcon-dianhua {
        color: rgb(118, 211, 72);
      }

      .cuIcon-commentfill {
        color: rgb(254, 197, 53);
      }

      .text {
        color: #8799a3;
        font-size: 12px;
        flex: 1;
      }

      .cuIcon-right {
        font-size: 17px;
      }
    }
  }

  .item {
    display: flex;
    justify-content: center;
    height: 48px;
    background-color: white;
    align-items: center;
    padding: 0 20px;

    .cuIcon-card, .cuIcon-infofill {
      color: rgb(254, 197, 53);
      font-size: 18px;
      margin-right: 9.5px;
      color: rgb(118, 211, 72);
    }

    .cuIcon-infofill {
      color: rgb(0, 148, 60);
    }

    .text {
      color: #8799a3;
      font-size: 12px;
      flex: 1;
    }

    .cuIcon-right {
      font-size: 17px;
    }
  }

  .footer {
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 9.5px;
    line-height: 60px;
    color: #999;
  }
}
</style>