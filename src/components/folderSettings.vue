<template>
  <button
    type="button"
    @click="handler"
    class="downloader-folder-settings"
    :data-tippy-content="title"
    :data-path="path"
    :title="title"
    :aria-label="title"
  >
    {{ buttonLabel }}
  </button>
</template>
<script>
import { translate as t } from "@nextcloud/l10n";
import helper from "../utils/helper";

export default {
  name: "folderSettings",
  computed: {
    title() {
      return t("vapor", "Set Download Folder");
    },
    buttonLabel() {
      return t("vapor", "Choose folder");
    },
  },
  methods: {
    handler(event) {
      let element = event.currentTarget;
      const cb = function (path) {
        let dlPath = element.getAttribute("data-path");
        if (dlPath == path) {
          helper.info("Same folder,No need to update");
          return;
        }
        let data = { ncd_downloader_dir: path };
        let url = helper.generateUrl("/apps/vapor/personal/save");
        helper
          .httpClient(url)
          .setData(data)
          .setHandler((data) => {
            if (data.status) {
              helper.info("Download folder updated to " + path);
            }
          })
          .send();
      };
      let dlPath = element.hasAttribute("data-path")
        ? element.getAttribute("data-path")
        : undefined;
      helper.filepicker(cb, dlPath);
    },
  },
  props: ["path"],
};
</script>
<style scoped lang="scss">
@import "../css/variables.scss";

.downloader-folder-settings {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  min-height: 42px;
  height: 100% !important;
  padding: 0 12px !important;
  border: 1px solid var(--color-border, #5a5a5a) !important;
  border-radius: var(--border-radius-element, 4px);
  background-color: var(--color-main-background, #fff) !important;
  color: var(--color-main-text, #222) !important;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 600;
  font-size: 14px;

  &:hover,
  &:focus {
    background-color: var(--color-background-hover, #eef4f8) !important;
  }
}

@media only screen and (max-width: 768px) {
  .downloader-folder-settings {
    min-width: 100%;
    padding: 0 10px !important;
  }
}
</style>
