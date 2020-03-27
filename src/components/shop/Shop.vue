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
      allselect: false //全选按钮是否选中
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
          this.$forceUpdate();
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
    padding: 0.186667rem 0.08rem;

    span {
      display: flex;
      font-weight: 700;
      font-size: 0.426667rem;
      line-height: 0.8rem;
      text-align: center;
      justify-content: center;
    }
  }

  .buy-list {
    margin-top: 1.5rem;

    .buy-list-item {
      display: flex;
      background: #fff;
      height: 2.666667rem;
      align-items: center;
      border-bottom: 1px solid #efefef;
      padding: 0 0.133333rem 0 0.266667rem;

      .cuIcon-round, .cuIcon-roundcheckfill {
        font-size: 0.533333rem;
        width: 1.2rem;
      }

      .img {
        width: 1.92rem;
        height: 2.026667rem;

        img {
          width: 100%;
          height: 100%;
          margin-left: -0.266667rem;
        }
      }

      .right {
        width: 6.666667rem;
        height: 2.666667rem;
        padding: 0.266667rem 0.133333rem 0 0;

        span {
          display: block;
          width: 100%;
          height: 0.613333rem;
          line-height: 0.613333rem;
          font-size: 0.32rem;
          color: #262626;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .right-bottom {
          width: 100%;
          height: 0.586667rem;

          span {
            height: 0.586667rem;
            font-weight: 700;
            font-size: 0.346667rem;
            color: #212121;
          }

          .count {
            display: flex;
            justify-content: center;
            width: 1.866667rem;
            height: 0.586667rem;
            position: relative;
            left: 75%;
            top: -220%;

            .cuIcon-add, .cuIcon-more {
              color: #aaa;
            }

            .count-num {
              width: 1.013333rem;
              height: 0.586667rem;
              font-size: 0.4rem;
              text-align: center;
              line-height: 0.586667rem;
              display: inline-block;
              background: #f9f9f9;
              color: #1b1b1b;
              margin-left: -0.4rem;
            }
          }
        }
      }
    }
  }

  .body {
    width: 100%;
    background: #f5f5f5;
    padding-top: 1.5rem;
    box-sizing: border-box;
    height: 12rem;

    .body-car-img {
      margin-top: 1.5rem;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .body-look {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 4rem;
      height: 1.066667rem;
      border-radius: 0.533333rem;
      color: #fff;
      background: #45c763;
      text-align: center;
      line-height: 1.066667rem;
      font-size: 0.48rem;
      margin-top: 1rem;
    }
  }

  .body-like {
    font-size: 0.4rem;
    display: inline-block;
    text-align: center;
    width: 100%;

    .cuIcon-title {
      color: #585858;
    }

    span {
      width: 100%;
      height: 0.96rem;
      padding-top: 0.133333rem;
      line-height: 0.826667rem;
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
    height: 1.333333rem;
    background-color: #fff;
    align-items: center;

    .cuIcon {
      height: 0.933333rem;
      display: flex;
      flex-direction: column;
      position: relative;
      left: 0.8rem;

      .cuIcon-round, .cuIcon-roundcheckfill {
        font-size: 0.533333rem;
      }

      span {
        font-size: 0.293333rem;
      }
    }

    .price {
      font-size: 0.373333rem;
      position: relative;
      left: 4.333333rem;
      width: 2.666667rem;
    }

    .btn {
      position: relative;
      left: 55%;
      transform: translateX(-70%);
      width: 1.8rem;
      height: 0.9rem;
      border-radius: 0.833333rem;
      background-color: #e54d42;
      color: #fff;
      text-align: center;
      line-height: 1.066667rem;
      font-size: 0.48rem;
      font-size: 0.373333rem;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-size: 0.373333rem;
      }
    }
  }
}
</style>