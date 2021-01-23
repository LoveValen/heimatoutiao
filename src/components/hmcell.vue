<template>
  <div class="cell" @click="handlerClick">
    <div class="left">
      <span>{{ title }}</span>
      <span>{{ desc }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  methods: {
    handlerClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  width: 320 * 100vw/360;
  height: 70px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span:nth-child(2) {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>