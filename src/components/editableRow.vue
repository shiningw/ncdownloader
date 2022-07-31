<template>
  <div :id="name">
    <label :for="name">{{ name }}</label>
    <input
      type="text"
      :id="name"
      :name="name"
      :value="value"
      placeholder="Leave empty if no value needed"
      class="form-input-text"
    />
    <button class="has-content icon-close" @click="remove"></button>
  </div>
</template>
<script>
export default {
  name: "editableRow",
  props: {
    name: String,
    value: String,
    placeholder: String,
  },
  data() {
    return {};
  },
  methods: {
    remove(e) {
      let ele = e.target;
      let container = ele.closest("div");
      container.remove();
    },
  },
};
</script>
