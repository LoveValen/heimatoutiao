<template>
  <div class="container">
    <van-sticky @scroll="scrolltop">
      <div class="white" :class="{ current: isTop }">
        <hmheader title="精彩跟帖">
          <span
            slot="left"
            class="iconfont iconjiantou"
            @click="$router.go(-1)"
          ></span>
        </hmheader>
      </div>
    </van-sticky>
    <div class="comment_content" v-for="value in commentlist" :key="value.id">
      <div class="container_top">
        <div class="content_left">
          <img :src="value.user.head_img" alt="" />
        </div>
        <div class="middle">
          <span>{{ value.user.nickname }}</span>
          <span>{{ value.create_date | offsetTimeFormat }}</span>
        </div>
        <div class="content_right" @click="replycomment(value.id)">回复</div>
      </div>
      <!-- 嵌套评论 -->
      <hmcommentitem v-if="value.parent" :parent="value.parent"></hmcommentitem>
      <div class="container_bottom">{{ value.content }}</div>
    </div>
    <div class="bottom">
      <hmcommentfooter
        :article="article"
        @reflashData="reflashData"
        :comment="temp"
      ></hmcommentfooter>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/myaxios.js";
import { comment, getArticleDetail } from "@/apis/post.js";
import { offsetTimeFormat } from "@/utils/myfilter.js";
import hmheader from "@/components/hmheader.vue";
import hmcommentitem from "@/components/hmcommentitem.vue";
import hmcommentfooter from "@/components/hmcommentfooter.vue";
export default {
  components: {
    hmheader,
    hmcommentitem,
    hmcommentfooter,
  },
  filters: {
    offsetTimeFormat,
  },
  data() {
    return {
      isTop: false,
      commentlist: [],
      article: {},
      temp: {},
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    // 滚动事件
    scrolltop(params) {
      if (params.scrollTop == 0) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    },
    async init() {
      let res = await comment(this.$route.params.id);
      this.commentlist = res.data.data;
      this.commentlist = this.commentlist.map((value) => {
        value.user.head_img = axios.defaults.baseURL + value.user.head_img;
        return value;
      });
      // 获取文章详情
      this.article = (await getArticleDetail(this.$route.params.id)).data.data;
    },
    // 更新数据
    reflashData() {
      this.init();
      window.scrollTo(0, 0); //回到顶部
    },
    replycomment(value) {
      this.temp = { id: value };
    },
  },
};
</script>

<style lang="less" scoped>
.white {
  background-color: #fff;
}
.current {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
}
.container {
  margin-bottom: 100 * 100vw/360;
}

.comment_content {
  padding: 5 * 100vw/360;
  border-bottom: 2px solid #ccc;
  .container_top {
    display: flex;
    justify-content: center;
    align-items: center;
    .content_left {
      flex: 1;
      img {
        display: block;
        margin: 0 auto;
        width: 50 * 100vw/360;
        height: 50 * 100vw/360;
        border-radius: 50%;
        border: 1px solid #eee;
      }
    }
    .middle {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span:nth-child(2) {
        margin-top: 10 * 100vw/360;
        color: #999;
      }
    }
    .content_right {
      flex: 1;
      margin-top: 5 * 100vw/360;
      align-self: flex-start;
      text-align: end;
      padding-right: 10 * 100vw/360;
      color: #888;
    }
  }
  .container_bottom {
    margin: 10 * 100vw/360;
  }
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>