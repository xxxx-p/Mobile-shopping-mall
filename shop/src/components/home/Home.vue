<template>
  <div class="home">
    <Search></Search>
    <swiper :options="swiperOption">
      <swiperSlide class="img-swip" :key="index" v-for="(item,index) in swiplist">
        <img class="img" :src="item.url" />
      </swiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="nav">
      <div class="nav-item" :key="index" v-for="(item,index) in navclass">
        <img class="nav-img" :classId="item.id" @click="selectTab" :src="item.image.url" />
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="vipcar">
      <div class="cuIcon-crownfill"></div>
      <span class="vip-text-left">
        加入绿卡会员
        <span class="cuIcon-title"></span>预计每月省806元
      </span>
      <span class="vip-text-left vip-text-right">
        五折开卡
        <span class="cuIcon-right"></span>
      </span>
    </div>
    <div class="today-tab">
      <span class="cuIcon-titles"></span>
      <span class="text">今日疯抢</span>
      <div class="time">
        <div class="time-item">{{hour}}</div>
        <span>:</span>
        <div class="time-item">{{minutes}}</div>
        <span>:</span>
        <div class="time-item">{{sec}}</div>
      </div>
    </div>
    <div class="today-con">
      <div class="today-con-con">
        <div class="today-con-item" :key="index" v-for="(item,index) in Insane">
          <div class="con-img">
            <img :src="item.propaganda.url" />
          </div>
          <span class="con-text">{{item.name}}</span>
          <div class="con-bottom">
            <div class="con-price">
              <span class="vip-price">{{item.vip_price>0?item.vip_price:item.price}}</span>
              <s v-show="item.vip_price>0" class="price">{{item.price}}</s>
            </div>
            <div @click="selebuy(index)" class="cuIcon-cart-con">
              <div class="cuIcon-cart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="today-tab">
      <span class="cuIcon-titles"></span>
      <span class="text">猜你喜欢</span>
    </div>
    <Shoptab @selebuy="selebuycom" :list="likelist"></Shoptab>
  </div>
</template>
<script>
import Search from "../../common/Search/Search";
import Shoptab from "../../common/Shop-tab/Shop-tab";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      swiperOption: {
        autoplay: { delay: 2000 },
        height: 0,
        pagination: { el: ".swiper-pagination" }
      },
      swiplist: [],
      navclass: [],
      Insane: [],
      likelist: [],
      hour: "",
      minutes: "",
      sec: ""
    };
  },
  computed: {
    ...mapGetters(["classId", "buylist", "select"])
  },
  components: { Search, swiper, swiperSlide, Shoptab },
  activated() {
    this.time();
    this.getSwipers();
    this.getOneClass();
    this.getInsane();
    this.gethomeLive(1, 10);
  },
  methods: {
    time() {
      setInterval(() => {
        let date = new Date();
        if (date.getMinutes() > 0) {
          this.hour =
            24 - date.getHours() - 1 > 10
              ? 24 - date.getHours() - 1
              : "0" + (24 - date.getHours() - 1);
        } else {
          this.hour = 24 - date.getHours();
        }
        if (date.getSeconds() > 0) {
          this.minutes = 60 - date.getMinutes() - 1;
        } else {
          this.minutes = 60 - date.getMinutes();
        }
        this.sec =
          60 - date.getSeconds() > 10
            ? 60 - date.getSeconds()
            : "0" + (60 - date.getSeconds());
      }, 0);
    },
    selectTab(e) {
      let id = e.target.getAttribute("classId");
      this.$router.push({ path: "/Classification", query: { id: id } });
    },
    getSwipers() {
      axios.get("api/nottoken/getSwipers").then(res => {
        let swip = [];
        let data = res.data.data.swipers;
        data.forEach(item => {
          swip.push(
            JSON.parse(
              item.carousel
                .toString()
                .substr(1, item.carousel.toString().length - 2)
            )
          );
        });
        this.swiplist = swip;
      });
    },
    getOneClass() {
      axios.get("api/nottoken/getOneClass").then(res => {
        let data = res.data.data;
        data.map(item => {
          item.image = JSON.parse(
            item.image.substr(1, item.image.toString().length - 2)
          );
        });
        this.navclass = data;
      });
    },
    getInsane() {
      axios.get("api/nottoken/getInsane").then(res => {
        let data = res.data.data;
        data.map(item => {
          item.propaganda = JSON.parse(
            item.propaganda.substr(1, item.propaganda.toString().length - 2)
          );
        });
        this.Insane = data;
      });
    },
    gethomeLive(currents, pageSizes) {
      axios
        .get("api/nottoken/homeLive", {
          params: {
            current: currents,
            pageSize: pageSizes
          }
        })
        .then(res => {
          let data = res.data.data;
          data.map(item => {
            item.propaganda = JSON.parse(
              item.propaganda.substr(1, item.propaganda.toString().length - 2)
            );
          });
          this.likelist = data;
        });
    },
    selebuy(index) {
      this.selectcom(index, true);
    },
    ...mapMutations({
      SET_BUYLIST: "SET_BUYLIST",
      SET_SELECT: "SET_SELECT"
    }),
    selebuycom(item) {
      this.selectcom(item);
    },
    selectcom(parameter, whether = false) {
      if (whether) {
        parameter = this.Insane[parameter];
      }
      let list = this.buylist;
      let select = this.select;
      let sign = true;
      list.forEach(items => {
        if (items.id == parameter.id) {
          items.count += 1;
          this.SET_BUYLIST(list);
          sign = false;
          return;
        }
      });
      if (sign) {
        parameter.count = 1;
        select.splice(select.length, 1, false);
        this.SET_SELECT(select);
        list.push(parameter);
        this.SET_BUYLIST(list);
      }
      this.$toast.success("收藏成功");
    }
  }
};
</script>
<style lang="stylus" scoped>
.swiper-container {
  --swiper-theme-color: black;
  --swiper-pagination-color: black;
}

