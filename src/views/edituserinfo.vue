<template>
  <div>
    <div class="top">
      <hmheader title="个人信息编辑">
        <span
          slot="left"
          class="iconfont iconjiantou"
          @click="$router.go(-1)"
        ></span>
        <!-- <h4 slot="title">编辑中心</h4> -->
        <span slot="right" @click="$router.push({ path: '/index' })"
          ><van-icon name="wap-home-o" color="red" size="24px"
        /></span>
      </hmheader>
    </div>
    <div class="middle">
      <img class="userimg" :src="userInfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="content">
      <hmcell
        title="昵称"
        :desc="userInfo.nickname"
        @click="nicknameshow = !nicknameshow"
        ><span class="iconfont iconjiantou1"></span
      ></hmcell>
      <!-- 修改昵称 -->
      <van-dialog
        v-model="nicknameshow"
        title="修改昵称"
        show-cancel-button
        @cancel="current.nickname = userInfo.nickname"
        @confirm="editNickname"
      >
        <!-- 输入框 -->
        <van-field
          v-model="current.nickname"
          required
          label="昵称"
          placeholder="请输入昵称"
        />
      </van-dialog>
      <hmcell
        title="密码"
        desc="......"
        type="password"
        @click="passwordshow = !passwordshow"
        ><span class="iconfont iconjiantou1"></span
      ></hmcell>
      <!-- 修改密码 -->
      <van-dialog
        v-model="passwordshow"
        title="修改密码"
        show-cancel-button
        :before-close="beforeClose"
        @cancel="current.originalPassword = current.newPassword = ''"
        @confirm="editPassword"
      >
        <van-field
          v-model="current.originalPassword"
          required
          label="原密码"
          placeholder="请输入密码"
        />
        <van-field
          v-model="current.newPassword"
          required
          label="新密码"
          placeholder="请输入密码"
        />
      </van-dialog>
      <hmcell
        title="性别"
        :desc="userInfo.gender == 1 ? '男' : '女'"
        @click="showPicker = !showPicker"
        ><span class="iconfont iconjiantou1"></span
      ></hmcell>
      <!-- 修改性别 -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          title="修改性别"
          @cancel="showPicker = !showPicker"
          show-toolbar
          :default-index="current.gender"
          :columns="['女', '男']"
          @confirm="editGender"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell.vue";
import hmheader from "@/components/hmheader.vue";
import axios from "@/utils/myaxios.js";
import { userInfo, updateUserInfo } from "@/apis/user.js";
import { uploadFile } from "@/apis/uploade.js";

export default {
  data() {
    return {
      userInfo: {},
      nicknameshow: false,
      passwordshow: false,
      showPicker: false,
      current: {
        originalPassword: "",
        newPassword: "",
      },
    };
  },
  components: {
    hmheader,
    hmcell,
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      let fromdata = new FormData();
      fromdata.append("file", file.file);
      try {
        // 上传图片资源
        let res = await uploadFile(fromdata);
        this.$toast({ message: "上传头像成功" });
        // 编辑用户头像信息
        let reschange = await updateUserInfo(this.$route.params.id, {
          head_img: res.data.data.url,
        });
        // 刷新userInfo中的数据
        reschange.data.data.head_img =
          axios.defaults.baseURL + reschange.data.data.head_img;
        this.userInfo = reschange.data.data;
      } catch {
        this.$toast({ message: "上传头像失败" });
      }
    },
    // 修改昵称
    async editNickname() {
      // 编辑用户昵称信息
      try {
        let reschange = await updateUserInfo(this.$route.params.id, {
          nickname: this.current.nickname,
        });
        // 刷新userInfo中的数据
        this.userInfo.nickname = reschange.data.data.nickname;
        this.$toast({ message: "修改昵称成功" });
      } catch {
        this.$toast({ message: "修改昵称失败" });
      }
    },
    // 触发comfirm事件之前
    beforeClose(action, done) {
      if (action === "confirm") {
        let userInfomation = JSON.parse(localStorage.getItem("userInfo"));
        // 如果点击确认按钮就判断输入原密码是否正确
        if (this.current.originalPassword != userInfomation.password) {
          // 如果输入的原密码有误则按确认不关闭弹框
          done(false);
        } else {
          // 验证新密码是否是正确的格式
          if (
            /^.{3,16}$/.test(this.current.newPassword) &&
            this.current.newPassword != ""
          ) {
            done();
          } else {
            done(false);
          }
        }
      } else {
        done();
      }
    },
    // 修改密码
    async editPassword() {
      let userInfomation = JSON.parse(localStorage.getItem("userInfo"));
      // 判断原密码是否匹配
      if (this.current.originalPassword == userInfomation.password) {
        // 判断输入的新密码格式是否正确
        if (/^.{3,16}$/.test(this.current.newPassword)) {
          let reschange = await updateUserInfo(this.$route.params.id, {
            password: this.current.newPassword,
          });
          // 将新密码赋值给userInfomation.password
          userInfomation.password = this.current.newPassword;
          // 还原输入框
          this.current.originalPassword = this.current.newPassword = "";
          // 重新存储本地
          localStorage.setItem("userInfo", JSON.stringify(userInfomation));
          this.$toast({ message: "修改成功" });
          // console.log(reschange);
        } else {
          this.$toast({ message: "请输入3-16位之间的密码" });
        }
      } else {
        this.$toast({ message: "原密码错误" });
      }
    },
    // 修改性别
    async editGender(value, index) {
      this.userInfo.gender = index;
      let reschange = await updateUserInfo(this.$route.params.id, {
        gender: index,
      });
      if (reschange.status !== 200) this.$toast({ message: "修改失败" });
      this.$toast({ message: "修改成功" });
      this.showPicker = false;
    },
  },
  async mounted() {
    try {
      let res = await userInfo(this.$route.params.id);
      // console.log(res);
      res.data.data.head_img = axios.defaults.baseURL + res.data.data.head_img;
      this.userInfo = res.data.data;
      this.current = { ...this.userInfo };
    } catch {
      alert("获取信息失败");
    }
  },
};
</script>

<style lang="less" scoped>
.middle {
  position: relative;
  display: flex;
  width: 100vw;
  height: 120 * 100vw/360;
  justify-content: center;
  align-items: center;
  .userimg {
    width: 80 * 100vw/360;
    height: 80 * 100vw/360;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload {
    width: 80/360 * 100vw;
    height: 80/360 * 100vw;
    margin: 0;
  }
  /deep/ .van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
.content {
  padding: 0 20 * 100vw/360;
  span {
    margin-left: 6px;
  }
}
</style>