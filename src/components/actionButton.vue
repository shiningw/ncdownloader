<template>
  <div v-bind:class="className">
    <button class="btn btn-primary" v-if="loading ^ 1" @click.prevent="handler">
      <slot>Download</slot>
    </button>
    <button class="bs-spinner" v-if="loading">
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        disabled
      ></span
      ><span class="visually-hidden">Loading...</span>
    </button>
  </div>
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
    enableLoading: Boolean,
  },
};
</script>
<style lang="scss">
@import "../css/variables.scss";
button {
  cursor: pointer;
  border-radius: 0px;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #7d7f7d;
  border-color: #7d7f7d;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
</style>
