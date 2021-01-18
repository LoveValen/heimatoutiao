<template>
  <div
    class="btn"
    :class="{ primary: type == 'primary', danger: type == 'danger' }"
    @click="handlerclick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handlerclick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin: 0 auto;
  width: 318 * 100vw/360;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 8px;
  background-color: #909399;
  font-size: 18px;
}
.primary {
  background-color: #67c23a;
  color: #fff;
}
.danger {
  background-color: #f56c6c;
  color: #fff;
}
</style>