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
import { userlogin } from "@/apis/user.js";

export default {
  data() {
    return {
      user: {
        username: "13800138000",
        password: "123",
      },
    };
  },
  components: {
    hmbutton,
    hminput,
  },
  methods: {
    async login() {
      if (
        /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/.test(
          this.user.username
        ) &&
        /^.{3,}$/.test(this.user.password)
      ) {
        // console.log(location.href.split("=")[1]);
        try {
          let res = await userlogin(this.user);
          // console.log(res);
          if (res.data.statusCode == 200) {
            this.$toast.success(res.data.message);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                ...JSON.parse(res.config.data),
                id: res.data.data.user.id,
              })
            );
            let redirecturl = decodeURIComponent(location.href.split("=")[1]);
            // console.log(redirecturl);
            if (redirecturl && redirecturl != "undefined") {
              this.$router.push({ path: redirecturl });
            } else {
              this.$router.push({ path: `/pensonal/${res.data.data.user.id}` });
            }
          }
        } catch {
          this.$toast.fail({
            message: "用户名或密码错误",
            options: "top",
          });
        }
      } else {
        this.$toast.fail({ message: "用户名或密码错误", options: "top" });
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