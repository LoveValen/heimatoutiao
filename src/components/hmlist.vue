<template>
  <!-- 图片少于3张情况下 -->
  <div
    class="container"
    v-if="post.type === 1 && post.cover.length <= 2"
    @click="$router.push({ path: `/articleDetail/${post.id}` })"
  >
    <div class="container_left">
      <div class="left_top">
        {{ post.title }}
      </div>
      <div class="left_bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comments || 0 }}跟帖</span>
      </div>
    </div>
    <div class="container_right">
      <img
        v-for="(value, index) in post.cover"
        :src="axios.defaults.baseURL + value.url"
        alt=""
        :key="index"
      />
    </div>
  </div>
  <!-- 图片多于3张情况下 -->
  <div
    class="container1"
    v-else-if="post.type === 1 && post.cover.length > 2"
    @click="$router.push({ path: `/articleDetail/${post.id}` })"
  >
    <div class="container_top">
      {{ post.title }}
    </div>
    <div class="container_middle">
      <img
        v-for="(value, index) in post.cover"
        :src="axios.defaults.baseURL + value.url"
        alt=""
        :key="index"
      />
    </div>
    <div class="container_bottom">
      <span>{{ post.user.nickname }}</span>
      <span>{{ post.comment_length }}跟帖</span>
    </div>
  </div>
  <!-- 存在视频情况下 -->
  <div
    class="container1"
    v-else-if="post.type === 2 && post.cover.length <= 2"
    @click="$router.push({ path: `/articleDetail/${post.id}` })"
  >
    <div class="container_top">
      {{ post.title }}
    </div>
    <div class="container_middle_video">
      <img
        v-for="(value, index) in post.cover"
        :src="axios.defaults.baseURL + value.url"
        alt=""
        :key="index"
      />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <div class="container_bottom">
      <span>{{ post.user.nickname }}</span>
      <span>{{ post.comment_length }}跟帖</span>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/myaxios.js";
export default {
  props: {
    // 文章标题
    post: {
      type: Object,
    },
  },
  data() {
    return {
      axios,
    };
  },
};
</script>

<style lang="less" scoped>
// 图片少于3张情况下
.container {
  box-sizing: border-box;
  padding: 15 * 100vw/360 5 * 100vw/360;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #f2f2f2;
  border-bottom: 2px solid #bbb;
  .container_left {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .left_top {
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2; //在第几行显示...
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .left_bottom {
      span:nth-child(1) {
        font-size: 12px;
        color: #888;
      }
      span:nth-child(2) {
        font-size: 12px;
        margin-left: 6px;
        color: #888;
      }
    }
  }
  .container_right {
    align-self: center;
    img {
      width: 100 * 100vw/360;
      height: 60 * 100vw/360;
      object-fit: cover;
    }
  }
}
// 图片多于3张或有视频情况下
.container1 {
  box-sizing: border-box;
  padding: 15 * 100vw/360 5 * 100vw/360;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f2f2f2;
  border-bottom: 2px solid #bbb;
  .container_top {
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; //在第几行显示...
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .container_middle {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    img {
      width: 115 * 100vw/360;
      height: 60 * 100vw/360;
      object-fit: cover;
    }
  }
  .container_middle_video {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 170 * 100vw/360;
    padding: 5px 0;
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .playicon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 0px 0px 15px #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      .van-icon {
        font-size: 40px;
        color: #fff;
        line-height: 60px;
      }
    }
  }
  .container_bottom {
    span:nth-child(1) {
      font-size: 12px;
      color: #888;
    }
    span:nth-child(2) {
      font-size: 12px;
      margin-left: 6px;
      color: #888;
    }
  }
}
</style>