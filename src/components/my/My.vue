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
    padding: 0.586667rem;
    box-sizing: border-box;
    width: 100%;
    background: #3bba63;

    .header-img {
      width: 1.6rem;
      height: 100%;
      box-sizing: border-box;
      margin-right: .533333rem;
      border-radius: 0.8rem;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .header-con {
      display: flex;
      padding: .133333rem;
      flex: 1;
      flex-direction: column;
      font-size: 0.346667rem;
      color: #fff;

      span {
        margin-bottom: 0.4rem;
      }
    }

    .cuIcon-right {
      width: 1.12rem;
      text-align: center;
      line-height: 1.573333rem;
      color: #fff;
      font-size: 0.533333rem;
    }
  }

  .Card {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 2rem;
    background: #fff;

    .card-con {
      display: flex;
      flex-direction: column;
      font-size: 0.32rem;
      width: 12.133333rem;
      height: 2rem;
      justify-content: center;
      align-items: center;

      span {
        margin-bottom: 0.133333rem;
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
    height: 3.733333rem;
    background: #fff;
    padding: 0.133333rem 0.4rem 0.133333rem 0.4rem;
    margin-top: 0.266667rem;
    box-sizing: border-box;

    .tab-con {
      color: #878787;
      font-size: 0.9rem;
    }

    .tab-header {
      display: flex;
      border-bottom: 1px solid #ebebeb;
      width: 100%;
      height: 1.253333rem;
      justify-content: space-between;
      margin-top: 0.133333rem;

      .tab-left {
        display: flex;

        span {
          color: #0f0f0f;
          font-size: 0.4rem;
        }

        .cuIcon-edit {
          color: #ffd944;
          font-size: 0.48rem;
          font-weight: 900;
          margin-right: 0.266667rem;
        }
      }

      .tab-right {
        display: flex;

        span {
          color: #909090;
          margin-right: 0.133333rem;
          font-size: 0.32rem;
        }

        .cuIcon-right {
          color: #c6c6c6;
          font-size: 0.4rem;
        }
      }
    }

    .tab-body {
      width: 100%;
      height: 2.4rem;
      display: flex;
      justify-content: center;
      position: relative;
      top: 0.266667rem;

      .tab-con {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        align-items: center;
        height: 2.4rem;

        .van-info {
          top: .266667rem;
          right: .4rem;
        }

        span {
          width: 100%;
          height: 1.013333rem;
          line-height: 0.8rem;
          color: #131313;
          font-size: 0.346667rem;
          text-align: center;
        }
      }
    }
  }

  .item-con {
    margin-top: 0.266667rem;
    margin-bottom: 0.4rem;

    .item {
      display: flex;
      justify-content: center;
      height: 1.333333rem;
      background-color: white;
      align-items: center;
      padding: 0 0.533333rem;

      .cuIcon-friendaddfill, .cuIcon-addressbook, .cuIcon-dianhua, .cuIcon-commentfill {
        font-size: 0.48rem;
        margin-right: 0.266667rem;
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
        font-size: 0.4rem;
        flex: 1;
      }

      .cuIcon-right {
        font-size: 0.453333rem;
      }
    }
  }

  .item {
    display: flex;
    justify-content: center;
    height: 1.333333rem;
    background-color: white;
    align-items: center;
    padding: 0 0.533333rem;

    .cuIcon-card, .cuIcon-infofill {
      color: rgb(254, 197, 53);
      font-size: 0.48rem;
      margin-right: 0.266667rem;
      color: rgb(118, 211, 72);
    }

    .cuIcon-infofill {
      color: rgb(0, 148, 60);
    }

    .text {
      color: #8799a3;
      font-size: 0.4rem;
      flex: 1;
    }

    .cuIcon-right {
      font-size: 0.453333rem;
    }
  }

  .footer {
    width: 100%;
    height: 3.133333rem;
    text-align: center;
    font-size: 0.266667rem;
    line-height: 2.133333rem;
    color: #999;
  }
}
</style>