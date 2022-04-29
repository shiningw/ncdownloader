<template>
  <section v-if="display.download" class="form-section" id="form-section">
    <mainForm
      @download="download"
      @search="search"
      @uploadfile="uploadFile"
      :uris="uris"
    ></mainForm>
  </section>
</template>

<script>
import mainForm from "./components/mainForm";
import toggleButton from "./components/toggleButton";
import helper from "./utils/helper";
import { translate as t, translatePlural as n } from "@nextcloud/l10n";
import Http from "./lib/http";
import contentTable from "./lib/contentTable";

const successCallback = (data, element) => {
  if (!data) {
    helper.error(t("ncdownloader", "Something must have gone wrong!"));
    return;
  }
  if (data.hasOwnProperty("error")) {
    helper.error(t("ncdownloader", data.error));
  } else if (data.hasOwnProperty("message")) {
    helper.message(t("ncdownloader", data.message));
  } else if (data.hasOwnProperty("file")) {
    helper.message(t("ncdownloader", "Downloading" + " " + data.file));
  }
};

export default {
  name: "mainApp",
  inject: ["settings"],
  provide() {
    return {
      search_sites: this.settings.search_sites,
    };
  },
  data() {
    return {
      display: { download: true, search: false },
      uris: {
        ytd_url: helper.generateUrl("/apps/ncdownloader/youtube/new"),
        aria2_url: helper.generateUrl("/apps/ncdownloader/new"),
        search_url: helper.generateUrl("/apps/ncdownloader/search"),
        upload_url: helper.generateUrl("/apps/ncdownloader/upload"),
      },
    };
  },
  created() {},
  methods: {
    download(event) {
      let element = event.target;
      let formWrapper = element.closest("form");
      let formData = helper.getData(formWrapper);
      let inputValue = formData["text-input-value"].trim();
      let message;
      if (!helper.isURL(inputValue) && !helper.isMagnetURI(inputValue)) {
        helper.error(t("ncdownloader", inputValue + " is Invalid"));
        return;
      }
      if (formData.type === "youtube-dl") {
        formData["extension"] = "";

        if (formData["select-value-extension"] !== "defaultext") {
          formData["extension"] = formData["select-value-extension"];
        }
        message = helper.t("Download task started!");
        helper.pollingYoutube();
        helper.setContentTableType("youtube-dl-downloads");
      } else {
        helper.polling();
        helper.setContentTableType("active-downloads");
      }
      if (message) {
        helper.info(message);
      }
      let url = formWrapper.getAttribute("action");
      Http.getInstance(url)
        .setData(formData)
        .setHandler(function (data) {
          successCallback(data, element);
        })
        .send();
    },
    search(event, vm) {
      let element = event.target;
      let formWrapper = element.closest("form");
      let formData = helper.getData(formWrapper);
      let inputValue = formData["text-input-value"];
      if (!inputValue || (inputValue && inputValue.length < 2)) {
        helper.error(t("ncdownloader", "Please enter valid keyword!"));
        vm.$data.loading = 0;
        return;
      }
      helper.disablePolling();
      contentTable.getInstance().loading();

      let url = formWrapper.getAttribute("action");
      Http.getInstance(url)
        .setData(formData)
        .setHandler(function (data) {
          if (data && data.title) {
            vm.$data.loading = 0;
            const tableInst = contentTable.getInstance(data.title, data.row);
            tableInst.actionLink = false;
            tableInst.rowClass = "table-row-search";
            tableInst.create();
          }
          if (data.error) {
            helper.resetSearch(vm);
            helper.error(data.error);
          }
        })
        .send();
    },
    uploadFile(event, vm) {
      let element = event.target;
      const files = element.files || event.dataTransfer.files;
      if (files) {
        let formWrapper = element.closest("form");
        let url = formWrapper.getAttribute("action");
        return Http.getInstance(url)
          .setHandler(function (data) {
            successCallback(data, element);
          })
          .upload(files[0]);
      }
      return false;
    },
  },
  components: {
    mainForm,
    toggleButton,
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "css/variables.scss";

#app-content-wrapper {
  .ncdownloader-form-wrapper {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
  }
  .ncdownloader-form-wrapper.top-left {
    width: 100%;
    top: 0;
    left: 0;
  }

  .form-section {
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: 1.2em;
  }
}

@media only screen and (max-width: 1024px) {
  #app-content-wrapper {
    #ncdownloader-form-wrapper {
      position: relative;
      margin: 2px;
    }
  }
}
</style>
