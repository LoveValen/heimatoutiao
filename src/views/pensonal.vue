<template>
  <div class="pensonal">
    <router-link :to="{ path: `/edituserinfo/${userInfo.id}` }">
      <div class="container">
        <div class="left">
          <img :src="userInfo.head_img" alt="" />
        </div>
        <div class="right">
          <div class="middle">
            <div class="middle_hd">
              <span
                :class="{
                  iconfont: true,
                  iconxingbienan: userInfo.gender == 1,
                  iconxingbienv: userInfo.gender == 0,
                }"
              ></span>
              <span class="username">{{ userInfo.nickname }}</span>
            </div>
            <div class="middle_ft">{{ userInfo.create_date | dateFormat }}</div>
          </div>
          <div class="iconfont iconjiantou1"></div>
        </div>
      </div>
    </router-link>
    <div class="container_footer">
      <hmcell
        title="我的关注"
        desc="关注的用户"
        @click="$router.push('/followuser')"
        ><span class="iconfont iconjiantou1"></span>
      </hmcell>
      <hmcell title="我的跟帖" desc="跟帖/回复"
        ><span class="iconfont iconjiantou1"></span>
      </hmcell>
      <hmcell
        title="我的收藏"
        desc="文章/视频"
        @click="$router.push('/starArticle')"
        ><span class="iconfont iconjiantou1"></span>
      </hmcell>
      <hmcell title="设置"><span class="iconfont iconjiantou1"></span> </hmcell>
    </div>
    <hmbutton @click="loginOut" type="danger">退出</hmbutton>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell.vue";
import hmbutton from "@/components/hmbutton.vue";
import { userInfo } from "@/apis/user.js";
import axios from "@/utils/myaxios";
import { dateFormat } from "@/utils/myfilter.js";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  components: {
    hmcell,
    hmbutton,
  },
  filters: {
    dateFormat,
  },
  async mounted() {
    try {
      let res = await userInfo(this.$route.params.id);
      res.data.data.head_img = axios.defaults.baseURL + res.data.data.head_img;
      this.userInfo = res.data.data;
    } catch {
      alert("获取信息失败");
    }
  },
  methods: {
    loginOut() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      this.$router.push({ path: "/index" });
    },
  },
};
</script>

<style lang="less" scoped>
.pensonal {
  .container {
    display: flex;
    width: 320 * 100vw/360;
    height: 80px;
    padding: 20 * 100vw/360;
    border-bottom: 5px solid #ccc;
    justify-content: space-between;
    align-items: center;
    .left {
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      margin-left: 10px;
      justify-content: space-between;
      align-items: center;
      .middle {
        .middle_hd {
          color: skyblue;
          .username {
            padding-left: 3px;
            color: #000;
            font-size: 14px;
            vertical-align: unset;
          }
          .iconxingbienv {
            color: pink;
          }
        }
        .middle_ft {
          margin-top: 10px;
          color: #666;
        }
      }
    }
  }
  .container_footer {
    padding: 0 20 * 100vw/360;
  }
}
</style>