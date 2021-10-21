<template>
  <form class="main-form" id="nc-vue-unified-form" :action="path">
    <div class="options-group">
      <button class="magnet-link http-link" @click.prevent="whichType('aria2')">
        HTTP/MAGNET
      </button>
      <button class="youtube-dl-link" @click.prevent="whichType('youtube-dl')">
        Youtube-dl
      </button>
      <button class="search-torrents" @click.prevent="whichType('search')">
        Search Torrents
      </button>
    </div>
    <div class="action-group">
      <div class="download-input-container" v-if="inputType === 'download'">
        <textInput :placeholder="placeholder" :dataType="downloadType"></textInput>
        <div class="download-controls-container">
          <div v-if="checkboxes" class="checkboxes">
            <label for="audio-only" class="checkbox-label"
              ><input
                type="checkbox"
                id="audio-only"
                v-model="checkedValue"
                :value="checkedValue"
                name="audio-only"
              /><span>Audio Only</span></label
            >
          </div>
          <actionButton className="download-button" @clicked="download"></actionButton>
          <uploadFile @uploadfile="uploadFile" :path="uris.upload_url"></uploadFile>
        </div>
      </div>
      <searchInput v-else @search="search"></searchInput>
    </div>
  </form>
</template>
<script>
import textInput from "./textInput";
import searchInput from "./searchInput.vue";
import actionButton from "./actionButton";
import uploadFile from "./uploadFile";

export default {
  data() {
    return {
      checkedValue: false,
      path: this.uris.aria2_url,
      inputType: "download",
      checkboxes: false,
      downloadType: "aria2",
      placeholder: "Paste your http/magnet link here",
    };
  },
  components: {
    textInput,
    actionButton,
    searchInput,
    uploadFile,
  },
  computed: {

  },
  methods: {
    whichType(type) {
      this.downloadType = type;
      if (type === "aria2") {
        this.path = this.uris.aria2_url;
        this.placeholder = "Paste your http/magnet link here";
      } else if (type === "youtube-dl") {
        this.placeholder = "Paste your video link here";
        this.path = this.uris.ytd_url;
      } else {
        this.path = this.uris.search_url;
      }
      this.checkboxes = type === "youtube-dl" ? true : false;
      this.inputType = type === "search" ? "search" : "download";
    },
    download(event) {
      this.$emit("download", event);
    },
    search(event, vm) {
      this.$emit("search", event, vm);
    },
    uploadFile(event, vm) {
      this.$emit("uploadfile", event, vm);
    },
  },
  mounted() {
    console.log(this.uris);
  },
  name: "mainForm",
  props: {
    uris: Object,
    uri: String,
  },
};
</script>
<style lang="scss">
@import "../css/dl_variables.scss";

#nc-vue-unified-form {
  display: flex;
  width: 100%;
  height: $column-height;
  .action-group {
    width: 100%;
  }
  .options-group,
  .action-group > div {
    display: flex;
    width: auto;
    height: 100%;
    position: relative;
  }

  .action-group {
    flex: 2;
    & > div {
      border: 1px solid #565687;
      & > div,
      & > select {
        height: 100%;
        display: flex;
        padding: 0px;
        margin: 0px;
      }
      & > div[class$="-controls-container"] {
        display: flex;
        & div,
        & select {
          height: 100%;
        }
      }
    }
  }

  .checkboxes {
    border-radius: 0%;
  }
  .download-button {
    height: $column-height;
    .btn-primary {
      color: #fff;
      background-color: #2d3f59;
      border-color: #1e324f;
      border-radius: 0%;
    }
    .btn-primary:hover {
      background-color: #191a16;
    }
  }

  .magnet-link,
  .choose-file {
    background-color: #9f9fcd;
    border-radius: 15px 0px 0px 15px;
  }

  .youtube-dl-link {
    background-color: #c4c4d9;
  }

  .checkboxes {
    background-color: #c4c4d9;
    padding: 5px 1px;
  }
  input,
  button {
    margin: 0px;
    border: 0px;
    padding: 10px;
  }
  button {
    white-space: nowrap;
  }
}
@media only screen and (max-width: 1024px) {
  #nc-vue-unified-form {
    display: flex;
    flex-flow: column;
    row-gap: 10px;
    height: $column-height * 3 + 10;

    .options-group,
    .action-group > div {
      display: flex;
      width: 100%;
      height: $column-height;
    }

    .action-group > div {
      border: 0px;
      flex-flow: column nowrap;
      & > div {
        margin: 5px 1px;
      }
      & > div[class$="-controls-container"] {
        display: flex;
        justify-content: center;
      }
    }
    .options-group {
      & > button {
        width: calc(100% / 3);
      }
    }
  }
}
</style>