.home {
  height: 100%;

  .img-swip {
    height: 25%;
    width: 100%;

    .img {
      height: 100%;
      width: 100%;
    }
  }

  .nav {
    display: flex;
    width: 100%;
    height: 200px;
    flex-wrap: wrap;

    .nav-item {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      width: 20%;
      flex-shrink: 0;
      padding: 9.5px;
      align-items: center;

      .nav-img {
        width: 48px;
        height: 48px;
        border-radius: 23px;
      }

      span {
        margin-top: 5px;
        font-size: 12px;
        font-weight: 600;
        color: #3c3b3b;
        text-align: center;
      }
    }
  }

  .vipcar {
    display: flex;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 9.5px 0 9.5px 0;
    background-image: -webkit-linear-gradient(left top, #3db762, #44ce61);
    width: 95%;
    height: 43px;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;

    .cuIcon-crownfill {
      position: relative;
      left: 5%;
      display: flex;
      align-items: center;
      color: #f9e974;
      font-size: 20px;
    }

    .vip-text-left {
      position: relative;
      left: 15%;
      display: flex;
      align-items: center;
    }

    .vip-text-right {
      left: 25%;
    }
  }

  .today-tab {
    width: 100%;
    height: 48px;
    padding: 12px 9.5px 12px 6.75px;
    box-sizing: border-box;
    display: flex;
    background-color: white;

    .cuIcon-titles {
      color: rgb(62, 205, 96);
      line-height: 25px;
    }

    .text {
      position: relative;
      left: 5px;
      font-size: 18px;
      font-weight: 700;
    }

    .time {
      display: flex;
      position: relative;
      left: 5%;
      top: 20%;

      .time-item {
        width: 18px;
        height: 18px;
        background: #fd6069;
        color: #fff;
        font-size: 8px;
        border-radius: 2px;
        margin: 0 3px 0 3px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        font-size: 8px;
        margin: 0 3px 0 3px;
      }
    }
  }

  .today-con {
    width: 100%;
    overflow: auto;
    margin-bottom: 9.5px;

    .today-con-con {
      flex-wrap: nowrap;
      display: flex;

      .today-con-item {
        display: flex;
        flex-direction: column;
        width: 30%;
        flex-shrink: 0;
        background-color: white;

        .con-img {
          box-sizing: border-box;
          padding: 5px 9.5px 9.5px 9.5px;
          width: 100%;
          height: 55%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .con-text {
          font-size: 12px;
          color: #101010;
          padding: 0 9.5px;
          box-sizing: border-box;
          width: 112px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
        }

        .con-bottom {
          display: flex;

          .con-price {
            display: flex;
            flex-direction: column;
            width: 65px;
            height: 9.5px;

            .vip-price {
              color: #f15c6b;
              font-size: 14px;
              text-align: center;
            }

            .price {
              color: #a8a8a8;
              font-size: 8px;
              text-align: center;
            }
          }

          .cuIcon-cart-con {
            position: relative;
            width: 30px;
            height: 30px;
            background: #3bb86a;
            border-radius: 30px;
            font-size: 15px;
            color: #fff;

            .cuIcon-cart {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
  }
}
</style>