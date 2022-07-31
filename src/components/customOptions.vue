<template>
  <div class="section" :class="[classes]" :id="container">
    <h3 class="title">{{ title }}</h3>
    <div classs="button-container" :id="id" :path="path">
      <editableRow
        v-for="(option, key) in rows"
        v-bind:key="key"
        :value="option.value"
        :name="option.name"
        :placeholder="option.placeholder"
      />
      <button
        class="custom-settings-add-btn"
        @click.prevent="newOption($event, name)"
        data-tippy-content="Add new options"
      >
        <slot name="add">New Option</slot>
      </button>
      <button
        class="custom-settings-save-btn"
        @click.prevent="saveOptions"
        :data-rel="id"
      >
        <slot name="save">Save</slot>
      </button>
    </div>
  </div>
</template>
<script>
import helper from "../utils/helper";
import settingsForm from "../lib/settingsForm";
import editableRow from "./editableRow";

export default {
  name: "customOptions",
  props: {
    path: String,
    name: {
      type: String,
      default: "settings",
    },
    title: {
      type: String,
      default: "Custom Settings",
    },
    classes: String,
    validOptions: Array,
    options: Array,
  },
  data() {
    return {
      id: "custom-" + this.name,
      classes: "custom-settings-container",
      container: "custom-settings-container",
      validOptions: this.validOptions,
      options: [],
    };
  },
  components: {
    editableRow,
  },
  computed: {
    rows() {
      return this.options;
    },
  },
  methods: {
    newOption(e, baseName) {
      e.stopPropagation();
      let element = e.target;
      let nodeList, key, value;
      nodeList = document.querySelectorAll(`[id^='${baseName}-key']`);
      if (nodeList.length === 0) {
        key = `${baseName}-key-1`;
        value = `${baseName}-value-1`;
      } else {
        let index = nodeList.length + 1;
        key = `${baseName}-key-${index}`;
        value = `${baseName}-value-${index}`;
        //selector = `[id^='${baseName}-key']`;
      }
      let form = settingsForm.getInstance();
      element.before(form.createInputGroup(key, value));
      helper.autoComplete(`[id^='${baseName}-key']`, this.validOptions);
    },
    saveOptions(e) {
      let element = e.target;
      let container = element.getAttribute("data-rel");
      let data = helper.getData(container);
      let url = helper.generateUrl(data._path);
      data = helper.transformParams(data, this.name);
      let badOptions = [];
      for (let name in data) {
        if (!this.validOptions.includes(name)) {
          badOptions.push(name);
        }
      }
      if (badOptions.length > 0) {
        helper.error("invalid options: " + badOptions.join(","));
        return;
      }
      helper
        .httpClient(url)
        .setData(data)
        .setHandler((resp) => {
          if (resp.error) {
            helper.error(resp.error);
            return;
          }
          this.options = [];
          for (let key in data) {
            this.options.push({ name: key, value: data[key] });
          }
          let inputDiv = element.parentElement.querySelectorAll(
            `div[id^='${this.name}-key']`
          );
          if (inputDiv && inputDiv.length > 0) {
            inputDiv.forEach((element) => {
              element.remove();
            });
          }
          helper.info(resp.message);
        })
        .send();
    },
  },
  mounted() {
    this.$emit("mounted", event, this);
  },
};
</script>
<style scoped lang="scss"></style>
