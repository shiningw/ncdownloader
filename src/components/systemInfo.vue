<template>
    <div class="system-info-wrapper section">
        <h2 class="section-title">System Info</h2>
        <div class="system-info">
            <div class="system-info-item">
                <div class="system-info-item-label">Aria2 Version: </div>
                <div class="system-info-item-value"><span class="version">{{ aria2Ver }}</span>
                </div>
            </div>
            <div class="system-info-item">
                <div class="system-info-item-label">Yt-dlp Version: </div>
                <div class="system-info-item-value"><span class="version">{{ ytdVer }}</span>
                    <actionButton action="check" btnType="ytd" @clicked="checkUpdate" enableLoading="true"
                        className="check-button">
                        {{
        ytdBtn
                        }}</actionButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import helper from "../utils/helper";
import actionButton from "./actionButton";
const ARIA2_CHECK_URL = "/apps/ncdownloader/aria2/release/check";
const ARIA2_UPDATE_URL = "/apps/ncdownloader/aria2/release/update";
const YTD_CHECK_URL = "/apps/ncdownloader/ytdl/release/check";
const YTD_UPDATE_URL = "/apps/ncdownloader/ytdl/release/update";

export default {
    name: "systemInfo",
    data() {
        return {
            aria2Btn: "Check for Update",
            ytdBtn: "Check for Update",
        };
    },
    components: {
        actionButton
    },
    computed: {
        aria2Ver: {
            get() {
                return this.$props.aria2Version
            },
            set(value) {
                this.$props.aria2Version = value
                //this.$emit("update:aria2Version", value)
            }
        },
        ytdVer: {
            get() {
                return this.$props.ytdVersion
            },
            set(value) {
                this.$props.ytdVersion = value
                //this.$emit("update:ytdVersion", value)
            }
        }
    },
    methods: {
        checkUpdate(event, $vm) {
            const { btnType, action } = $vm.$props;
            const path = action === "check" ? (btnType === "aria2" ? ARIA2_CHECK_URL : YTD_CHECK_URL) : (btnType === "aria2" ? ARIA2_UPDATE_URL : YTD_UPDATE_URL);
            helper
                .httpClient(helper.generateUrl(path))
                .setMethod("GET")
                .setHandler((data) => {
                    $vm.loading = false;
                    if (data.status) {
                        helper.info(data.message)
                        //update button text
                        if (action == "check") {
                            if (btnType == "ytd") {
                                this.ytdBtn = "Update"
                            } else {
                                this.aria2Btn = "Update"
                            }
                            $vm.$props.action = "update"
                        } else {
                            if (btnType == "ytd") {
                                this.ytdBtn = "Check for Update"
                            } else {
                                this.aria2Btn = "Check for Update"
                            }
                            $vm.$props.action = "check"
                            if (data.data) {
                                if (btnType == "ytd") {
                                    this.ytdVer = data.data
                                } else if (btnType == "aria2") {
                                    this.aria2Ver = data.data
                                }
                            }
                        }
                    } else {
                        helper.info(data.message)
                    }
                })
                .send();
        },

    },
    props: {
        aria2Version: {
            type: String,
            default: ""
        },
        ytdVersion: {
            type: String,
            default: ""
        },
    },
}
</script>
<style scoped lang="scss">
.system-info {
    display: flex;
    flex-direction: column;
    margin-top: 10px;


    .system-info-item {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .system-info-item-label {
        font-weight: bold;
        margin-right: 10px;
        display: flex;
        align-items: flex-end;
    }

    .system-info-item-value {
        font-weight: normal;

        .check-button {
            border-radius: 0.25em;
        }
    }
}
</style>