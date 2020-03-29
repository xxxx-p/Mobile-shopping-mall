<template>
  <div class="shop">
    <div class="header">
      <span>购物车</span>
    </div>
    <div class="buy-list">
      <div
        v-show="buylist.length"
        :key="index"
        v-for="(item,index) in buylist"
        class="buy-list-item"
      >
        <div
          :class="!select[index]?'cuIcon-round':'cuIcon-roundcheckfill text-blue'"
          @click="selectbuy(index)"
        ></div>
        <div class="img">
          <img :src="item.propaganda.url" />
        </div>
        <div class="right">
          <span>{{item.name}}</span>
          <div class="right-bottom">
            <span>{{item.price}}</span>
            <div class="count">
              <span class="cuIcon-move" @click="movecount(index)"></span>
              <div class="count-num">{{item.count}}</div>
              <span class="cuIcon-add" @click="addcount(index)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!buylist.length" class="body">
      <img class="body-car-img" src="../../assets/imgs/car.png" />
      <div class="body-look">去逛逛</div>
    </div>
    <div class="body-like">
      <span class="cuIcon-title"></span>
      <span>猜你喜欢</span>
      <span class="cuIcon-title"></span>
    </div>
    <shop-tab @selebuy="selebuycom" class="shop-tab" :list="list"></shop-tab>
    <div class="body-bottom">
      <div class="cuIcon">
        <div
          :class="!allselect?'cuIcon-round':'cuIcon-roundcheckfill text-blue'"
          @click="selectAllbuy"
        ></div>
        <span>全选</span>
      </div>
      <span class="price">合计:{{price}}元</span>
      <div class="btn">
        <span @click="Settlement">去结算</span>
      </div>
    </div>
  </div>
