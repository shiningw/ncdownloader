<template>
  <div class="search-input" id="nc-vue-search-input">
    <textInput :placeholder="placeholder" dataType="search"></textInput>
    <div class="search-controls-container">
      <div id="select-value-search">
        <select :value="selected">
          <option
            v-for="(option, key) in selectOptions"
            v-bind:key="key"
            :value="option.name"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <actionButton className="search-button" :enableLoading="true" @clicked="search"
        >Search</actionButton
      >
    </div>
  </div>
</template>
<script>
import textInput from "./textInput";
import actionButton from "./actionButton";

export default {
  data() {
    return {
      placeholder: "Enter keyword to search",
      selected: "TPB",
      selectOptions: [
        { name: "TPB", label: "THEPIRATEBAY" },
        { name: "bitSearch", label: "BITSEARCH" },
      ],
    };
  },
  components: {
    textInput,
    actionButton,
  },
  methods: {
    search(event, btnVm) {
      this.$emit("search", event, btnVm);
    },
  },
  name: "searchInput",
  props: [],
};
</script>
<style scoped lang="scss">
@import "../css/variables.scss";
</style>
