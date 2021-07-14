<template>
  <div class="goodDetail">
    <van-nav-bar
      title="商品详情"
      size="large"
      left-arrow
      @click-left="onClickGoodDetailLeft"
    />
    <div class="goodDetailPicDiv">
      <img
        width="375"
        height="225"
        :src="goodDetailInfo.MasterPicture[0].picUrl"
      />
      <div class="goodDetailPrice">
        <span class="pos">￥</span>
        <span class="avg_Price">{{ goodDetailInfo.averageCost }}</span>
        <span class="Price">￥{{ goodDetailInfo.price }}</span>
      </div>
    </div>
    <div class="goodDescript">
      <div class="goodDescriptTitle">
        <div class="title">
          {{ goodDetailInfo.name }}
          <span>{{ goodDetailInfo.descript }}</span>
          <span>{{ goodDetailInfo.descript }}</span>
          <span>{{ goodDetailInfo.colorType }}</span>
        </div>
        <div class="star">
          <van-icon
            size="large"
            @click="starGood"
            class="starInto"
            :name="starName"
          />
        </div>
      </div>
      <div class="goodDescriptReco">
        {{ goodDetailInfo.recommendDescript
        }}{{ goodDetailInfo.recommendDescript
        }}{{ goodDetailInfo.recommendDescript }}
      </div>
    </div>
    <div class="addrInfo">
      <van-cell is-link title="已选" @click="choosedShow = true"
        >{{ goodDetailInfo.colorType }}*{{ chooseNum }}</van-cell
      >
      <!-- 弹出层选择商品类别购买数量 -->
      <div class="my-choosedcontainer"></div>
      <van-popup
        v-model="choosedShow"
        round
        position="bottom"
        closeable
        class="my"
        :get-container="getChoosedContainer"
      >
        <div class="choosedSalePic">
          <img
            width="375"
            height="225"
            :src="goodDetailInfo.MasterPicture[0].picUrl"
          />
          <div class="choosedSalePrice">
            <span class="pos">￥</span>
            <span class="avg_Price">{{ goodDetailInfo.averageCost }}</span>
            <span class="Price">￥{{ goodDetailInfo.price }}</span>
          </div>
        </div>
        <div style="margin-left: 20px; font-weight: bold">种类</div>
        <div style="margin: 20px">
          <span class="choosedSaleType">{{ goodDetailInfo.colorType }}</span>
        </div>
        <div class="choosedSaleNumber">
          <h5>数量</h5>
          <van-stepper :value="value" default-value @change="onChange" />
        </div>
        <van-button
          style="
            background-color: #ffca2d;
            margin-left: 5%;
            margin-bottom: 20px;
            width: 90%;
            font-size: 18px;
            color: black;
          "
          block
          @click="goodDetailBuyImmi"
          native-type="submit"
          >立即购买</van-button
        >
      </van-popup>
      <van-cell is-link title="送至" @click="show = true">
        {{ defaultAddrInfo[0].address }}</van-cell
      >
      <!-- 弹出层选择地址 -->
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
        <van-button
          style="
            background-color: #ffca2d;
            margin-left: 5%;
            margin-bottom: 20px;
            width: 90%;
            color: black;
          "
          block
          @click="goodDetailAddAddre"
          native-type="submit"
          >添加新地址</van-button
        >
      </van-popup>
    </div>
    <div class="goodInfoIntroduce">
      <van-tabs v-model="active">
        <van-tab title="商品介绍">
          <img
            class="SaleIntroduce"
            :src="goodDetailInfo.MasterPicture[0].picUrl"
            alt=""
          />
        </van-tab>
        <van-tab title="售后保障">
          <img src="../assets/aftersale.png" alt="" />
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottomBuyImm">
      <van-button
        class="btn"
        @click="goodDetailBuyImmi"
        block
        native-type="submit"
        >立即购买</van-button
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "GoodDetail",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      goodDetailInfo: "",
      id: "",
      addressInfo: [],
      chooseNum: 1,
      defaultAddrInfo: "",
      show: false,
      choosedShow: false,
      active: 1,
      choosedNum: 1,
      value: "",
      starName: "star-o",
    };
  },
  mounted() {
    //初始化商品详情单信息
    // console.log(this.user.id);
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getGoodDetailInfo();
    this.getAddressInfo();
  },
  methods: {
    //商品详情左上角返回
    onClickGoodDetailLeft() {
      this.$router.push("/home");
    },
    //获取当前商品信息
    getGoodDetailInfo() {
      let surl = this.baseurl + "/api/select/product/info";
      this.$axios
        .get(surl, { params: { id: this.id, customerId: this.user.id } })
        .then((resp) => {
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            this.goodDetailInfo = resp.data.data;
            //初始化收藏状态
            if (this.goodDetailInfo.collectStatus) {
              this.starName = "star";
              this.$nextTick(() => {
                setTimeout(() => {
                  let starDiv = document.querySelector(".star");
                  console.log(starDiv);
                  if (starDiv) {
                    starDiv.classList.add("stared");
                  }
                }, 0);
              });
              console.log("默认收藏");
            } else {
              this.starName = "star-o";
              console.log("默认不收藏");
            }
            this.$toast.success("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
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
            this.defaultAddrInfo = this.addressInfo.filter((item) => {
              return item.isDefault;
            });
            console.log(this.defaultAddrInfo);
            this.$toast.success("获取地址成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
    //收藏商品
    starGood() {
      let starDiv = document.querySelector(".star");
      let surl = this.baseurl + "/api/product/collect";
      if (this.goodDetailInfo.collectStatus) {
        this.starName = "star-o";
        this.$nextTick(() => {
          console.log("取消收藏");
          setTimeout(() => {
            console.log(starDiv);
            if (starDiv) {
              starDiv.classList.remove("stared");
            }
          }, 0);
        });
        this.$axios
          .get(surl, {
            params: {
              id: this.goodDetailInfo.id,
              customerId: this.user.id,
              collectStatus: 1,
            },
          })
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.code == 1) {
              console.log(resp.data.data);
              this.goodDetailInfo.collectStatus = 0;
              this.$toast.success("取消收藏成功");
            } else {
              this.$toast.fail("操作失败");
            }
          });
      } else {
        this.starName = "star";
        this.$nextTick(() => {
          starDiv.classList.add("stared");
        });
        console.log(this.goodDetailInfo.id);
        console.log(this.user.id);
        this.$axios
          .get(surl, {
            params: {
              id: this.goodDetailInfo.id,
              customerId: this.user.id,
              collectStatus: 0,
            },
          })
          .then((resp) => {
            console.log(resp.data);
            console.log(resp.data.code);
            console.log("0000");
            if (resp.data.code == 1) {
              this.goodDetailInfo.collectStatus = 1;
              this.$toast.success("收藏成功");
            } else {
              this.$toast.fail("操作失败");
            }
          });
      }
    },
    //弹出层选择地址页  增加新地址
    goodDetailAddAddre() {
      console.log(11);
    },
    // 返回一个特定的 DOM 节点，作为挂载的父节点  挂载弹出层
    getContainer() {
      return document.querySelector(".my-container");
    },
    getChoosedContainer() {
      return document.querySelector(".my-choosedcontainer");
    },
    //切换送至地址
    changeAddr(index) {
      this.defaultAddrInfo[0] = this.addressInfo[index];
      this.show = false;
    },
    //改变选中商品数量
    onChange(value) {
      this.value = value;
      this.chooseNum = this.value;
    },
    //立即购买
    goodDetailBuyImmi() {
      //发送数据到后端生成订单
      let surl = this.baseurl + "/api/add/order";
      this.$axios
        .post(
          surl,
          "customerId=" +
            this.user.id +
            "&id=" +
            this.goodDetailInfo.id +
            "&colorType=" +
            this.goodDetailInfo.colorType +
            " &productCnt=" +
            this.chooseNum +
            " &addressId=" +
            this.defaultAddrInfo[0].id
        )
        .then((resp) => {
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            let id = resp.data.data;
            this.$router.push({
              path: "/tobepay",
              query: {
                id: id,
                addrInfo: this.defaultAddrInfo[0],
                goodId: this.id,
              },
            });
            this.$toast.success("订单生成成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.goodDetail {
  background-color: #f1f1f1;
  .goodDetailPicDiv {
    position: relative;
    width: 375px;
    height: 225px;
  }
  .goodDetailPrice {
    display: flex;
    align-items: center;
    height: 54px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 2;
    z-index: 2;
    color: #ff8b00;
    background: rgba(0, 0, 0, 0.5);
    .pos {
      margin-left: 10px;
    }
    .avg_Price {
      font-size: 30px;
    }
    .Price {
      margin-left: 10px;
      text-decoration: line-through;
      color: #cacaca;
      font-size: 16px;
    }
  }
  .goodDescript {
    width: 100%;
    display: flex;
    background-color: white;
    flex-flow: column;
    .goodDescriptTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        margin: 10px;
        font-size: 20px;
        font-weight: bold;
        span {
          margin-left: 8px;
        }
      }
      .star {
        margin-right: 10px;
        border-left: solid 1px #000;
        width: 50px;
        text-align: center;
      }
    }
    .goodDescriptReco {
      font-size: 12px;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .addrInfo {
    margin-top: 10px;
  }
  .my {
    width: 100%;
  }
  .goodInfoIntroduce {
    background-color: white;
    margin-top: 10px;
    .SaleIntroduce {
      width: 375px;
      height: 375px;
    }
  }
  .choosedSalePic {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      margin-left: 20px;
      margin-top: 20px;
    }
    .choosedSalePrice {
      margin-top: 80px;
      display: flex;
      align-items: center;
      height: 54px;
      width: 100%;
      color: #ff8b00;
      .pos {
        margin-left: 10px;
      }
      .avg_Price {
        font-size: 30px;
      }
      .Price {
        margin-left: 10px;
        text-decoration: line-through;
        color: #cacaca;
        font-size: 16px;
      }
    }
  }
  .choosedSaleType {
    border-radius: 10px;
    border: solid 1px #ccc;
    padding: 5px;
    font-size: 14px;
  }
  .choosedSaleNumber {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bottomBuyImm {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: flex-end;
    background-color: white;
    .btn {
      margin-top: 20px;
      background-color: #ffca2d;
      width: 40%;
      margin-right: 20px;
      border-radius: 20px;
      font-size: 18px;
      color: black;
    }
  }
  .stared {
    color: #ff4226;
  }
}
</style>