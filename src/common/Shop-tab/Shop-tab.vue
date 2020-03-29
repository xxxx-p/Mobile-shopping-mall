<template>
  <div class="like-con">
    <div class="like-con-item" :key="index" v-for="(item,index) in list">
      <div class="like-con-img">
        <img :src="item.propaganda.url" />
      </div>
      <span class="like-con-text">{{item.name}}</span>
      <div class="like-con-bottom">
        <div class="like-con-price">
          <span v-show="item.vip_price>0" class="like-price">{{item.price}}</span>
          <span class="like-vip-price">{{item.vip_price>0?item.vip_price:item.price}}</span>
          <span v-show="item.vip_price>0" class="like-green-car">绿卡价</span>
        </div>
        <div class="like-cuIcon-cart-con" @click="selebuy(index)">
          <div class="cuIcon-cart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  methods: {
    selebuy(index) {
      this.$emit("selebuy", this.list[index]);
    }
  }
};
</script>
<style lang="stylus" scoped>
.like-con {
  background-color: white;
  display: flex;
  padding: 0 9.5px 9.5px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  justify-content: space-between;

  .like-con-item {
    width: 49%;
    height: 275px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 0px 9.5px 0px 9.5px;
    box-sizing: border-box;
    flex-shrink: 0;
    margin-bottom: 9.5px;

    .like-con-img {
      box-sizing: border-box;
      padding: 5px 9.5px 9.5px 9.5px;
      width: 100%;
      height: 55%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .like-con-text {
      font-size: 12px;
      color: #101010;
      padding: 0 9.5px;
      box-sizing: border-box;
      width: 153px;
      height: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      align-items: center;
    }

    .like-con-bottom {
      display: flex;
      height: 67px;
      width: 60px;

      .like-con-price {
        display: flex;
        flex-direction: column;
        position: relative;
        top: 40px;
        width: 65px;
        height: 19px;

        .like-vip-price {
          color: #f15c6b;
          font-size: 11px;
          text-align: center;
        }

        .like-price {
          color: #f45a6c;
          font-size: 13px;
          margin-bottom: 5px;
          text-align: center;
        }

        .like-green-car {
          position: absolute;
          top: 15px;
          left: 35px;
          width: 30px;
          height: 15px;
          background: #30bd4c;
          color: #fff;
          font-size: 8px;
          padding: 2px 5px;
        }
      }

      .like-cuIcon-cart-con {
        position: relative;
        width: 30px;
        height: 30px;
        background: #3bb86a;
        border-radius: 15px;
        flex-shrink: 0;
        font-size: 15px;
        color: #fff;
        top: 40px;
        left: 70px;

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
</style>