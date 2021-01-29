<template>
  <div class="comment" v-if="isFocus">
    <input class="left" placeholder="写跟帖" @focus="commentFocus" />
    <div class="right">
      <span
        class="one"
        @click="$router.push({ path: '/goodcomments/' + article.id })"
      >
        <span class="iconfont iconpinglun-"></span>
        <i>{{ article.comment_length }}</i>
      </span>
      <span
        ><van-icon
          name="star-o"
          @click="starArticle"
          :class="{ active: isStar }"
      /></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
  <div class="writeComment" v-else>
    <div class="left">
      <textarea ref="commtext" rows="5" v-model="content">回复：</textarea>
    </div>
    <div class="right">
      <span @click="publishComment">发 送</span>
      <span @click="isFocus = !isFocus">取 消</span>
    </div>
  </div>
</template>

<script>
import { star, publishcomment } from "@/apis/post.js";
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
      default: null,
    },
  },
  watch: {
    comment() {
      this.isFocus = false;
    },
  },
  data() {
    return {
      isFocus: true, // 是否聚焦
      isStar: false, // 控制收藏图标样式
      content: "", // 输入框的内容
    };
  },
  methods: {
    commentFocus() {
      this.isFocus = !this.isFocus;
    },
    // 收藏
    async starArticle() {
      let res = await star(this.$route.params.id);
      if (res.status == 200) {
        this.$toast({ message: res.data.message });
        this.isStar = !this.isStar;
      }
    },
    async publishComment() {
      let data = {
        content: this.content,
        parent_id: this.comment.id,
      };
      let res = await publishcomment(this.article.id, data);
      // console.log(res);
      this.$emit("reflashData");
      this.content = ""; // 清空输入框的数据
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  box-sizing: border-box;
  width: 100vw;
  height: 65 * 100vw/360;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25 * 100vw/360 10 * 100vw/360 10 * 100vw/360;
  background-color: #fff;
  .left {
    flex: 3;
    height: 30 * 100vw/360;
    background-color: #cfcfcf;
    border-radius: 15 * 100vw/360;
    outline: none;
    border: none;
    padding-left: 20px;
    &::placeholder {
      color: #333;
      font-size: 14 * 100vw/360;
    }
  }
  .right {
    flex: 2;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      text-align: center;
      font-size: 20 * 100vw/360;
    }
    .one {
      position: relative;
      i {
        box-sizing: border-box;
        position: absolute;
        top: -8px;
        left: 15px;
        padding: 3 * 100vw/360 7 * 100vw/360;
        height: 16 * 100vw/360;
        border-radius: 10 * 100vw/360;
        background-color: #f00;
        color: #fff;
        font-size: 10 * 100vw/360;
      }
    }
    .active {
      color: #f00;
    }
  }
}
.writeComment {
  box-sizing: border-box;
  width: 100vw;
  height: 105 * 100vw/360;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25 * 100vw/360 10 * 100vw/360 10 * 100vw/360;
  background-color: #fff;
  .left {
    flex: 4;
    textarea {
      width: 100%;
      border: none;
      resize: none;
      background-color: #cfcfcf;
      border-radius: 8px;
    }
  }
  .right {
    flex: 1;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span {
      width: 100%;
      height: 30 * 100vw/360;
      background-color: #f00;
      border-radius: 15 * 100vw/360;
      text-align: center;
      line-height: 30 * 100vw/360;
      color: #fff;
      margin: 8px 0;
    }
  }
}
</style>