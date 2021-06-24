<template>
  <div class="me">
    <van-nav-bar
      title="我的"
      size="large"
      left-arrow
      @click-left="onClickMeLeft"
    />
    <div style="background-color: #eff2fa; height: 571px; width: 375px">
      <van-cell
        :title="userInfo.customerName"
        :label="userInfo.customerDesc"
        center
        @click="updateMeInfo"
        style="
          margin-bottom: 8px;
          background: linear-gradient(to top, white, #eff2fa);
        "
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="userInfo.customerPicUrl"
            style="margin-right: 8px"
          />
        </template>
      </van-cell>

      <!-- 修改信息弹出框 -->
      <van-dialog
        v-model="updateMeInfoshow"
        title="修改用户信息"
        show-cancel-button
        @confirm="updateMeInfoConfirm"
      >
        <van-cell-group>
          <van-field
            v-model="userInfotemp.customerName"
            label="用户昵称"
            placeholder="请输入用户昵称"
          />
          <van-field
            v-model="userInfotemp.customerDesc"
            label="用户签名"
            placeholder="请输入用户签名"
          />
        </van-cell-group>
      </van-dialog>

      <van-cell
        left
        title="我的地址"
        size="large"
        is-link
        to="meaddress"
        icon="location-o"
        style="margin-bottom: 2px"
      />
      <van-cell
        left
        title="我的订单"
        size="large"
        is-link
        to="meorder"
        icon="bars"
        style="margin-bottom: 6px"
      />
      <van-cell
        size="large"
        to="/"
        @click="changeUser"
        style="text-align: center"
        title="切换账号"
      />
    </div>

    <tab-btn></tab-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import tabBtn from "@/components/tabBtn.vue";
export default {
  name: "Me",
  components: {
    tabBtn,
  },
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      userInfo: {},
      userInfotemp: {},
      updateMeInfoshow: false,
    };
  },
  mounted() {
    //初始化用户信息
    // console.log(this.user.id);
    this.userInfo = this.getUserInfo(this.user.id);
  },
  methods: {
    //我的左上角返回
    onClickMeLeft() {
      console.log(JSON.stringify(this.user));
      this.$toast.success("操作成功");
    },
    //获取当前用户信息
    getUserInfo(customerId) {
      let surl = this.baseurl + "/api/select/user/info";
      this.$axios
        .get(surl, { params: { customerId: customerId } })
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
    //修改用户信息
    updateMeInfo() {
      this.updateMeInfoshow = !this.updateMeInfoshow;
      this.userInfotemp = JSON.parse(JSON.stringify(this.userInfo));
    },
    //确认修改用户信息
    updateMeInfoConfirm() {
      let surl = this.baseurl + "/api/upadte/user/info";
      //修改用户昵称
      if (this.userInfotemp.customerName !== this.userInfo.customerName) {
        console.log(this.userInfo.customerName);
        console.log(this.user.id);
        this.$axios
          .post(
            surl,
            "customerId=" +
              this.user.id +
              "&customerName=" +
              this.userInfo.customerName
          )
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.code == 200) {
              this.userInfo.customerName = this.userInfotemp.customerName;
              console.log(resp.data.data);
              // this.userInfo = resp.data.data;
              this.$toast.success("操作成功");
            } else {
              this.$toast.fail("操作失败");
            }
          });
      }
      // 修改用户签名
      if (this.userInfotemp.customerDesc !== this.userInfo.customerDesc) {
        console.log(this.userInfo.customerDesc);
        console.log(this.user.id);
        this.$axios
          .post(surl, {
            params: {
              customerId: this.user.id,
              customerDesc: this.userInfo.customerDesc,
            },
          })
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.code == 200) {
              this.userInfo.customerDesc = this.userInfotemp.customerDesc;
              console.log(resp.data.data);
              // this.userInfo = resp.data.data;
              this.$toast.success("操作签名成功");
            } else {
              this.$toast.fail("操作签名失败");
            }
          });
      }
    },
    //切换账号
    changeUser() {
      window.sessionStorage.removeItem("user");
    },
  },
};
</script>
