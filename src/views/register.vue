<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="input">
        <hminput
          placeholder="账号"
          v-model="user.username"
          msg="用户名错误"
          :ruler="
            /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/
          "
        ></hminput>
        <hminput
          v-model="user.password"
          placeholder="密码"
          :ruler="/^.{3,}$/"
        ></hminput>
        <hminput v-model="user.nickname" placeholder="昵称"></hminput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login" class="">去登录</a>
      </p>
      <hmbutton type="primary" @click="register">注册</hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from "@/components/hmbutton.vue";
import hminput from "@/components/hminput.vue";
import { userRegister } from "@/apis/user.js";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  components: {
    hmbutton,
    hminput,
  },
  methods: {
    async register() {
      let res = await userRegister(this.user);
      console.log(res);
      if (res.data.message == "注册成功") {
        this.$toast.success({ message: "注册成功" });
        this.$router.push({ name: "login" });
      } else {
        this.$toast.fail({ message: "注册失败，请检查数据" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>