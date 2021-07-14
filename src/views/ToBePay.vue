<template>
  <div class="tobepay">
    <van-nav-bar
      title="待付款"
      size="large"
      left-arrow
      @click-left="onClickToBePayLeft"
    />
    <div class="topFillDiv"></div>
    <div class="userAddrInfo">
      <van-cell center title="单元格" size="large" icon="location-o">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon size="large" @click="changeAddrBtn" name="edit" />
        </template>
        <!-- 使用 title 插槽来自定义左侧标题图标 -->
        <template #title>
          <div style="display: flex; flex-direction: column">
            <div>
              <span style="font-weight: bold">{{ addrInfo.customerName }}</span>
              <span style="margin-left: 20px">{{
                addrInfo.customerPhone
              }}</span>
            </div>
            <div>{{ addrInfo.address }}</div>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="orderDetailInfo">
      <div class="orderCard">
        <div class="orderStatus">
          <span style="font-weight: bold">车品商城</span>
          <span style="color: #ff9200">{{
            orderDetailInfo.orderStatusName
          }}</span>
        </div>
        <van-card
          :num="orderDetailInfo.productCnt"
          :price="orderDetailInfo.districtPrice"
          :desc="orderDetailInfo.colorType"
          :title="orderDetailInfo.productName"
          :thumb="orderDetailInfo.productPicUrl"
        >
          <template #footer> </template>
        </van-card>
        <div
          style="
            dispaly: flex;
            flex-direction: column;
            margin-left: 10px;
            font-weight: lighter;
          "
        >
          <div>货品总价：￥{{ orderDetailInfo.totalMoney }}</div>
          <div>物流费用：￥{{ orderDetailInfo.logisticsMoney }}</div>
        </div>
        <div class="realityMoneyDiv">
          <span>总额：</span>
          <span class="realityMoney">
            ￥{{ orderDetailInfo.realityMoney }}
          </span>
        </div>
      </div>
      <div class="orderInfo">
        <div style="font-weight: bold">订单信息</div>
        <div class="orderItem">
          <span class="orderItemTitle">订单编号</span
          ><span class="orderItemContent">{{ orderDetailInfo.Econding }}</span>
        </div>
        <div class="orderItem">
          <span class="orderItemTitle">下单时间</span
          ><span class="orderItemContent">{{ creatTime }}</span>
        </div>
      </div>
    </div>
    <button class="confirmOrder" @click="confirmOrderBtn">确认</button>
    <div class="my-container"></div>
    <van-popup
      v-model="show"
      class="my"
      round
      position="bottom"
      closeable
      :get-container="getContainer"
    >
      <van-nav-bar title="配送至" />
      <van-cell
        v-for="(item, index) in addressInfo"
        :key="index"
        :title="item.address"
        icon="passed"
        is-link
        @click="changeAddr(index)"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "ToBePay",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      id: "",
      orderDetailInfo: {},
      addressInfo: [],
      addrInfo: "",
      creatTime: "",
      show: false,
      goodId: "",
    };
  },
  created() {
    this.addrInfo = this.$route.query.addrInfo;
    console.log(this.addrInfo);
  },
  mounted() {
    this.getAddressInfo();
    this.id = this.$route.query.id.id;
    this.goodId = this.$route.query.goodId;
    this.$nextTick(() => {
      this.getOrderDetailInfo();
    });
  },
  methods: {
    //左上角返回
    onClickToBePayLeft() {
      this.$router.push({ path: "/gooddetail", query: { id: this.goodId } });
    },
    //获取订单信息
    getOrderDetailInfo() {
      let surl = this.baseurl + "/api/select/order/detail";
      console.log(this.id);
      this.$axios
        .get(surl, {
          params: {
            id: this.id,
            customerId: this.user.id,
          },
        })
        .then((resp) => {
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            this.orderDetailInfo = resp.data.data;
            this.toOrderDateString(resp.data.data.createTime);
            this.$toast.success("获取订单成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
    //转换时间
    toOrderDateString(createtime) {
      createtime = new Date(createtime);
      var year = createtime.getFullYear();
      var month = createtime.getMonth() + 1;
      var date = createtime.getDate();
      var hour = createtime.getHours();
      var min = createtime.getMinutes();
      var sec = createtime.getSeconds();
      this.creatTime =
        [year, month, date].join("-") + "  " + [hour, min, sec].join(":");
    },
    //切换地址
    changeAddrBtn() {
      console.log("只在本地切换，没有提交到服务器，没有改地址的接口");
      this.show = true;
    },
    //获取地址信息
    getAddressInfo(pageNum = 1, pageSize = 10) {
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
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            this.addressInfo = resp.data.data;
            console.log(this.addressInfo);
            this.$toast.success("获取地址成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
    // 返回一个特定的 DOM 节点，作为挂载的父节点  挂载弹出层
    getContainer() {
      return document.querySelector(".my-container");
    },
    //点击切换送至地址
    changeAddr(index) {
      this.addrInfo.address = this.addressInfo[index].address;
      this.show = false;
    },
    //确认订单
    confirmOrderBtn() {
      console.log("确认订单");
      let surl = this.baseurl + "/api/order/detail/appay";
      this.$axios
        .post(
          surl,
          "customerId=" + this.user.id + "&id=" + this.orderDetailInfo.id
        )
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            console.log(this.addressInfo);
            this.$router.push("/meorder");
            this.$toast.success("确认订单成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
  },
};
</script>
<style lang="less" >
.tobepay {
  position: relative;

  .topFillDiv {
    height: 100px;
    background-image: linear-gradient(to bottom right, #ff8d00, #ffd800);
  }
  .userAddrInfo {
    position: absolute;
    top: 100px;
    width: 90%;

    left: 5%;
    background-color: #efffff;
    border-radius: 20px;
    height: 78px;
  }
  .orderDetailInfo {
    margin-top: 50px;
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
    }
    .realityMoneyDiv {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 10px;
      border-top: 0.1px solid #ccc;
    }
    .realityMoney {
      font-size: 26px;
      color: #ff8b00;
    }
  }
  .orderInfo {
    margin: 0 20px;
    .orderItem {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .orderItemTitle {
        font-weight: lighter;
        width: 30%;
      }
      .orderItemContent {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .confirmOrder {
    width: 94%;
    margin: 10px 3%;
    background-color: #ffcb2d;
    border: 1px solid #ffcb2d;
    line-height: 40px;
  }
  .my {
    width: 100%;
  }
}
</style>
