<template>
  <div class="detail">
    <van-sticky @scroll="scrolltop">
      <div class="detail_top" :class="{ current: isTop }">
        <div class="detail_top_left">
          <span class="iconfont iconjiantou" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <div class="showAuthor" v-show="isTop">
          <img :src="article.user && article.user.head_img" alt="" />
          <span>{{ article.user && article.user.nickname }}</span>
        </div>
        <!-- 关注 -->
        <div
          class="detail_top_right"
          @click="followAuthor"
          :class="{ active: article.has_follow }"
        >
          {{ article.has_follow ? "已关注" : "关注" }}
        </div>
      </div>
    </van-sticky>
    <div class="detail_content">
      <div class="title">
        {{ article.title }}
      </div>
      <div class="author">
        <!-- 因为请求数据是异步非阻塞，所以数据没有响应回来时，模板已经加载，此时article.user =>undefined undefined.nickname会报错-->
        <span>{{ article.user && article.user.nickname }}</span>
        <span>{{ article.create_date | dateFormat }}</span>
      </div>
      <div class="content" v-html="article.content" v-if="article.type === 1">
        <!-- {{ article.content }} -->
      </div>
      <div class="content" v-if="article.type === 2">
        <video :src="axios.defaults.baseURL + article.content" controls></video>
      </div>
      <!-- 点赞 -->
      <div class="like">
        <div class="like_left">
          <van-icon name="good-job" :class="{ likes: article.has_like }" />
          <span @click="likeArticle">{{ article.like_length }}</span>
        </div>
        <div class="like_right">
          <span class="van-icon van-icon-wechat" style="color: #07c160"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="detail_comment">
      <div class="comment_top">精彩跟帖</div>
      <!-- 评论列表 -->
      <div v-if="comments.length != 0">
        <hmcommentitem :parent="comments[0]"></hmcommentitem>
        <div
          class="more"
          @click="$router.push({ path: '/goodcomments/' + article.id })"
        >
          更多更贴
        </div>
      </div>
      <div v-else>精彩评论，等你更新</div>
    </div>
    <div class="detail_writeComment">
      <!-- 写评论、收藏 -->
      <hmcommentfooter
        :article="article"
        :isStar="article.has_star"
      ></hmcommentfooter>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, like, comment } from "@/apis/post.js";
import { follows, unfollows } from "@/apis/user.js";
import { dateFormat } from "@/utils/myfilter.js";
import axios from "@/utils/myaxios.js";
import hmcommentfooter from "@/components/hmcommentfooter.vue";
import hmcommentitem from "@/components/hmcommentitem.vue";
export default {
  data() {
    return {
      axios,
      article: {}, // 渲染的文章详情
      isTop: false, // 头部滚动事件
      comments: [],
    };
  },
  async mounted() {
    let res = await getArticleDetail(this.$route.params.id);
    console.log(res);
    res.data.data.user.head_img =
      axios.defaults.baseURL + res.data.data.user.head_img; // 拼接头像路径
    this.article = res.data.data;
    let resComment = await comment(this.article.id);
    console.log(resComment);
    this.comments = resComment.data.data;
  },
  filters: {
    dateFormat,
  },
  methods: {
    // 滚动事件
    scrolltop(params) {
      // console.log(params);
      if (params.scrollTop == 0) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    },
    // 关注与取消关注
    async followAuthor() {
      let res;
      if (this.article.has_follow) {
        // 如果已经关注，点击就取消关注
        res = await unfollows(this.article.user.id);
      } else {
        res = await follows(this.article.user.id);
      }
      this.$toast({ message: res.data.message });
      // console.log(res);
      if (res.status == 200) {
        this.article.has_follow = !this.article.has_follow; //取反
      }
    },
    // 点赞
    async likeArticle() {
      let res = await like(this.article.id);
      if (res.status == 200) {
        this.article.has_like = !this.article.has_like;
      }
      if (this.article.has_like) {
        this.article.like_length++;
      } else {
        this.article.like_length--;
      }
    },
  },
  components: {
    hmcommentfooter,
    hmcommentitem,
  },
};
</script>

<style lang="less" scoped>
.detail {
  // 头部
  .detail_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50 * 100vw/360;
    padding: 0 15 * 100vw/360;
    background-color: #fff;
    .detail_top_left {
      display: flex;
      justify-content: center;
      align-items: center;
      .iconjiantou {
        color: #333;
        font-weight: 700;
      }
      .iconnew {
        font-size: 60 * 100vw/360;
      }
    }
    // 关注
    .detail_top_right {
      width: 60 * 100vw /360;
      height: 25 * 100vw/360;
      background-color: #f00;
      border-radius: 13 * 100vw/360;
      color: #fff;
      font-size: 13 * 100vw/360;
      text-align: center;
      line-height: 25 * 100vw/360;
    }
    .active {
      border: 1px solid #ccc;
      background-color: transparent;
      color: #222;
    }
    &.current {
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
    }
    .showAuthor {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 2s;
      img {
        width: 25 * 100vw/360;
        height: 25 * 100vw/360;
        border-radius: 50%;
      }
      span {
        color: #666;
        margin-left: 5px;
      }
    }
  }
  // 内容区域
  .detail_content {
    padding: 0 15 * 100vw/360;
    .title {
      font-size: 20 * 100vw/360;
      font-weight: 700;
      line-height: 25 * 100vw/360;
    }
    .author {
      margin: 10px 0;
      span {
        font-size: 12 * 100vw/360;
        color: #666;
      }
      span:nth-child(2) {
        margin-left: 10px;
      }
    }
    .content {
      padding: 5 * 100vw/360 0;
      line-height: 24px;
      /deep/img {
        width: 100%;
      }
      video {
        width: 100%;
      }
    }
    .like {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20 * 100vw /360;
      padding: 0 30 * 100vw /360;
      .like_left,
      .like_right {
        box-sizing: border-box;
        display: flex;
        padding: 0 10 * 100vw/360;
        justify-content: space-around;
        align-items: center;
        width: 70 * 100vw /360;
        height: 30 * 100vw/360;
        border-radius: 15 * 100vw/360;
        border: 1px solid #ccc;
        background-color: transparent;
        color: #222;
      }
      .like_left {
        display: flex;
        justify-content: center;
        span:nth-child(2) {
          margin-left: 5px;
        }
      }
      .likes {
        color: #f00;
      }
    }
  }
  // 评论区域
  .detail_comment {
    border-top: 5px solid #ccc;
    // border-bottom: 2px solid #ccc;
    .comment_top {
      padding: 20 * 100vw/360;
      font-size: 20 * 100vw/360;
      text-align: center;
    }
    .more {
      margin: 20 * 100vw/360 auto;
      width: 120 * 100vw/360;
      height: 40 * 100vw/360;
      text-align: center;
      line-height: 40 * 100vw/360;
      background-color: #bbb;
      border-radius: 20 * 100vw/360;
    }
  }
}
</style>