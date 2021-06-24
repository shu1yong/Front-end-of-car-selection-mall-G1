<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <h1 class="loginText">登录车品商城</h1>
    <!-- //账号密码表单 -->
    <van-form style="margin-left: 5%" @submit="onSubmitLogin">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        size="large"
        placeholder="请输入您的用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        size="large"
        placeholder="请输入您的密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div
        style="
          margin-top: 30px;
          margin-right: 20px;
          margin-left: 20px;
          margin-bottom: 10px;
        "
      >
        <van-button
          style="background-color: #ffca2d; color: black"
          block
          native-type="submit"
          >确认</van-button
        >
      </div>
    </van-form>
    <div style="font-size: 14px; text-align: center; width: 375px">
      未注册用户会自动注册并登录
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import md5 from "js-md5";
export default {
  name: "Home",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {},
  methods: {
    //登录左上角返回
    onClickLeft() {
      this.$router.push("/home");
    },
    //提交登录
    onSubmitLogin(values) {
      let surl = this.baseurl + "/api/login";
      values.密码 = values.密码;
      // this.$router.push("/home");
      this.$axios
        .post(surl, "userName=" + values.用户名 + "&password=" + values.密码)
        .then((resp) => {
          console.log(resp.data.code);
          if (resp.data.code == 200) {
            console.log(resp.data.data);
            window.sessionStorage.setItem(
              "user",
              JSON.stringify(resp.data.data)
            );
            this.$router.push("/home");
            this.$toast.success("登录成功");
          } else {
            this.$toast.fail("登录失败");
          }
        });
    },
  },
};
</script>
<style lang="less" >
.login {
  .loginText {
    margin: 30px;
    padding: 0px;
    font-size: 24px;
    text-align: left;
    margin-left: 8%;
    font-family: PingFang SC;
  }
}
</style>>

