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
import helper from "./helper";
import { translate as t, translatePlural as n } from "@nextcloud/l10n";
import Http from "./http";
import nctable from "./ncTable";

const successCallback = (data, element) => {
  if (!data) {
    helper.message(t("ncdownloader", "Something must have gone wrong!"));
    return;
  }
  if (data.hasOwnProperty("error")) {
    helper.message(t("ncdownloader", data.error));
  } else if (data.hasOwnProperty("message")) {
    helper.message(t("ncdownloader", data.message));
  } else if (data.hasOwnProperty("file")) {
    helper.message(t("ncdownloader", "Downloading" + " " + data.file));
  }
};

export default {
  name: "mainApp",
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
      let inputValue = formData["text-input-value"];
      //formData.audioOnly = document.getElementById('audio-only').checked;
      if (formData.type === "youtube-dl") {
        formData["audio-only"] = formData["audio-only"] === "true";
      }
      if (!helper.isURL(inputValue) && !helper.isMagnetURI(inputValue)) {
        helper.message(t("ncdownloader", inputValue + " is Invalid"));
        return;
      }

      let url = formWrapper.getAttribute("action");
      Http.getInstance(url)
        .setData(formData)
        .setHandler(function (data) {
          successCallback(data, element);
        })
        .send();
      helper.message(inputValue);
    },
    search(event, vm) {
      let element = event.target;
      let formWrapper = element.closest("form");
      let formData = helper.getData(formWrapper);
      let inputValue = formData["text-input-value"];
      if (inputValue && inputValue.length < 2) {
        helper.message(t("ncdownloader", "Please enter valid keyword!"));
        vm.$data.loading = 0;
        return;
      }
      helper.enabledPolling = 0;
      nctable.getInstance().loading();

      let url = formWrapper.getAttribute("action");
      Http.getInstance(url)
        .setData(formData)
        .setHandler(function (data) {
          if (data && data.title) {
            vm.$data.loading = 0;
            const tableInst = nctable.getInstance(data.title, data.row);
            tableInst.actionLink = false;
            tableInst.rowClass = "table-row-search";
            tableInst.create();
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
        Http.getInstance(url)
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
@import "css/dl_variables.scss";
$box-height: 110px;

#app-content-wrapper {
  .ncdownloader-form-container {
    position: relative;
    width: 100%;
    max-height: $box-height;
    top: 0;
    left: 0;
  }
  .ncdownloader-form-container.top-left {
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
    #ncdownloader-form-container {
      position: relative;
      margin: 2px;
    }
  }
}
</style>