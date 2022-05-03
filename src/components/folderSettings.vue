<template>
  <div
    @click="handler"
    class="downloader-folder-settings"
    data-tippy-content="Set Download Folder"
    :data-path="path"
  ></div>
</template>
<script>
import Http from "../lib/http";
import helper from "../utils/helper";

export default {
  name: "folderSettings",
  methods: {
    handler(event) {
      let element = event.target;
      const cb = function (path) {
        let dlPath = element.getAttribute("data-path");
        if (dlPath == path) {
          helper.info("Same folder,No need to update");
          return;
        }
        let data = { ncd_downloader_dir: path };
        let url = helper.generateUrl("/apps/ncdownloader/personal/save");
        Http.getInstance(url)
          .setData(data)
          .setHandler((data) => {
            if (data.status) {
              helper.info("Download folder updated to " + path);
            }
          })
          .send();
      };
      helper.filepicker(cb);
    },
  },
  props: ["path"],
};
</script>
<style scoped lang="scss">
@import "../css/variables.scss";
.downloader-folder-settings {
  width: 45px;
  height: 100%;
  background: $bg-color url("../../img/folder.svg") bottom left no-repeat;
  background-size: 40px 40px;
  background-clip: border-box;
}
</style>
