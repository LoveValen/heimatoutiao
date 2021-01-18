<template>
  <div>
    <input
      class="hminput"
      :class="{ success: flag, error: !flag }"
      @input="handlerinput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    ruler: {
      type: RegExp,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    handlerinput(e) {
      this.$emit("input", e.target.value);
      if (this.ruler.test(e.target.value)) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hminput {
  width: 318 * 100vw/360;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 2px solid #666;
  margin-bottom: 20px;
}
.success {
  border-bottom: 2px solid #67c23a;
}

.error {
  border-bottom: 2px solid #f56c6c;
}
</style>