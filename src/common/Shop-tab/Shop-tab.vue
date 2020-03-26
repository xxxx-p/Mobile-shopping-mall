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
<style lang="stylus">
.like-con {
  background-color: white;
  display: flex;
  padding: 0 0.266667rem 0.266667rem;
  margin-bottom: 1.333333rem;
  flex-wrap: wrap;
  justify-content: space-between;

  .like-con-item {
    width: 49%;
    height: 7.333333rem;
    border: 1px solid #eee;
    border-radius: 0.133333rem;
    padding: 0px 0.266667rem 0px 0.266667rem;
    box-sizing: border-box;
    flex-shrink: 0;
    margin-bottom: 0.266667rem;

    .like-con-img {
      box-sizing: border-box;
      padding: 0.133333rem 0.266667rem 0.266667rem 0.266667rem;
      width: 100%;
      height: 55%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .like-con-text {
      font-size: 0.32rem;
      color: #101010;
      padding: 0 0.266667rem;
      box-sizing: border-box;
      width: 4.08rem;
      height: 0.906667rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      align-items: center;
    }

    .like-con-bottom {
      display: flex;
      height: 1.813333rem;
      width: 1.666667rem;

      .like-con-price {
        display: flex;
        flex-direction: column;
        position: relative;
        top: 1.066667rem;
        width: 1.733333rem;
        height: 0.506667rem;

        .like-vip-price {
          color: #f15c6b;
          font-size: 0.293333rem;
          text-align: center;
        }

        .like-price {
          color: #f45a6c;
          font-size: 0.346667rem;
          margin-bottom: 0.133333rem;
          text-align: center;
        }

        .like-green-car {
          position: absolute;
          top: 0.4rem;
          left: 0.933333rem;
          width: 0.8rem;
          height: 0.4rem;
          background: #30bd4c;
          color: #fff;
          font-size: 0.213333rem;
          padding: 0.053333rem 0.133333rem;
        }
      }

      .like-cuIcon-cart-con {
        position: relative;
        width: 0.8rem;
        height: 0.8rem;
        background: #3bb86a;
        border-radius: 0.4rem;
        flex-shrink: 0;
        font-size: 0.4rem;
        color: #fff;
        top: 1.066667rem;
        left: 1.866667rem;

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