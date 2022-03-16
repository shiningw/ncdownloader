<template>
  <div class="search-input" id="nc-vue-search-input">
    <textInput :placeholder="placeholder" dataType="search"></textInput>
    <div class="search-controls-container">
      <div id="select-value-search-container">
        <select :value="selected" @change="selectHandler" id="select-value-search">
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
import { translate as t } from "@nextcloud/l10n";

export default {
  data() {
    return {
      placeholder: t("ncdownloader", "Enter keyword to search"),
      selected: "sliderkz",
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
    selectHandler(event) {
      const data = {};
      const element = event.target;
      data.key = element.value;
      data.label = element.options[element.selectedIndex].text;
      this.$emit("optionSelected", data);
    },
  },
  name: "searchInput",
  props: {
    selectOptions: Object,
  },
};
</script>
<style scoped lang="scss">
@import "../css/variables.scss";
</style>
