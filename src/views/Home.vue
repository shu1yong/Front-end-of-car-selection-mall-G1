<template>
  <div class="home">
    <img src="../assets/indexshop.png" />
    <van-grid :border="false">
      <van-grid-item @click="toCategory('车载电器')" text="车载电器">
        <template #icon>
          <img src="../assets/icon_车载电器@2x.png" />
        </template>
      </van-grid-item>
      <van-grid-item @click="toCategory('车行辅助')" text="车行辅助">
        <template #icon>
          <img src="../assets/icon_车行辅助@2x.png" />
        </template>
      </van-grid-item>
      <van-grid-item @click="toCategory('汽车装饰')" text="汽车装饰">
        <template #icon>
          <img src="../assets/icon_汽车装饰@2x.png" />
        </template>
      </van-grid-item>
      <van-grid-item @click="toCategory('行车安全')" text="行车安全">
        <template #icon>
          <img src="../assets/icon_行车安全@2x.png" />
        </template>
      </van-grid-item>
    </van-grid>
    <van-grid :border="false">
      <van-grid-item @click="toCategory('工具/其他')" text="工具/其他">
        <template #icon>
          <img src="../assets/其他@2x.png" />
        </template>
      </van-grid-item>
      <van-grid-item @click="toCategory('维修养护')" text="维修养护">
        <template #icon>
          <img src="../assets/icon_维修养护@2x.png" />
        </template>
      </van-grid-item>
      <van-grid-item @click="toCategory('美容清洗')" text="美容清洗">
        <template #icon>
          <img src="../assets/icon_美容清洗@2x.png" />
        </template>
      </van-grid-item>
      <van-grid-item @click="toCategory('功能小件')" text="功能小件">
        <template #icon>
          <img src="../assets/icon_功能小件@2x.png" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 车载电器 -->
    <div class="carUseEle">车载电器</div>
    <van-grid :border="false" gutter="8" class="carUseEleGrid" :column-num="2">
      <div
        class="carUseEleGridItem"
        v-for="(value, index) in oneSaleDate"
        :key="index"
        @click="toGoodDetail(value.id)"
      >
        <img :src="value.picUrl" />
        <div class="carUseEleGridItemName">{{ value.name }}</div>
        <div class="carUseEleGridItemPrice">
          <span>￥{{ value.averageCost }}</span>
          <span class="Price">￥{{ value.price }}</span>
        </div>
      </div>
    </van-grid>
    <div style="height: 10px; background-color: #fff"></div>
    <!-- 车行辅助 -->
    <div class="carUseEle">车行辅助</div>
    <van-grid :border="false" gutter="8" class="carUseEleGrid" :column-num="2">
      <div
        class="carUseEleGridItem"
        v-for="(value, index) in twoSaleDate"
        :key="index"
        @click="toGoodDetail(value.id)"
      >
        <img :src="value.picUrl" />
        <div class="carUseEleGridItemName">{{ value.name }}</div>
        <div class="carUseEleGridItemPrice">
          <span>￥{{ value.averageCost }}</span>
          <span class="Price">￥{{ value.price }}</span>
        </div>
      </div>
    </van-grid>
    <img src="../assets/bottom.jpg" alt="" />
    <div style="height: 50px"></div>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import tabBtn from "@/components/tabBtn.vue";
export default {
  name: "Home",
  components: {
    tabBtn,
  },
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      firstCategoryName: [
        "车载电器",
        "车行辅助",
        "汽车装饰",
        "行车安全",
        "其他",
        "维修养护",
        "美容清洗",
        "功能小件",
      ],
      oneSaleDate: [],
      twoSaleDate: [],
      threeSaleDate: [],
    };
  },
  mounted() {
    // this.getFlashSale();
    this.getFirstClassSale(this.firstCategoryName[0], (data) => {
      this.oneSaleDate = data;
    });
    this.getFirstClassSale(this.firstCategoryName[1], (data) => {
      this.twoSaleDate = data;
    });
    this.getFirstClassSale(this.firstCategoryName[2], (data) => {
      this.threeSaleDate = data;
    });
  },
  methods: {
    //去分类页
    toCategory(category) {
      this.$router.push({ path: "/category", query: { category: category } });
    },
    //去商品详情页
    toGoodDetail(id) {
      this.$router.push({ path: "/gooddetail", query: { id: id } });
    },
    //首页限时抢购
    getFlashSale() {
      let surl = this.baseurl + "/api/select/flash/sale";
      // this.$router.push("/home");
      let name = "车载电器";
      this.$axios.get(surl, { params: {} }).then((resp) => {
        console.log(resp.data);
        if (resp.data.code == 1) {
          return resp.data;
        } else {
          this.$toast.fail("获取失败");
        }
      });
    },
    //首页一级分类商品获取
    getFirstClassSale(name, callback) {
      let surl = this.baseurl + "/api/select/first/classify";
      // this.$router.push("/home");
      this.$axios
        .get(surl, { params: { name: name, firstCategoryLevel: 1 } })
        .then((resp) => {
          if (resp.data.code == 1) {
            console.log(name, resp.data.data);
            callback(resp.data.data);
            this.$toast.success("获取成功");
          } else {
            this.$toast.fail("获取失败");
          }
        });
    },
  },
};
</script>
<style lang="less" >
.home {
  background-color: #f6f6f6;
  .van-grid-item {
    img {
      width: 50px;
      height: 50px;
    }
    font-size: 30px;
  }
  .carUseEle {
    width: 100%;
    background-color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin-top: 8px;
    padding: 15px;
  }
  .carUseEleGrid {
    justify-content: space-around;
    background-color: #ffffff;
  }
  .carUseEleGridItem {
    border-radius: 10px;
    margin-top: 10px;
    width: 47%;
    height: 47%;
    background-color: #f6f6f6;
    img {
      width: 170px;
      height: 170px;
    }
    .carUseEleGridItemPrice {
      margin-top: 2px;
      display: flex;
      color: #ff9200;
      background-color: #f6f6f6;
      font-family: PingFang SC;
      justify-content: space-around;
      .Price {
        text-decoration: line-through;
        color: #cacaca;
      }
    }
    .carUseEleGridItemName {
      margin-left: 20px;
    }
  }
}
</style>
