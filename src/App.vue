<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div
      v-show="this.$route.path=='/'||this.$route.path=='/Classification'||this.$route.path=='/Shop'||this.$route.path=='/My'"
      class="tab"
      id="footer"
    >
      <router-link tag="div" to="/" class="item">
        <div :class="this.$route.path=='/'?'active-home ':'icon-home'"></div>
        <span>首页</span>
      </router-link>
      <router-link tag="div" to="/Classification" class="item">
        <div
          :class="this.$route.path=='/Classification'?'active-classification ':'icon-classification'"
        ></div>
        <span>分类</span>
      </router-link>
      <router-link tag="div" to="/Shop" class="item">
        <div :class="this.$route.path=='/Shop'?'active-shop ':'icon-shop'"></div>
        <span>购物车</span>
      </router-link>
      <router-link tag="div" to="/My" class="item">
        <div :class="this.$route.path=='/My'?'active-my ':'icon-my'"></div>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.app {
  height: 100%;
}

.tab {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  height: 9%;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.33);
  z-index: 5;
  background: white;

  .item {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    .icon-home {
      background: url('./assets/tabbar/h1.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .active-home {
      background: url('./assets/tabbar/h2.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .icon-classification {
      background: url('./assets/tabbar/c1.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .active-classification {
      background: url('./assets/tabbar/c2.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .icon-shop {
      background: url('./assets/tabbar/g1.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .active-shop {
      background: url('./assets/tabbar/g2.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .icon-my {
      background: url('./assets/tabbar/i1.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    .active-my {
      background: url('./assets/tabbar/i2.png') no-repeat;
      background-size: cover;
      width: 13px;
      height: 13px;
    }

    span {
      color: rgb(122, 126, 131);
      font-size: 0.266667rem;
    }
  }
}
</style>
