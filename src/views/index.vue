<template>
  <div class="index">
    <div class="top">
      <div class="left iconfont iconnew"></div>
      <div class="search">
        <div class="van-icon van-icon-search"></div>
        <div>搜索新闻</div>
      </div>
      <div class="right van-icon van-icon-user-circle-o"></div>
    </div>
    <!-- 导航栏 -->
    <div class="tab">
      <van-tabs v-model="active" swipeable active>
        <van-tab
          v-for="(value, index) in columnList"
          :title="value.name"
          :key="index"
        >
          <div class="content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="container"></div>
  </div>
</template>

<script>
import { columnList, postList } from "@/apis/post.js";
export default {
  data() {
    return {
      columnList: "",
      active: localStorage.getItem("token") ? 1 : 0,
    };
  },
  async mounted() {
    let resColumn = await columnList();
    // console.log(resColumn);
    // 获取栏目列表
    this.columnList = resColumn.data.data;
    // 获取文章列表
    let resPost = await postList(this.columnList[this.active].id);
    this.columnList = this.columnList.map((value) => {
      return {
        ...value,
        postList: resPost.data.data,
      };
    });
    // console.log(this.columnList);
    // console.log(resPost);
  },
  watch: {
    active() {
      console.log(this.active);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .top {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 50 * 100vw/360;
    padding: 0 10 * 100vw/360;
    background-color: #1989fa;
    .left {
      font-size: 50 * 100vw/360;
      color: #fff;
    }
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200 * 100vw/360;
      height: 36 * 100vw/360;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 20 * 100vw/360;
      color: #fff;
      div:nth-child(1) {
        font-size: 18 * 100vw/360;
        margin-right: 5px;
      }
    }
    .right {
      font-size: 30 * 100vw/360;
      color: #fff;
    }
  }
  .tab {
    /deep/.van-tabs__wrap--scrollable .van-tabs__nav {
      background-color: #eee;
    }
    .content {
      height: 100vw;
      background-color: pink;
    }
  }
}
</style>