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
        class="youtube-dl-link option-buttons"
        @click.prevent="whichType('youtube-dl', $event)"
      >
        Youtube-dl
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
              </optgroup>
            </select>
          </div>
          <actionButton className="download-button" @clicked="download"></actionButton>
          <uploadFile
            v-if="downloadType === 'aria2'"
            @uploadfile="uploadFile"
            :path="uris.upload_url"
          ></uploadFile>
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

export default {
  inject: ["settings", "search_sites"],
  data() {
    return {
      checkedValue: false,
      path: this.uris.aria2_url,
      inputType: "download",
      checkboxes: false,
      downloadType: "aria2",
      placeholder: t("ncdownloader", "Paste your http/magnet link here"),
      searchLabel: t("ncdownloader", "Search Torrents"),
      searchOptions: this.search_sites ? this.search_sites : this.noOptions(),
      selectedExt: "defaultext",
    };
  },
  components: {
    textInput,
    actionButton,
    searchInput,
    uploadFile,
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
      } else if (type === "youtube-dl") {
        this.placeholder = t("ncdownloader", "Paste your video link here");
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
    optionCallback(option) {
      if (option.label.toLowerCase() == "music") {
        this.searchLabel = t("ncdownloader", "Search Music");
      } else {
        this.searchLabel = t("ncdownloader", "Search Torrents");
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
  .options-group > .option-buttons {
    margin: 0;
    padding: 10px;
    outline: 0;
    font-weight: bold;
    font-size: 13px;
    font-family: inherit;
    vertical-align: baseline;
    cursor: pointer;
    white-space: nowrap;
    min-height: 34px;
    width: auto;
  }
  .active-button {
    border: 2px #9a5c8b solid;
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
          color: #181616;
          font-size: medium;
          background-color: #bdbdcf;
        }
      }
    }
  }

  .checkboxes {
    border-radius: 0%;
  }
  .download-button,
  .search-button {
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
    background-color: #a0a0ae;
    border-radius: 15px 0px 0px 15px;
  }

  .youtube-dl-link {
    background-color: #b8b8ca;
  }
  .search-torrents {
    background-color: #d0d0e0;
  }

  .search-torrents,
  .youtube-dl-link,
  .magnet-link,
  .choose-file {
    color: #181616;
  }
  .checkboxes {
    background-color: #c4c4d9;
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
