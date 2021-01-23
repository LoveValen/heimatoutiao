<template>
  <div class="header">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <!-- <slot name="title"></slot> -->
      <h4>{{ title }}</h4>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 320 * 100vw/360;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // div:nth-child(1),
  // div:nth-child(3) {
  //   width: 20px;
  //   height: 20px;
  //   line-height: 20px;
  // }
  div:nth-child(2) {
    font-weight: 700;
  }
}
</style>