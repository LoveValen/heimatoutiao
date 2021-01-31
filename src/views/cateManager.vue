<template>
  <div class="catemanager">
    <hmheader title="频道管理">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </hmheader>
    <div class="mychannel">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
          v-for="(value, index) in cateList"
          :key="value.id"
          @click="removecate(index)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="youchannel">
      <h3>点击添加频道</h3>
      <div class="list">
        <span
          v-for="(value, index) in unAddCateList"
          :key="value.id"
          @click="addcate(value, index)"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>


<script>
import hmheader from "@/components/hmheader.vue";
import { columnList } from "@/apis/category.js";
export default {
  components: {
    hmheader,
  },
  data() {
    return {
      cateList: [],
      unAddCateList: [],
    };
  },
  async mounted() {
    // 获取未添加的栏目
    if (localStorage.getItem("addcatelist")) {
      this.unAddCateList = JSON.parse(localStorage.getItem("addcatelist"));
    }
    // 获取本地存储的已有栏目
    if (localStorage.getItem("catelist")) {
      this.cateList = JSON.parse(localStorage.getItem("catelist"));
    } else {
      let res = await columnList();
      this.cateList = res.data.data;
      if (localStorage.getItem("token")) {
        this.cateList = this.cateList.splice(2); // 如果已登录就截取掉前两个栏目(关注，热点)
      } else {
        this.cateList = this.cateList.splice(1); // 没有登录就删掉第一个栏目(热点)
      }
    }
  },
  methods: {
    // 移除栏目
    removecate(index) {
      this.unAddCateList.unshift(this.cateList[index]); // 向未添加组中添加已删除的栏目
      localStorage.setItem("addcatelist", JSON.stringify(this.unAddCateList)); // 将未添加栏目保存在本地
      this.cateList.splice(index, 1); // 已有栏目移除掉
      localStorage.setItem("catelist", JSON.stringify(this.cateList));
    },
    // 添加栏目
    addcate(value, index) {
      this.cateList.unshift(value); // 添加值
      localStorage.setItem("catelist", JSON.stringify(this.cateList));
      this.unAddCateList.splice(index, 1);
      localStorage.setItem("addcatelist", JSON.stringify(this.unAddCateList));
    },
  },
};
</script>


<style lang="less" scoped>
.mychannel,
.youchannel {
  padding: 10px;
  h3 {
    line-height: 30px;
    font-weight: bold;
  }
  .list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
      width: 20%;
      margin-left: 10px;
      margin-top: 10px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>