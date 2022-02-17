<template>
  <form class="upload-file-form" id="nc-vue-upload-file-form" :action="path">
    <div class="icon-upload fileinput">
      <input type="file" name="torrentfile" id="torrentfile" accept=".torrent" @change="handler" />
    </div>
  </form>
</template>
<script>
export default {
  name: "uploadFile",
  methods: {
    handler(event) {
      this.$emit("uploadfile", event, this);
    },
  },
  props: ["path"],
};
</script>
<style scoped lang="scss">
@import "../css/variables.scss";
#nc-vue-upload-file-form {
  .icon-upload {
    background-image: url("../../img/upload.svg");
  }
  .icon-upload.fileinput {
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
}
</style>
