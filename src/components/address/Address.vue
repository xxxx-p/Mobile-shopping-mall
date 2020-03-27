<template>
  <div>
    <van-nav-bar class="tab" title="收货地址" @click-left="selectretrun" left-arrow />
    <van-address-list
      v-model="chosenAddressId"
      :list="address"
      @select="selectAddress"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      chosenAddressId: ""
    };
  },
  computed: {
    ...mapGetters(["address", "editChosenAddressId"])
  },
  activated() {
    this.getaddress();
  },
  methods: {
    onAdd() {
      this.$router.push({ path: "/AddressEdit", query: { id: 0 } });
    },
    onEdit(item) {
      this.SET_EDITCHOSENADDRESSID(item.id);
      this.$router.push("/AddressEdit");
    },
    selectretrun() {
      this.$router.go(-1);
    },
    selectAddress() {
      this.$nextTick(function() {
        this.SET_CHOSENADDRESSID(this.chosenAddressId);
      });
      this.$router.push("/Settlement");
    },
    getaddress() {
      axios
        .get("api/index/searchAddress", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          let data = res.data.data;
          data.forEach(item => {
            item.name = item.address_name;
            item.tel = item.address_phone;
            item.province = item.address_province;
            item.city = item.address_city;
            item.county = item.address_county;
            item.areaCode = item.address_areacode;
            item.address = `${item.address_province}${item.address_city}${item.address_county}${item.address_addressDetail}`;
            item.addressDetail = item.address_addressDetail;
          });
          this.SET_ADDRESS(data);
        });
    },
    ...mapMutations({
      SET_CHOSENADDRESSID: "SET_CHOSENADDRESSID",
      SET_EDITCHOSENADDRESSID: "SET_EDITCHOSENADDRESSID",
      SET_ADDRESS: "SET_ADDRESS"
    })
  }
};
</script>
