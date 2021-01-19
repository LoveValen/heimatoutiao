<template>
  <div>
    <input
      class="hminput"
      :class="{ success: flag, error: !flag }"
      @input="handlerinput"
      @change="handlerchange"
      :msg="msg"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    ruler: {
      type: RegExp,
    },
    msg: {
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
      if (this.ruler) {
        if (this.ruler.test(e.target.value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      this.$emit("input", e.target.value);
    },
    handlerchange(e) {
      if (this.ruler) {
        if (!this.ruler.test(e.target.value)) {
          this.$toast.fail({
            message: this.msg,
            options: "top",
          });
        }
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