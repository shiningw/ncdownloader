<template>
  <button ref="button" :class="className" v-if="loading ^ 1" @click.prevent="handler">
    <slot>Download</slot>
  </button>
  <button class="bs-spinner" v-if="loading">
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" disabled></span><span
      class="visually-hidden">Loading...</span>
  </button>
</template>
<script>
export default {
  data() {
    return {
      loading: 0,
    };
  },
  methods: {
    handler(event) {
      if (this.enableLoading) this.loading = 1;
      this.$emit("clicked", event, this);
    },
  },
  name: "actionButton",
  props: {
    className: String,
    enableLoading: {
      type: Boolean,
      default: false,
    },
    btnType: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss">
@import "../css/bootstrap.scss";
@import "../css/btn.scss";

.check-button {
  @extend .btn;
}
</style>
