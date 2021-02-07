<template>
  <div>
    <h1>state的数据</h1>
    <!-- <div>{{ $store.state.name }}</div>
    <div>{{ $store.state.userInfo.name }}</div> -->
    <div>{{ name }}</div>
    <div>{{ userInfo.name }}</div>
    <div>{{ userInfo.age }}</div>
    <div>{{ userInfo.gender }}</div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapState } from "vuex";
export default {
  computed: {
    // name() {
    //   return this.$store.state.name;
    // },
    ...mapState(["name", "userInfo"]),
  },
};
</script>

<style>
</style>