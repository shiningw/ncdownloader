<template>
  <form class="main-form" id="nc-vue-unified-form" :action="path">
    <div class="options-group">
      <div
        class="magnet-link http-link option-buttons active-button"
        @click.prevent="whichType('aria2', $event)"
      >
        HTTP/MAGNET
      </div>
      <div
        class="ytdl-link option-buttons"
        @click.prevent="whichType('ytdl', $event)"
      >
        yt-dlp
      </div>
      <div
        class="search-torrents option-buttons"
        @click.prevent="whichType('search', $event)"
      >
        {{ searchLabel }}
      </div>
    </div>
    <div class="action-group">
      <div class="download-input-container" v-if="inputType === 'download'">
        <textInput :placeholder="placeholder" :dataType="downloadType"></textInput>
        <div class="download-controls-container">
          <div v-if="checkboxes" id="select-value-extension-container">
            <select :value="selectedExt" id="select-value-extension">
              <option id="defaultext" value="defaultext">Default</option>
              <optgroup label="Video">
                <option id="mp4" value="mp4">mp4</option>
                <option id="webm" value="webm">webm</option>
              </optgroup>
              <optgroup label="Audio">
                <option id="m4a" value="m4a">m4a</option>
                <option id="mp3" value="mp3">mp3</option>
                <option id="vorbis" value="vorbis">vorbis</option>
                <option id="opus" value="opus">opus</option>
              </optgroup>
            </select>
          </div>
          <actionButton className="download-button" @clicked="download"></actionButton>
          <uploadFile
            v-if="downloadType === 'aria2'"
            @uploadfile="uploadFile"
            :path="uris.upload_url"
          ></uploadFile>
          <folderSettings :path="dlPath"></folderSettings>
        </div>
      </div>
      <searchInput
        v-else
        @search="search"
        @optionSelected="optionCallback"
        :selectOptions="searchOptions"
      ></searchInput>
    </div>
  </form>
</template>
<script>
import textInput from "./textInput";
import searchInput from "./searchInput.vue";
import actionButton from "./actionButton";
import uploadFile from "./uploadFile";
import { translate as t } from "@nextcloud/l10n";
import folderSettings from "./folderSettings.vue";

export default {
  inject: ["settings", "search_sites"],
  data() {
    return {
      checkedValue: false,
      path: this.uris.aria2_url,
      dlPath: this.settings.settings.ncd_downloader_dir,
      inputType: "download",
      checkboxes: false,
      downloadType: "aria2",
      placeholder: t("vapor", "Paste your http/magnet link here"),
      searchLabel: t("vapor", "Search Torrents"),
      searchOptions: this.search_sites ? this.search_sites : this.noOptions(),
      selectedExt: "defaultext",
    };
  },
  components: {
    textInput,
    actionButton,
    searchInput,
    uploadFile,
    folderSettings,
  },
  created() {},
  computed: {},
  methods: {
    whichType(type, event) {
      let element = event.target;
      let nodeList = document.querySelectorAll(".option-buttons");
      nodeList.forEach((node) => {
        node.classList.remove("active-button");
      });
      element.classList.toggle("active-button");
      this.downloadType = type;
      if (type === "aria2") {
        this.path = this.uris.aria2_url;
      } else if (type === "ytdl") {
        this.placeholder = t("vapor", "Paste your video link here");
        this.path = this.uris.ytd_url;
      } else {
        this.path = this.uris.search_url;
      }
      this.checkboxes = type === "ytdl" ? true : false;
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
    optionCallback(option) {
      if (option.label.toLowerCase() == "music") {
        this.searchLabel = t("vapor", "Search Music");
      } else {
        this.searchLabel = t("vapor", "Search Torrents");
      }
    },
    noOptions() {
      return [{ name: "nooptions", label: "No Options" }];
    },
  },
  mounted() {},
  name: "mainForm",
  props: {
    uris: Object,
    uri: String,
  },
};
</script>
<style lang="scss">
@import "../css/variables.scss";

#nc-vue-unified-form {
  display: flex;
  width: 100%;
  height: $column-height;
  font-size: medium;
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
  .options-group {
    flex-wrap: wrap;
    gap: 4px;
  }
  .options-group > .option-buttons {
    margin: 0;
    padding: 8px 14px;
    outline: 0;
    font-weight: bold;
    font-size: 13px;
    font-family: inherit;
    vertical-align: baseline;
    cursor: pointer;
    white-space: nowrap;
    min-height: 34px;
    width: auto;
    background-color: var(--color-background-dark, #ededed);
    color: var(--color-main-text, #222);
    border: 1px solid var(--color-border, #ccc);
    border-radius: var(--border-radius-pill, 20px);
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    &:hover,
    &:focus {
      background-color: var(--color-primary-element-light, #b8d4e8);
      color: var(--color-primary-element-text, #fff);
      border-color: var(--color-primary-element, #0082c9);
    }
  }
  .options-group > .option-buttons.active-button {
    background-color: var(--color-primary-element, #0082c9);
    color: var(--color-primary-element-text, #fff);
    border-color: var(--color-primary-element, #0082c9);
  }

  .action-group {
    flex: 2;
    & > div {
      border: 1px solid var(--color-border, #565687);
      & > div,
      & > select {
        height: 100%;
        display: flex;
        padding: 0px;
        margin: 0px;
      }
      & > div[class$="-controls-container"] {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        & div,
        & select {
          height: 100%;
          color: var(--color-main-text, #181616);
          font-size: medium;
          background-color: var(--color-background-dark, #bdbdcf);
        }
      }
    }
  }

  .checkboxes {
    border-radius: 0%;
  }
  .download-button.btn-primary,
  .search-button.btn-primary {
    color: var(--color-primary-element-text, #fff);
    background-color: var(--color-primary-element, #2d3f59);
    border-color: var(--color-primary-element, #1e324f);
    border-radius: 0%;
  }
  .download-button.btn-primary:hover,
  .search-button.btn-primary:hover {
    background-color: var(--color-primary-element-hover, #191a16);
  }

  .magnet-link,
  .choose-file,
  .ytdl-link,
  .search-torrents {
    color: var(--color-main-text, #181616);
  }
  .checkboxes {
    background-color: var(--color-background-dark, #c4c4d9);
    padding: 5px 1px;
  }
  input,
  select,
  button {
    margin: 0px;
    border: 0px;
    padding: 10px;
    height: 100%;
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
    height: auto;

    .options-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: auto;
      gap: 6px;
    }

    .options-group > .option-buttons {
      flex: 1 1 auto;
      min-width: calc(33% - 6px);
      text-align: center;
    }

    .action-group > div {
      display: flex;
      width: 100%;
      height: $column-height;
      border: 0px;
      flex-flow: column nowrap;
      & > div {
        margin: 5px 1px;
      }
      & > div[class$="-controls-container"] {
        display: flex;
        justify-content: flex-start;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  #nc-vue-unified-form {
    height: auto;
    row-gap: 8px;
    padding: 8px;

    .options-group {
      flex-direction: column;
      width: 100%;
      height: auto;
    }
    .options-group > .option-buttons {
      width: 100%;
      min-width: unset;
      text-align: center;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .action-group > div {
      flex-direction: column;
      width: 100%;
      height: auto;
    }
  }
}
</style>
