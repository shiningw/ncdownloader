<template>
  <section id="ncdownloader-settings-collapsible-container">
    <div class="ncdownloader-settings-item" :data-tippy-content="tippy">
      <toggleButton
        :disabledText="toggleText"
        :enabledText="toggleText"
        :defaultStatus="toggleStatus"
        @changed="toggle"
      ></toggleButton>
    </div>
    <div class="ncdownloader-settings-item">
      <a :href="personal.url" title="">
        <button>{{ personal.title }}</button>
      </a>
    </div>
    <div class="ncdownloader-settings-item" v-if="isAdmin">
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
const basePath = "/apps/ncdownloader";

export default {
  name: "settingsBar",
  inject: ["settings"],
  data() {
    let personal = {
      title: t("ncdownloader", "Personal Settings"),
      url: this.settings.personal_url,
    };
    let admin = {
      title: t("ncdownloader", "Admin Settings"),
      url: this.settings.admin_url,
    };
    return {
      personal: personal,
      admin: admin,
      isAdmin: this.settings.is_admin,
      sectionName: t("ncdownloader", "Settings"),
      toggleText: t("ncdownloader", "Hide Errors"),
      toggleStatus: helper.str2Boolean(this.settings.ncd_hide_errors),
      tippy: t("ncdownloader", "enable this to hide errors"),
    };
  },
  created() {},
  methods: {
    toggle(value) {
      let data = {};
      data["ncd_hide_errors"] = value ? 1 : 0;
      const url = helper.generateUrl(basePath + "/personal/save");
      Http.getInstance(url)
        .setData(data)
        .setHandler((resp) => {
          if (resp["message"]) {
            helper.message(t("ncdownloader", resp["message"]), 1000);
          }
        })
        .send();
    },
  },
  components: {
    toggleButton,
  },
  provide() {
    return {
      settings,
    };
  },

  mounted() {},
};
</script>

<style lang="scss">
@import "css/variables.scss";
#ncdownloader-settings-collapsible-container {
  display: flex;
  flex-flow: column wrap;
}
</style>
