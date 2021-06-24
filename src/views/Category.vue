<template>
  <div class="category">
    <van-nav-bar
      :title="title"
      size="large"
      left-arrow
      @click-left="onClickCategoryLeft"
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
      userInfo: {},
    };
  },
  mounted() {
    //初始化分类信息
    // console.log(this.user.id);
    this.title = this.$route.query.category;
  },
  methods: {
    //分类聚合页左上角返回
    onClickCategoryLeft() {
      this.$router.push("/home");
    },
    //获取当前一级类目所以二级分类名称信息
    getCategoryInfo(category) {
      let surl = this.baseurl + "/api/select/categoryname";
      this.$axios
        .get(surl, { params: { firstCategoryName: category } })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 200) {
            console.log(resp.data.data);
            this.userInfo = resp.data.data;
            this.$toast.success("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
    //获取当前二级类目商品信息
    getCategoryGoodInfo(categoryName) {
      let surl = this.baseurl + "/api/select/second/classify";
      this.$axios
        .get(surl, {
          params: {
            categoryName: categoryName,
            secondcategoryLevel: 2,
            pageNum: 1,
            pageSize: 2,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 200) {
            console.log(resp.data.data);
            this.userInfo = resp.data.data;
            this.$toast.success("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
  },
};
</script>
<style >
</style>