</template>
<script>
import ShopTab from "../../common/Shop-tab/Shop-tab";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [],
      allselect: false, //全选按钮是否选中
      scroll: 0
    };
  },
  computed: {
    ...mapGetters(["buylist", "select", "price", "count", "imgicon"])
  },
  components: {
    ShopTab
  },
  created() {
    this.getlike();
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  activated() {
    this.setScroll();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    select() {
      this.CalculationPrice();
      this.allselectFun();
    },
    buylist() {
      this.CalculationPrice();
    }
  },
  methods: {
    getlike() {
      axios
        .get("api/nottoken/getBuyGoods", {
          params: {
            current: 1,
            pageSize: 10
          }
        })
        .then(res => {
          let data = res.data.data;
          data.map(item => {
            item.propaganda = JSON.parse(
              item.propaganda.substr(1, item.propaganda.toString().length - 2)
            );
          });
          this.list = data;
        });
    },
    selebuycom(item) {
      let list = this.buylist;
      let select = this.select;
      let sign = true;
      list.forEach((items, index) => {
        if (items.id == item.id) {
          items.count++;
          list.splice(index, 1, list[index]);
          this.SET_BUYLIST(list);
          sign = false;
          return;
        }
      });
      if (sign) {
        item.count = 1;
        select.splice(select.length, 1, false);
        this.SET_SELECT(select);
        list.push(item);
        this.SET_BUYLIST(list);
      }
      this.$toast.success("收藏成功");
    },
    movecount(index) {
      let list = this.buylist;
      let sele = this.select;
      if (list[index].count > 0) {
        list[index].count--;
        if (list[index].count == 0) {
          sele.splice(index, 1);
          this.SET_SELECT(sele);
          list.splice(index, 1);
          this.SET_BUYLIST(list);
        } else {
          list.splice(index, 1, list[index]);
          this.SET_BUYLIST(list);
        }
      }
    },
    addcount(index) {
      let list = this.buylist;
      list[index].count++;
      list.splice(index, 1, list[index]);
      this.SET_BUYLIST(list);
    },
    selectbuy(index) {
      let list = this.select;
      list.splice(index, 1, !list[index]);
      this.SET_SELECT(list);
      let arr = this.select.filter(item => item == true);
      if (arr.length == this.select.length) {
        this.allselect = true;
      } else {
        this.allselect = false;
      }
    },
    selectAllbuy() {
      let list = this.select;
      let select = false;
      let allselect = false;
      let allnoselect = false;
      let arr = this.select.filter(item => item == true);
      if (arr.length == this.select.length) {
        allnoselect = true;
      } else if (arr.length > 0) {
        select = true;
      } else {
        allselect = true;
      }
      if (allnoselect) {
        for (let i = 0; i < list.length; i++) {
          list.splice(i, 1, false);
          this.allselect = false;
        }
      }
      if (select) {
        for (let i = 0; i < list.length; i++) {
          list.splice(i, 1, true);
          this.allselect = true;
        }
      }
      if (allselect) {
        for (let i = 0; i < list.length; i++) {
          list.splice(i, 1, true);
          this.allselect = true;
        }
      }
      this.SET_SELECT(list);
    },
    CalculationPrice() {
      let list = this.select;
      let price = 0;
      let count = 0;
      let imgicon = []; //购物车选中的图片
      let shoplist = []; //购物车选中的商品全部信息
      list.forEach((item, index) => {
        if (item == true) {
          price +=
            Number(this.buylist[index].price) *
            Number(this.buylist[index].count);
          count += this.buylist[index].count;
          imgicon.push(this.buylist[index].propaganda.url);
          shoplist.push(this.buylist[index]);
        }
      });
      this.SET_PRICE(Math.floor(price * 100) / 100);
      this.SET_COUNT(count);
      this.SET_IMGICON(imgicon);
      this.SET_SELECTSHOP(shoplist);
    },
    allselectFun() {
      let list = this.select;
      let sigh = true;
      list.forEach(item => {
        if (item == false) {
          sigh = false;
          return;
        }
      });
      if (!sigh) {
        this.allselect = false;
      }
    },
    Settlement() {
      if (this.price > 0) {
        this.$router.push("/Settlement");
      } else {
        this.$toast("请先选择商品");
      }
    },
    setScroll() {
      if (this.scroll > 0) {
        window.scrollTo(0, this.scroll);
        this.scroll = 0;
        window.addEventListener("scroll", this.handleScroll);
      }
    },
    handleScroll() {
      this.scroll =
        document.documentElement && document.documentElement.scrollTop;
    },
    ...mapMutations({
      SET_BUYLIST: "SET_BUYLIST",
      SET_SELECT: "SET_SELECT",
      SET_PRICE: "SET_PRICE",
      SET_COUNT: "SET_COUNT",
      SET_IMGICON: "SET_IMGICON",
      SET_SELECTSHOP: "SET_SELECTSHOP"
    })
  }
};
</script>
<style lang="stylus" scoped>
.shop {
  width: 100%;
  height: 100%;

  .header {
    position: fixed;
    width: 100%;
    background-color: rgb(248, 248, 248);
    left: 0;
    top: 0;
    padding: 6.75px 3px;

    span {
      display: flex;
      font-weight: 700;
      font-size: 15px;
      line-height: 30px;
      text-align: center;
      justify-content: center;
    }
  }

  .buy-list {
    margin-top: 56px;

    .buy-list-item {
      display: flex;
      background: #fff;
      height: 98px;
      align-items: center;
      border-bottom: 1px solid #efefef;
      padding: 0 5px 0 9.5px;

      .cuIcon-round, .cuIcon-roundcheckfill {
        font-size: 20px;
        width: 45px;
      }

      .img {
        width: 72px;
        height: 75px;

        img {
          width: 100%;
          height: 100%;
          margin-left: -9.5px;
        }
      }

      .right {
        width: 250px;
        height: 98px;
        padding: 9.5px 5px 0 0;

        span {
          display: block;
          width: 100%;
          height: 23px;
          line-height: 23px;
          font-size: 12px;
          color: #262626;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .right-bottom {
          width: 100%;
          height: 22px;

          span {
            height: 22px;
            font-weight: 700;
            font-size: 13px;
            color: #212121;
          }

          .count {
            display: flex;
            justify-content: center;
            width: 70px;
            height: 22px;
            position: relative;
            left: 75%;
            top: -220%;

            .cuIcon-add, .cuIcon-more {
              color: #aaa;
            }

            .count-num {
              width: 38px;
              height: 22px;
              flex-shrink: 0;
              font-size: 15px;
              text-align: center;
              line-height: 22px;
              display: inline-block;
              background: #f9f9f9;
              color: #1b1b1b;
              margin-left: -0.15px;
            }
          }
        }
      }
    }
  }

  .body {
    width: 100%;
    background: #f5f5f5;
    padding-top: 56px;
    box-sizing: border-box;
    height: 430px;

    .body-car-img {
      margin-top: 56px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .body-look {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 40px;
      border-radius: 20px;
      color: #fff;
      background: #45c763;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      margin-top: 37.5px;
    }
  }

  .body-like {
    font-size: 15px;
    text-align: center;
    width: 100%;

    .cuIcon-title {
      color: #585858;
    }

    span {
      width: 100%;
      height: 37px;
      padding-top: 5px;
      line-height: 37px;
      color: #0a0a0a;
    }
  }

  .shop-tab {
    margin-bottom: 35%;
  }

  .body-bottom {
    display: flex;
    position: fixed;
    bottom: 9%;
    left: 0;
    width: 100%;
    height: 48px;
    background-color: #fff;
    align-items: center;

    .cuIcon {
      height: 35px;
      display: flex;
      flex-direction: column;
      position: relative;
      left: 30px;

      .cuIcon-round, .cuIcon-roundcheckfill {
        font-size: 20px;
      }

      span {
        font-size: 11px;
      }
    }

    .price {
      font-size: 14px;
      position: relative;
      left: 162px;
      width: 98px;
    }

    .btn {
      position: relative;
      left: 55%;
      transform: translateX(-70%);
      width: 67.5px;
      height: 33.75px;
      border-radius: 31px;
      background-color: #e54d42;
      color: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-size: 14px;
      }
    }
  }
}
</style>