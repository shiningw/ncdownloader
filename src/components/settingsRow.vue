<template>
  <div :class="container" :path="path" :id="container">
    <label :for="id">{{ label }}</label>
    <input
      type="text"
      :class="classes"
      :id="id"
      :name="id"
      :value="value"
      :placeholder="placeholder"
      @blur="saveHandler($event)"
      :data-rel="container"
    />
    <input
      v-if="useBtn"
      type="button"
      value="save"
      :data-rel="container"
      @click.prevent="saveHandler($event)"
    />
  </div>
</template>
<script>
import helper from "../utils/helper";
export default {
  name: "settingsRow",
  props: {
    label: String,
    id: String,
    value: String,
    placeholder: String,
    path: String,
    useBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classes: this.id.replace("_", "-") + "-input",
      container: this.id.replace("_", "-") + "-container",
    };
  },
  methods: {
    saveHandler(e) {
      if (e.type == "blur" && this.useBtn) {
        return;
      }
      e.stopPropagation();
      let element = e.target;
      let data = helper.getData(element.getAttribute("data-rel"));
      let url = helper.generateUrl(data._path);
      data = helper.transformParams(data);

      helper
        .httpClient(url)
        .setData(data)
        .setHandler(function (resp) {
          if (resp.error) {
            helper.error(resp.error);
            return;
          }
          helper.info(resp.message);
        })
        .send();
    },
  },
  computed: {},
  mounted() {},
};
</script>
<style scoped></style>
