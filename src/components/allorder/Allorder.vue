<template>
  <div class="Allorder">
    <van-nav-bar class="tab" @click-left="selectreturn" title="叮当买菜" left-arrow />
    <van-tabs swipeable animated duration=".6" v-model="count">
      <van-tab :title="tab[0]">
        <div :key="index" class="bar-item" v-for="(item,index) in allList">
          <van-nav-bar :left-text="item.order_createtime">
            <template #right>
              <span>{{tab[0]}}</span>
            </template>
          </van-nav-bar>
          <van-nav-bar class="shop">
            <template #left>
              <div class="img-con">
                <div class="img-item" :key="index" v-for="(items,index) in item.order_order">
                  <img :src="items.url" />
                </div>
              </div>
            </template>
            <template #right>
              <span>¥{{item.order_order[0].price}}</span>
            </template>
          </van-nav-bar>
          <van-nav-bar>
            <template #right>
              <span>共份{{item.order_order[0].number}}商品，实付{{Math.floor( (Number(item.order_price)+Number(item.order_delivery))* 100) / 100}}元</span>
            </template>
          </van-nav-bar>
        </div>
      </van-tab>
      <van-tab :title="tab[1]">
        <div :key="index" class="bar-item" v-for="(item,index) in nopaidList">
          <van-nav-bar :left-text="item.order_createtime">
            <template #right>
              <span>{{tab[1]}}</span>
            </template>
          </van-nav-bar>
          <van-nav-bar class="shop">
            <template #left>
              <div class="img-con">
                <div class="img-item" :key="index" v-for="(items,index) in item.order_order">
                  <img :src="items.url" />
                </div>
              </div>
            </template>
            <template #right>
              <span>¥{{item.order_order[0].price}}</span>
            </template>
          </van-nav-bar>
          <van-nav-bar>
            <template #right>
              <span>共份{{item.order_order[0].number}}商品，实付{{Math.floor( (Number(item.order_price)+Number(item.order_delivery))* 100) / 100}}元</span>
            </template>
          </van-nav-bar>
        </div>
      </van-tab>
      <van-tab :title="tab[2]">
        <div :key="index" class="bar-item" v-for="(item,index) in noshipList">
          <van-nav-bar :left-text="item.order_createtime">
            <template #right>
              <span>{{tab[2]}}</span>
            </template>
          </van-nav-bar>
          <van-nav-bar class="shop">
            <template #left>
              <div class="img-con">
                <div class="img-item" :key="index" v-for="(items,index) in item.order_order">
                  <img :src="items.url" />
                </div>
              </div>
            </template>
            <template #right>
              <span>¥{{item.order_order[0].price}}</span>
            </template>
          </van-nav-bar>
          <van-nav-bar>
            <template #right>
              <span>共份{{item.order_order[0].number}}商品，实付{{Math.floor( (Number(item.order_price)+Number(item.order_delivery))* 100) / 100}}元</span>
            </template>
          </van-nav-bar>
        </div>
      </van-tab>
      <van-tab :title="tab[3]"></van-tab>
      <van-tab :title="tab[4]"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      active: "",
      tab: ["全部", "待支付", "待发货", "待收货", "待评价"],
      nopaidList: [],
      noshipList: [],
      allList: [],
      count: ""
    };
  },
  activated() {
    this.getOrderList().then(res => {
      this.nopaidList = [];
      this.noshipList = [];
      this.allList = [];
      let list = res.data.data;
      list.forEach(item => {
        item.order_order = JSON.parse(item.order_order);
        if (item.order_states == 1) {
          this.nopaidList.push(item);
        }
        if (item.order_states == 2) {
          this.noshipList.push(item);
        }
        this.allList.push(item);
      });
    });
    if (this.$route.query.id) {
      this.count = this.$route.query.id;
    }
  },
  methods: {
    selectreturn() {
      this.$router.go(-1);
    },
    getOrderList() {
      return new Promise(resolve => {
        axios
          .post(
            "api/index/getOrderAlls",
            {
              page: 1,
              pageSize: 10
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
    }
  }
};
</script>
<style lang="stylus" scoped>
.Allorder>>>.van-tab {
  flex: 1;
}

.Allorder>>>.bar-item {
  margin-top: 0.333333rem;
}

.shop {
  height: 2.266667rem;
  margin-bottom: 0.266667rem;
  background: #f5f5f5;

  .van-nav-bar__right {
    height: 100%;
    display: flex;
    align-items: center;
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
        width: 1.48rem;
        height: 1.48rem;
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
</style>
