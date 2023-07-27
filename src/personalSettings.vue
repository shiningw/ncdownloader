<template>
  <div class="section ncdownloader-general-settings">
    <h3>General Settings</h3>
    <settingsRow v-for="(option, key) in optionRows" v-bind:key="key" :value="option.value" :id="option.id"
      :label="option.label" :placeholder="option.placeholder" :path="option.path" :useBtn="true" />
  </div>
  <customOptions v-if="!disallowAria2Settings || isAdmin" name="custom-aria2-settings" title="Personal Aria2 Settings"
    @mounted="renderAria2" path="/apps/ncdownloader/personal/aria2/save" :validOptions="aria2Options">
    <template #save>Save Aria2 Settings</template>
  </customOptions>
  <customOptions name="custom-ytdl-settings" title="Personal YouTube-dl Settings" @mounted="renderYtdl"
    path="/apps/ncdownloader/personal/ytdl/save" :validOptions="ytdlOptions">
    <template #save>Save Youtube-dl Settings</template>
  </customOptions>
</template>
<script>
import customOptions from "./components/customOptions";
import helper from "./utils/helper";
import aria2Options from "./utils/aria2Options";
import { options as ytdlFullOptions, names as ytdlOptions } from "./utils/ytdlOptions";
import settingsRow from "./components/settingsRow";

export default {
  name: "personalSettings",
  data() {
    return {
      options: [],
      aria2Options: aria2Options,
      ytdlOptions: ytdlOptions,
      disallowAria2Settings: false,
      isAdmin: false,
    };
  },
  components: {
    customOptions,
    settingsRow,
  },
  methods: {
    renderAria2(event, $vm) {
      helper
        .httpClient(helper.generateUrl("/apps/ncdownloader/personal/aria2/get"))
        //.setMethod("GET")
        .setHandler((data) => {
          if (!data) {
            return;
          }
          let input = [];
          for (let key in data) {
            if (aria2Options.includes(key))
              input.push({ name: key, value: data[key], id: key });
          }
          //settingsForm.getInstance($vm.container).render(input);
          $vm.options = input;
        })
        .send();
    },
    renderYtdl(event, $vm) {
      helper
        .httpClient(helper.generateUrl("/apps/ncdownloader/personal/ytdl/get"))
        //.setMethod("GET")
        .setHandler((data) => {
          if (!data) {
            return;
          }
          let input = [];
          for (let key in data) {
            if (ytdlOptions.includes(key))
              input.push({ name: key, value: data[key], id: key });
          }
          //settingsForm.getInstance($vm.container).render(input);
          $vm.options = input;
        })
        .send();
    },
  },
  computed: {
    optionRows() {
      return this.options;
    },
  },
  mounted() {
    try {
      let data = this.$el.parentElement.getAttribute("data-settings");
      data = JSON.parse(data);
      let options = this.$el.parentElement.getAttribute("data-options");
      options = JSON.parse(options);
      this.disallowAria2Settings = helper.str2Boolean(data["disallow_aria2_settings"]);
      this.isAdmin = data["is_admin"];
      this.options = options
    } catch (e) {
      helper.error(e);
    }
  },
};
</script>
