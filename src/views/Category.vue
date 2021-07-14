<template>
  <div class="category">
    <van-nav-bar
      :title="title"
      size="large"
      left-arrow
      @click-left="onClickCategoryLeft"
    />
    <!-- 顶部tabs -->
    <div class="categoryTop">
      <div class="tabs">
        <van-tabs
          @click="topChange"
          v-model="currentSecCategory"
          title-active-color="black"
          ref="topVanTabs"
        >
          <van-tab
            v-for="(item, index) in categoryInfo"
            :key="index"
            :title="item.name"
          >
          </van-tab>
        </van-tabs>
      </div>

      <div class="topBox">
        <van-icon
          class="icon"
          @click="swithTopCategory"
          size="small"
          name="play"
        />
      </div>
    </div>
    <!-- 顶部弹出层 -->
    <van-overlay class="overLay" :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="overLayCategoryTop">
            <div class="allClassify">全部分类</div>
            <div class="overLayTopBox">
              <van-icon
                class="icon"
                @click="swithTopCategory"
                size="small"
                name="play"
              />
            </div>
          </div>
          <div class="overLayCategory">
            <div
              @click="overLayTopChange(item.name)"
              class="overLayCategoryItem"
              v-for="(item, index) in categoryInfo"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 商品 -->
    <van-grid :border="false" gutter="8" class="carUseEleGrid" :column-num="2">
      <div
        class="carUseEleGridItem"
        v-for="(item, index) in categoryGoodInfo"
        :key="index"
        @click="toGoodDetail(item.id)"
      >
        <img :src="item.picUrl" />
        <div class="carUseEleGridItemName">{{ item.name }}</div>
        <div class="carUseEleGridItemPrice">
          <span>￥{{ item.averageCost }}</span>
          <span class="Price">￥{{ item.price }}</span>
        </div>
      </div>
    </van-grid>

    <van-empty
      v-if="!categoryGoodInfo.length"
      description="该分类暂时没有商品"
    />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Category",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      title: "",
      categoryInfo: [],
      currentSecCategory: "",
      categoryGoodInfo: {},
      show: false,
    };
  },
  mounted() {
    //初始化分类信息
    // console.log(this.user.id);
    this.title = this.$route.query.category;
    console.log(typeof this.title);
    this.$nextTick(() => {
      this.getCategoryInfo(this.title);
    });
  },
  methods: {
    //分类聚合页左上角返回
    onClickCategoryLeft() {
      this.$router.push("/home");
    },
    //获取当前一级类目所以二级分类名称信息
    getCategoryInfo(category) {
      let surl = this.baseurl + "/api/select/categoryname";
      this.$axios.get(surl, { params: { name: category } }).then((resp) => {
        console.log(resp.data);
        if (resp.data.code == 1) {
          console.log(resp.data.data);
          this.categoryInfo = resp.data.data;
          this.currentSecCategory = this.categoryInfo[0].name;
          this.getCategoryGoodInfo(this.currentSecCategory);
          this.$toast.success("获取二级目录成功");
        } else {
          this.$toast.fail("操作失败");
        }
      });
    },
    //获取当前二级类目商品信息
    getCategoryGoodInfo(categoryName) {
      console.log(categoryName);
      let surl = this.baseurl + "/api/select/second/classify";
      this.$axios
        .get(surl, {
          params: {
            name: categoryName,
            secondCategoryLevel: 2,
            pageNum: 1,
            pageSize: 6,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            this.categoryGoodInfo = resp.data.data;
            this.$toast.success("二级商品详情获取成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
    //切换标签
    topChange(name, title) {
      console.log(name, title);
      this.getCategoryGoodInfo(title);
    },
    //切换顶部标签
    swithTopCategory() {
      this.show = !this.show;
    },
    //遮罩层顶部变更
    overLayTopChange(name) {
      this.getCategoryGoodInfo(name);
      this.show = !this.show;
      //使顶部tabs的选中标签更新
      this.categoryInfo = this.categoryInfo.filter((item) => {
        console.log(item.name == name);
        return item.name !== name;
      });
      this.categoryInfo.unshift({ name: name });
    },
    //去商品详情页
    toGoodDetail(id) {
      this.$router.push({ path: "/gooddetail", query: { id: id } });
    },
  },
};
</script>
<style lang="less" scoped>
.category {
  .categoryTop {
    display: flex;
    justify-content: space-around;
    .tabs {
      width: 95%;
      overflow: hidden;
    }
    .topBox {
      width: 5%;
      height: 10px;
      display: flex;
      border-left: solid 2px #eee;
      padding: 10px;
      .icon {
        margin: auto;
        transform: rotate(90deg);
      }
    }
  }
  .overLay {
    margin-top: 40px;
    .wrapper {
      display: flex;
      height: auto;
    }
    .block {
      width: 100%;
      height: auto;
      background-color: #fff;
    }
    .overLayCategoryTop {
      display: flex;
      justify-content: space-between;
      .allClassify {
        text-align: center;
        font-weight: bold;
        padding: 10px;
      }
      .overLayTopBox {
        height: 10px;
        display: flex;
        margin-left: 10px;
        padding: 10px;
        .icon {
          margin: auto;
          transform: rotate(-90deg);
        }
      }
    }
  }
  .overLayCategory {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    .overLayCategoryItem {
      border: solid 1px #eee;
      padding: 5px;
      font-size: 14px;
      margin-top: 10px;
      border-radius: 8px;
    }
    .active {
      font-weight: bold;
      border: solid 1px black;
    }
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