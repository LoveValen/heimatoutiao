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
          placeholder="用户名/账号"
          v-model="user.username"
          :ruler="
            /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/
          "
        ></hminput>
        <hminput
          v-model="user.password"
          placeholder="密码"
          :ruler="/^(\w){6,20}$/"
        ></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <hmbutton type="primary" @click="login">登录</hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from "@/components/hmbutton.vue";
import hminput from "@/components/hminput.vue";

export default {
  data() {
    return {
      user: {
        username: "LoveValen",
        password: "123456",
      },
    };
  },
  components: {
    hmbutton,
    hminput,
  },
  methods: {
    login() {
      console.log("可以登录了");
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