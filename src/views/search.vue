<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model.trim="keyword"
        placeholder="请输入搜索关键词"
        shape="round"
        @keydown.enter="onSearch"
      >
      </van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <div class="historyList">
      <h2>
        搜索记录<span style="float: right" @click="handlerDel">清空</span>
      </h2>
      <span
        v-for="(value, index) in $store.state.historyList"
        :key="index"
        @click="handlerSearch(value)"
      >
        {{ value }}
      </span>
    </div>
    <div class="historyList" v-show="isShowTips">
      <h2>搜索结果</h2>
      <ul>
        <li
          v-for="value in resultList"
          :key="value.id"
          @click="$router.push({ path: 'articleDetail/' + value.id })"
        >
          <span class="title">{{ value.title }}</span>
        </li>
        <li v-show="resultList.length == 0 ? true : false">
          没有搜索到任何内容
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { postSearch, postRecommend } from "@/apis/post.js";
export default {
  data() {
    return {
      // 显示与隐藏搜索记录
      isShowTips: false,
      // 搜索关键字
      keyword: "",
      // 搜索结果
      resultList: [],
    };
  },
  mounted() {
    console.log(this.$store.state.historyList);
    // 进入搜索页时，搜索框聚焦
    let input = document.querySelector(".van-field__control");
    input.focus();
    // 获取历史记录
    this.$store.commit(
      "restoreHistory",
      JSON.parse(localStorage.getItem("searchHistory")) || []
    );
  },
  methods: {
    handlerSearch(val) {
      this.keyword = val;
      this.init();
    },
    onSearch() {
      this.init();
    },
    handlerDel() {
      this.$store.commit("removeHistory");
    },
    async init() {
      if (!this.keyword) {
        // 如果输入框的值为空，则不发送请求
        return;
      }
      let res = await postSearch({ keyword: this.keyword });
      // console.log(res);
      this.resultList = res.data.data; // 搜索结果
      this.isShowTips = true; // 显示搜索结果
      this.$store.commit("addHistory", this.keyword);
    },
  },
  watch: {
    // 监听关键字的变化，如果没有就隐藏搜素结果
    keyword(val) {
      if (!val) {
        this.isShowTips = false;
      }
    },
    // 监听搜索历史变量，用于同步更新本地存储
    "$store.state.historyList": function (val) {
      localStorage.setItem("searchHistory", JSON.stringify(val));
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
  ul {
    li {
      height: 40px;
      line-height: 40px;
      background-color: #ccc;
      margin: 5px;
      border-radius: 6px;
      padding-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .title {
        width: 100%;
        height: 20px;
      }
    }
  }
}
</style>