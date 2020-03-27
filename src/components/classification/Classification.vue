<template>
  <div class="class-app">
    <Search></Search>
    <div class="class-con">
      <div class="tab">
        <div
          class="tab-item"
          :class="classId==item.id?'active':''"
          :classId="item.id"
          :key="index"
          v-for="(item,index) in shopclass"
          @click="setclassId"
        >{{item.name}}</div>
      </div>
      <div class="cotent">
        <div>
          <div class="title">{{classtitle}}</div>
          <div class="item" :key="index" v-for="(item,index) in contentclass">
            <div class="item-img">
              <img :src="item.propaganda.url" />
            </div>
            <div class="item-cont">
              <span class="item-name">{{item.name}}</span>
              <span class="item-text">{{item.bewrite}}</span>
              <div class="item-bottom">
                <span>{{item.price}}</span>
                <div @click="selebuy(index)" class="like-cuIcon-cart-con">
                  <div class="cuIcon-cart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../../common/Search/Search";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      shopclass: [],
      contentclass: [],
      classtitle: []
    };
  },
  created() {
    axios.get("api/nottoken/getOneClass").then(res => {
      this.shopclass = res.data.data;
      this.classtitle = this.shopclass[0].name;

      if (this.$route.query.id != null) {
        axios
          .get("api/nottoken/getOneAllGoods", {
            params: {
              id: this.$route.query.id
            }
          })
          .then(res => {
            let data = res.data.data;
            data.map(item => {
              item.propaganda = JSON.parse(
                item.propaganda.substr(1, item.propaganda.toString().length - 2)
              );
            });
            this.contentclass = data;
          });
      } else {
        this.initclassId();
        axios
          .get("api/nottoken/getOneAllGoods", {
            params: {
              id: this.classId
            }
          })
          .then(res => {
            let data = res.data.data;
            data.map(item => {
              item.propaganda = JSON.parse(
                item.propaganda.substr(1, item.propaganda.toString().length - 2)
              );
            });
            this.contentclass = data;
          });
      }
    });
  },
  computed: {
    ...mapGetters(["classId", "buylist", "select"]),
    rouid: function() {
      return this.$route.query.id;
    }
  },
  components: {
    Search
  },
  methods: {
    initclassId() {
      if (this.classId == "") {
        this.SET_CLASSID(this.shopclass[0].id);
      }
    },
    ...mapMutations({
      SET_CLASSID: "SET_CLASSID",
      SET_BUYLIST: "SET_BUYLIST",
      SET_SELECT: "SET_SELECT"
    }),
    setclassId(e) {
      let id = e.target.getAttribute("classId");
      this.classtitle = e.target.innerText;
      this.SET_CLASSID(id);
      axios
        .get("api/nottoken/getOneAllGoods", {
          params: {
            id: id
          }
        })
        .then(res => {
          let data = res.data.data;
          data.map(item => {
            item.propaganda = JSON.parse(
              item.propaganda.substr(1, item.propaganda.toString().length - 2)
            );
          });
          this.contentclass = data;
        });
    },
    selebuy(index) {
      let list = this.buylist;
      let select = this.select;
      let item = this.contentclass[index];
      let sign = true;
      list.forEach((items, index) => {
        if (items.id == item.id) {
          items.count += 1;
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
    }
  },

  watch: {
    rouid: function(newQuestion) {
      if (newQuestion != undefined) {
        axios
          .get("api/nottoken/getOneAllGoods", {
            params: {
              id: newQuestion
            }
          })
          .then(res => {
            let data = res.data.data;
            data.map(item => {
              item.propaganda = JSON.parse(
                item.propaganda.substr(1, item.propaganda.toString().length - 2)
              );
            });
            this.contentclass = data;
          });
        this.SET_CLASSID(newQuestion);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
div>>>.search {
  background-color: #f2f2f2;
}

.class-app {
  width: 100%;
  height: 100%;

  .class-con {
    box-sizing: border-box;
    display: flex;
    padding-top: 12%;
    background-color: white;
    height: 100%;

    .tab {
      height: 100%;
      width: 30%;
      display: flex;
      flex-direction: column;
      background: #f7f7f7;

      .tab-item {
        font-size: 12px;
        height: 7%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3e3d3d;
      }

      .active {
        background-color: white;
      }
    }

    .cotent {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
      padding-bottom: 48px;
      box-sizing: border-box;
      flex: 1;

      .title {
        height: 38px;
        border-bottom: 1px solid #efefef;
        font-size: 12px;
        margin-left: 15px;
        line-height: 38px;
        color: #5e5e5e;
      }

      .item {
        display: flex;
        height: 143px;
        flex-shrink: 0;
        padding: 20px 15px 9.5px 11px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;

        .item-img {
          width: 75px;
          height: 85px;
          flex-shrink: 0;

          img {
            height: 100%;
            width: 100%;
          }
        }

        .item-cont {
          display: flex;
          flex-direction: column;
          margin-left: 15px;
          box-sizing: border-box;

          .item-name {
            height: 19px;
            color: #373737;
            font-size: 13px;
            line-height: 19px;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .item-text {
            width: 100%;
            height: 17px;
            color: #8c8c8c;
            font-size: 11px;
            line-height: 17px;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .item-bottom {
            display: flex;
            align-items: center;
            width: 123px;
            height: 32px;

            span {
              margin-top: 15px;
              color: #ff4f67;
              font-weight: 600;
              font-size: 14px;
              width: 50px;
              height: 20px;
            }

            .like-cuIcon-cart-con {
              position: relative;
              width: 30px;
              height: 30px;
              background: #3bb86a;
              border-radius: 15px;
              font-size: 15px;
              color: #fff;
              left: 60px;
              top: 20px;

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
}
</style>