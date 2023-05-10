<template>
  <button ref="button" class="button-vue" :class="className" v-if="loading ^ 1" @click.prevent="handler">
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
<style lang="scss" scoped>
@import "../css/bootstrap.scss";
@import "../css/btn.scss";

.button-vue {
  @extend .btn;
  @include button-variant(#212529,#212529, #fff);
  border-radius: 0em;
}
</style>
