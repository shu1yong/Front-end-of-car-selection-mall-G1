<template>
  <div class="home">
    <img src="../assets/indexshop.png" />
    <van-grid>
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
    <van-grid>
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
    };
  },
  methods: {
    toCategory(category) {
      this.$router.push({ path: "/category", query: { category: category } });
    },
  },
};
</script>
<style lang="less" >
.home {
  .van-grid-item {
    img {
      width: 50px;
      height: 50px;
    }
    font-size: 30px;
  }
}
</style>
