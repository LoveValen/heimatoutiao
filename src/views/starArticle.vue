<template>
  <div class="container">
    <hmheader title="我的收藏">
      <span
        slot="left"
        class="iconfont iconjiantou"
        @click="$router.go(-1)"
      ></span>
    </hmheader>
    <hmlist v-for="value in starList" :key="value.id" :post="value"></hmlist>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue";
import hmlist from "@/components/hmlist.vue";
import { userStar } from "@/apis/user.js";
export default {
  components: {
    hmheader,
    hmlist,
  },
  data() {
    return {
      starList: [],
    };
  },
  async mounted() {
    let res = await userStar();
    console.log(res);
    this.starList = res.data.data;
  },
  methods: {
    beforeClose() {},
  },
};
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  .delete-button {
    height: 100%;
  }
}
</style>