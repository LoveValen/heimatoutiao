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
      <van-tabs v-model="active" swipeable sticky>
        <van-tab
          v-for="value in columnList"
          :title="value.name"
          :key="value.id"
        >
          <van-list
            v-model="value.loading"
            :finished="value.finished"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="20"
            @load="onLoad"
          >
            <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
              <!-- 列表项 -->
              <hmlist
                type="1"
                v-for="(item, index) in value.postList"
                :post="item"
                :key="index"
              ></hmlist>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { columnList } from "@/apis/category.js";
import { postList } from "@/apis/post.js";
import hmlist from "@/components/hmlist.vue";
export default {
  data() {
    return {
      columnList: [], // 栏目列表
      active: localStorage.getItem("token") ? 1 : 0, // 登录后判断是否有token，如果有，第一项栏目是关注。
    };
  },
  components: {
    hmlist,
  },
  async mounted() {
    let resColumn = await columnList();
    console.log(resColumn); // 栏目列表
    // 获取栏目列表
    this.columnList = resColumn.data.data;
    // 改造获取的数据，因为每个栏目的数据是互不干扰的，每个栏目的内容分别在单独的数组中
    this.columnList = this.columnList.map((value) => {
      return {
        ...value,
        postList: [], // 每个栏目都有一个存放该栏目数据的数组
        pageIndex: 1, // 每个栏目的页数
        pageSize: 5, // 每个栏目每页显示的条数
        loading: false, // 是否处于加载状态，加载过程中不触发load事件
        finished: false, // 是否已加载完成，加载完成后不再触发load事件
        isLoading: false, // 是否处于加载中状态
      };
    });
    // 初始化数据
    this.init();
  },
  methods: {
    async init() {
      // 获取文章列表
      let resPost = await postList({
        pageIndex: this.columnList[this.active].pageIndex, // 获取当前栏目的页码
        pageSize: this.columnList[this.active].pageSize, // 获取当前栏目的显示数量
        category: this.columnList[this.active].id,
      });
      // console.log(resPost);
      // 将数据存储(追加)到栏目的postList数组中
      this.columnList[this.active].postList.push(...resPost.data.data);
      console.log(this.columnList);
      // 本次加载结束，将loading重置为false，以便下次下拉
      this.columnList[this.active].loading = false;
      if (resPost.data.data.length < this.columnList[this.active].pageSize) {
        // 当请求回来的数据少于要显示的数量的时候，则显示完成
        this.columnList[this.active].finished = true;
      }
      // 重置下拉刷新状态
      this.columnList[this.active].isLoading = false;
    },
    // 上拉加载
    onLoad() {
      // console.log("加载了");
      this.columnList[this.active].pageIndex++; // 修改当前页面
      setTimeout(() => {
        // 加载数据
        this.init();
      }, 2000);
    },
    // 下拉刷新
    onRefresh() {
      // 清空当前栏目的数组
      this.columnList[this.active].postList.length = 0;
      // 当前页码改为1
      this.columnList[this.active].pageIndex = 1;
      // 不管有没有上拉加载，都让finished设置为false，如果上次加载到了底部，finished值会变为true，=> 再次上拉加载加载不出来了
      this.columnList[this.active].finished = false;
      this.init();
    },
  },
  watch: {
    active() {
      // console.log(this.active);
      if (this.columnList[this.active].postList.length == 0) {
        // 如果该栏目的数据数组的长度小于0则发送请求
        // 如果已经加载的话，下次就不需要在再次请求数据
        this.init();
      }
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
  }
}
</style>