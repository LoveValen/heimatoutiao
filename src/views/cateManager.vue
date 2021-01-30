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
        <span v-for="value in cateList" :key="value.id">{{ value.name }}</span>
      </div>
    </div>
    <div class="youchannel">
      <h3>点击添加频道</h3>
      <div class="list">
        <span>体育</span>
      </div>
    </div>
  </div>
</template>


<script>
import hmheader from "@/components/hmheader.vue";
import { columnList, addColumnList } from "@/apis/category.js";
export default {
  components: {
    hmheader,
  },
  data() {
    return {
      cateList: [],
    };
  },
  async mounted() {
    let res = await columnList();
    this.cateList = res.data.data;
    console.log(res);
    //   let res = await addColumnList();
    //   console.log(res);
  },
  methods: {},
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