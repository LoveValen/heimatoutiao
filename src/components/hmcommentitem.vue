<template>
  <div class="comment_content">
    <div class="container_top">
      <div class="content_left">
        <img :src="axios.defaults.baseURL + parent.user.head_img" alt="" />
      </div>
      <div class="middle">
        <span>{{ parent.user.nickname }}</span>
        <span>{{ parent.create_date | offsetTimeFormat }}</span>
      </div>
      <div class="content_right" @click="replyComment(parent)">回复</div>
    </div>
    <!-- 递归组件 -->
    <commentitem
      v-if="parent.parent"
      :parent="parent.parent"
      @send="replyComment(parent.parent)"
    ></commentitem>
    <div class="container_bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
import axios from "@/utils/myaxios.js";
import { offsetTimeFormat } from "@/utils/myfilter.js";
export default {
  name: "commentitem", // 递归组件
  props: {
    parent: {
      type: Object,
    },
  },
  filters: {
    offsetTimeFormat,
  },
  data() {
    return {
      axios,
    };
  },
  methods: {
    replyComment(parent) {
      this.$emit("send", parent); // 向父组件传递数据
    },
  },
};
</script>

<style lang="less" scoped>
.comment_content {
  padding: 5 * 100vw/360;
  border: 2px solid #ccc;
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
</style>