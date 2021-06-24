<template>
  <div class="meaddress">
    <van-nav-bar
      title="我的地址"
      size="large"
      left-arrow
      @click-left="onClickMeAddressLeft"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      add-button-text="添加新地址"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "MeAddress",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      meAddressInfo: {},
      chosenAddressId: "1",
      list: [],
    };
  },
  mounted() {
    //初始化地址信息
    // console.log(this.user.id);
    this.getUserAddressInfo();
  },
  methods: {
    //我的地址左上角返回
    onClickMeAddressLeft() {
      this.$router.push("/me");
    },
    //获取当前用户地址信息
    getUserAddressInfo(pageNum = 1, pageSize = 6) {
      let surl = this.baseurl + "/api/select/address/detail";
      this.$axios
        .get(surl, {
          params: {
            customerId: this.user.id,
            pageNum: pageNum,
            pageSize: pageSize,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 200) {
            console.log(resp.data.data);
            this.list = resp.data.data;
            // resp.data.data.forEach((item, index) => {
            //   this.list[index].id = item.customerAddrId;
            //   this.list[index].name = item.customer_name;
            //   this.list[index].tel = item.customer_phone;
            //   this.list[index].address = item.address;
            //   this.list[index].isDefault = item.isDefault;
            // });
            this.list.forEach((item) => {
              item.id = item.customerAddrId;
              item.name = item.customer_name;
              item.tel = item.customer_phone;
              item.isDefault = item.isDefault;
              //判断是否默认，选择默认
              if (item.isDefault) {
                this.chosenAddressId = item.customerAddrId;
              }
            });

            console.log(this.list);
            this.$toast.success("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
    //新增地址
    onAdd() {
      this.$router.push("/meaddressnew");
      this.$toast("新增地址");
    },
    //编辑地址
    onEdit(item, index) {
      this.$router.push({
        name: "meaddressedit",
        params: { addressinfo: item, index: index },
      });
      this.$toast("编辑地址:" + index);
    },
    //切换地址切换默认图标  更改默认地址没做
    onSelect(item, index) {
      this.list.forEach((ele) => {
        ele.isDefault = false;
      });
      this.list[index].isDefault = true;
    },
  },
};
</script>
<style lang="less" >
.meaddress {
  .van-button--danger {
    background-color: #ffca2d;
    border: #ffca2d;
    margin-bottom: 20px;
  }
  .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #ffca2d;
    border: #ffca2d;
  }
  .van-tag--danger {
    background-color: #ffca2d;
  }
}
</style>>
