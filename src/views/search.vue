<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <!-- <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form> -->
    <div class="header">
      <form action="/">
        <van-search
          v-model="searchText"
          show-action
          shape="round"
          background="#3296fa"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultShow = false"
        />
      </form>
    </div>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "@/components/search-history";
import SearchSuggestion from "@/components/search-suggestion";
import SearchResult from "@/components/search-result";
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: [], // 搜索的历史记录数据
    };
  },
  computed: {},
  watch: {
    searchHistories(value) {},
  },
  methods: {
    onSearch(value) {},
    // 返回
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  // padding-top: 108px;
  // .van-search {
  //   flex: 1;
  //   padding: 5px 12px;
  // }
  .van-search__action {
    color: #fff;
    font-size: 16px;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>