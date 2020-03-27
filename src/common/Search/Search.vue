<template>
  <div class="cuIcon-search">
    <input class="search" type="text" placeholder="黄瓜" />
  </div>
</template>
<style lang="stylus">
.search {
  display: block;
  position: fixed;
  width: 90%;
  background: white;
  color: #c3c5c4;
  margin: 0.133333rem 5% 0 5%;
  border-radius: 0.4rem;
  text-align: center;
  z-index: 1;
  height: 4%;
  border: 0;
  font-size: 0.326667rem;
}

.cuIcon-search {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 4%;
}

.cuIcon-search:before {
  position: fixed;
  left: 4rem;
  top: 1.4%;
  font-size: 0.426667rem;
  z-index: 3;
}
</style>