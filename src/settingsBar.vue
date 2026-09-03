<template>
  <section id="vapor-settings-collapsible-container">
    <div class="vapor-settings-item" :data-tippy-content="errorTooltip">
      <toggleButton
        :disabledText="errorText"
        :enabledText="errorText"
        :defaultStatus="toggleStatus"
        @changed="toggle"
        name="ncd_hide_errors"
      ></toggleButton>
    </div>
    <div class="vapor-settings-item" :data-tippy-content="btTooltip">
      <toggleButton
        v-if="isAdmin"
        disabledText="Disable BT for non-admin users"
        enabledText="Disable BT for non-admin users"
        :defaultStatus="btStatus"
        name="ncd_disable_bt"
        @changed="toggle"
      ></toggleButton>
    </div>
    <div class="vapor-settings-item">
      <a :href="personal.url" title="">
        <button>{{ personal.title }}</button>
      </a>
    </div>
    <div class="vapor-settings-item" v-if="isAdmin">
      <a :href="admin.url" :title="admin.title">
        <button>{{ admin.title }}</button>
      </a>
    </div>
  </section>
</template>

<script>
import toggleButton from "./components/toggleButton";
import helper from "./utils/helper";
import { translate as t, translatePlural as n } from "@nextcloud/l10n";
import Http from "./lib/http";
const basePath = "/apps/vapor";

export default {
  name: "settingsBar",
  inject: ["settings"],
  data() {
    let personal = {
      title: t("vapor", "Personal Settings"),
      url: this.settings.personal_url,
    };
    let admin = {
      title: t("vapor", "Admin Settings"),
      url: this.settings.admin_url,
    };
    return {
      personal: personal,
      admin: admin,
      isAdmin: this.settings.is_admin,
      sectionName: t("vapor", "Settings"),
      errorText: t("vapor", "Hide Errors"),
      toggleStatus: helper.str2Boolean(this.settings.ncd_hide_errors),
      btStatus: helper.str2Boolean(this.settings.ncd_disable_bt),
      errorTooltip: t("vapor", "Enable this to hide errors"),
      btTooltip: t("ncdownload", "Disable BT for non-admin users"),
    };
  },
  created() {},
  methods: {
    toggle(name, value) {
      let data = {};
      data[name] = value ? 1 : 0;
      let path = (name == "ncd_disable_bt") ? "/admin/save" : "/personal/save";
      const url = helper.generateUrl(basePath + path);
      helper.httpClient(url)
        .setData(data)
        .setHandler((resp) => {
          if (resp["message"]) {
            helper.message(t("vapor", resp["message"]), 1000);
          }
        })
        .send();
    },
  },
  components: {
    toggleButton,
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "css/variables.scss";
#vapor-settings-collapsible-container {
  display: flex;
  flex-flow: column wrap;
}
</style>
