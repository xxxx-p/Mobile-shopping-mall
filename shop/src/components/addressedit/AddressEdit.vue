<template>
  <div>
    <van-nav-bar class="tab" title="添加/编辑地址" @click-left="selectretrun" left-arrow />
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="$route.query.id==0?addAddressinfo:editAddressinfo"
      show-delete
      @save="save"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import areaList from "../../assets/js/area.js";
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  computed: {
    ...mapGetters(["editChosenAddressId", "address"])
  },
  activated() {
    this.address.forEach(item => {
      if (this.editChosenAddressId == item.id) {
        this.editAddressinfo = item;
      }
    });
  },
  data() {
    return {
      areaList,
      editAddressinfo: {},
      addAddressinfo: {}
    };
  },
  methods: {
    save(content) {
      //因为这里用的是vant，爬取的用的是uniapp的ui框架，约定的数据格式不一致，这里需要转换
      content.address_name = content.name; //接口需要的名字
      content.address_phone = content.tel; //接口需要的电话
      content.address_province = content.province; //接口需要的省
      content.address_city = content.city; //接口需要的市
      content.address_county = content.county; //接口需要的区
      content.address = `${content.address_province}${content.address_city}${content.address_county}${content.addressDetail}`; //Settlemen页面的完整地址
      content.address_areacode = content.areaCode; //接口需要的地区code
      content.address_addressDetail = content.addressDetail; //接口需要的详细地址
      this.axiosSave(content).then(() => {
        this.SET_ADDRESSINFO(content);
        this.$router.go(-1);
      });
    },
    axiosSave(content) {
      return new Promise(resolve => {
        axios
          .post("api/index/address", content, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            resolve(res);
          });
      });
    },
    selectretrun() {
      this.$router.go(-1);
    },
    //删除地址接口，暂未实现！
    onDelete() {
      this.$toast("删除地址，接口暂未实现！");
    },
    ...mapMutations({ SET_ADDRESSINFO: "SET_ADDRESSINFO" })
  }
};
</script>