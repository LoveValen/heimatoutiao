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
  box-sizing: border-box;
  // width: 320 * 100vw/360;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20 * 100vw/360;
  div:nth-child(1),
  div:nth-child(3) {
    flex: 1;
  }
  div:nth-child(3) {
    text-align: end;
  }
  div:nth-child(2) {
    flex: 3;
    text-align: center;
    font-weight: 700;
  }
}
</style>