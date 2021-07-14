<template>
  <div class="meOrder">
    <van-nav-bar
      title="我的订单"
      size="large"
      left-arrow
      @click-left="onClickMeOrderLeft"
    />
    <van-tabs
      v-model="orderSearch"
      title-active-color="black"
      line-width="20px"
      @click="topChangeOrderStatus"
    >
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="代发货"></van-tab>
      <van-tab title="待收货"></van-tab>
    </van-tabs>

    <div class="fillDiv">
      <van-empty v-if="!orderInfo.length" description="没有相关订单" />
      <div class="orderCard" v-for="(item, index) in orderInfo" :key="index">
        <div class="orderStatus">
          <span style="font-weight: bold">车品商城</span>
          <span style="color: #ff9200">{{ item.orderStatusName }}</span>
        </div>
        <van-card
          :num="item.productCnt"
          :price="item.districtPrice"
          :desc="item.colorType"
          :title="item.productName"
          :thumb="item.picUrl"
        >
          <template #footer>
            <van-button class="cardBottomAction" size="mini">{{
              item.orderAction
            }}</van-button>
          </template></van-card
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "MeOeder",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      orderInfo: [],
      orderSearch: 1,
    };
  },
  mounted() {
    //初始化用户订单信息
    // console.log(this.user.id);
    this.getUserOrderInfo(0);
  },
  methods: {
    //我的订单左上角返回
    onClickMeOrderLeft() {
      this.$router.push("/me");
    },
    //获取当前用户订单信息
    getUserOrderInfo(orderStatus) {
      let surl = this.baseurl + "/api/select/order/status";
      this.$axios
        .get(surl, {
          params: {
            customerId: this.user.id,
            orderStatus: orderStatus,
            pageNum: 1,
            pageSize: 4,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            this.orderInfo = resp.data.data;
            this.orderInfo.forEach((item) => {
              if (item.orderStatus == 1) {
                item.orderStatusName = "待付款";
                item.orderAction = "立即付款";
              }
              if (item.orderStatus == 2) {
                item.orderStatusName = "待发货";
                item.orderAction = "确认收货";
              }
              if (item.orderStatus == 3) {
                item.orderStatusName = "待收货";
                item.orderAction = "提醒发货";
              }
            });
            this.$toast.success("操作成功");
          } else if (resp.data.code == 0) {
            this.orderInfo = resp.data.data;
            this.$toast.fail("没有相关数据");
          }
        });
    },
    //切换顶部标签  筛选商品
    topChangeOrderStatus(name, title) {
      console.log(name, title);
      this.getUserOrderInfo(name);
    },
  },
};
</script>
<style  lang="less">
.meOrder {
  height: 667px;
  display: flex;
  flex-direction: column;
  .van-tabs__line {
    background-color: black;
  }
  .van-tab--active {
    font-weight: bold;
  }
  .fillDiv {
    flex: 1;
    background-color: #f6f6f6;
    display: flex;

    flex-direction: column;

    .orderCard {
      margin: 10px;
      margin-bottom: 0px;
      border-radius: 5px;
      background-color: white;
      .orderStatus {
        display: flex;
        margin: 10px;
        justify-content: space-between;
      }
      .van-card {
        background-color: white;
      }
      .cardBottomAction {
        color: #ff9200;
        border: solid 1px #ff9200;
        border-radius: 8px;
      }
    }
  }
}
</style>