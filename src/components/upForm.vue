<template>
  <form class="upload-form" id="nc-vue-upload-form" :action="path">
    <div class="torrent-file-header"></div>
    <div class="torrent-file-label">Torrents</div>
    <div class="icon-upload uploadfile">
      <input type="file" name="torrentfile" id="torrentfile" @change="handler" />
    </div>
  </form>
</template>
<script>
export default {
  name: "uploadForm",
  methods: {
    handler(event) {
      this.$emit("uploadfile", event, this);
    },
  },
  props: ["path"],
};
</script>
<style scoped lang="scss">
@import "../css/dl_variables.scss";

#nc-vue-upload-form {
  display: flex;
  position: relative;
  row-gap: 0px;
  padding-right: 2px;
  border-radius: 15px 0px 0px 15px;
  width: 100%;
  height: $column-height;

  .torrent-file-header {
    width: 45px;
    height: 100%;
    background: $bg-color url("../../img/folder.svg") bottom left no-repeat;
    background-size: 40px 40px;
    background-clip: border-box;
  }

  .icon-upload.uploadfile {
    background-color: #9f9fad;
    height: 100%;
    & input[type="file"] {
      cursor: pointer;
      font-size: 16px;
      opacity: 0;
      position: relative;
      width: $upload-width;
      z-index: 20;
    }
  }

  .torrent-file-label {
    padding-top: 10px;
    padding-right: 4px;
    height: 100%;
    background-color: $bg-color;
  }
}
</style>
