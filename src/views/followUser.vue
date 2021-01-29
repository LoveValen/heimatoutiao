<template>
  <div class="container">
    <hmheader title="我的关注">
      <span
        slot="left"
        class="iconfont iconjiantou"
        @click="$router.go(-1)"
      ></span>
    </hmheader>
    <div
      class="followList"
      v-for="(value, index) in followsList"
      :key="value.id"
    >
      <div class="left">
        <img :src="value.head_img" alt="" />
      </div>
      <div class="middle">
        <span>{{ value.nickname }}</span>
        <span>{{ value.create_date | dateFormat }}</span>
      </div>
      <div class="right" @click="cancleFollow(value.id, index)">取消关注</div>
    </div>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue";
import { unfollows, userFollows } from "@/apis/user.js";
import axios from "@/utils/myaxios.js";
import { dateFormat } from "@/utils/myfilter.js";
export default {
  data() {
    return {
      axios,
      followsList: [],
    };
  },
  components: {
    hmheader,
  },
  filters: {
    dateFormat,
  },
  async mounted() {
    let res = await userFollows();
    console.log(res);
    this.followsList = res.data.data.map((value) => {
      value.head_img = axios.defaults.baseURL + value.head_img; // 拼接头像路径
      return value;
    });
  },
  methods: {
    async cancleFollow(id, index) {
      await unfollows(id);
      this.followsList.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  // width: 100%;
  .followList {
    box-sizing: border-box;
    padding: 0 10 * 100vw/360;
    width: 100vw;
    height: 80 * 100vw/360;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eee;
    border-bottom: 1px solid #aaa;
    .left {
      flex: 1;
      img {
        width: 50 * 100vw/360;
        height: 50 * 100vw/360;
        border-radius: 50%;
      }
    }
    .middle {
      flex: 3;
      height: 50 * 100vw/360;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .right {
      flex: 1;
      // width: 60 * 100vw/360;
      height: 30 * 100vw/360;
      background-color: #c6c6c6;
      border-radius: 15 * 100vw/360;
      line-height: 30 * 100vw/360;
      text-align: center;
      color: #fff;
      font-size: 12 * 100vw/360;
    }
  }
}
</style>