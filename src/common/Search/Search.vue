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
  margin: 5px 5% 0 5%;
  border-radius: 15px;
  text-align: center;
  z-index: 1;
  height: 32px;
  border: 0;
  font-size: 12px;
}

.cuIcon-search {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 32px;
}

.cuIcon-search:before {
  position: fixed;
  left: 150px;
  top: 14px;
  font-size: 15px;
  z-index: 3;
}
</style>