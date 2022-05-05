<?php
script("ncdownloader", 'appSettings');
style("ncdownloader", 'appSettings');
extract($_);
$time_map = array('i' => 'minutes', 'h' => 'hours', 'w' => 'weeks', 'd' => 'days', 'y' => 'years');
?>
<div class="ncdownloader-personal-settings">
    <div id="ncdownloader-message-banner" style="display: none;"></div>
    <div id="ncdownloader-settings-form" class="section">
        <div class="ncdownloader-general-settings">
            <h2 class="title">
                <?php print($l->t('NCDownloader Settings'));?>
            </h2>
            <div id="ncd_downloader_dir_settings" path="<?php print $path;?>">
                <label for="ncd_downloader_dir">
                    <?php print($l->t('Downloads Folder'));?>
                </label>
                <input type="text" class="ncd_downloader_dir" id="ncd_downloader_dir" name="ncd_downloader_dir"
                    value="<?php print($ncd_downloader_dir ?? '/Downloads');?>" placeholder="/Downloads" />
                <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_downloader_dir_settings" />
            </div>
            <div id="ncd_torrents_dir_settings" path="<?php print $path;?>">
                <label for="ncd_torrents_dir">
                    <?php print($l->t('Torrents Folder'));?>
                </label>
                <input type="text" class="ncd_torrents_dir" id="ncd_torrents_dir"
                    value="<?php print($ncd_torrents_dir ?? '/Downloads/Files/Torrents');?>"
                    placeholder="/Downloads/Files/Torrents" />
                <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_torrents_dir_settings" />
            </div>
        </div>
        <hr />
        <div class="ncdownloader-bt-settings">
            <h2>
                <?php print($l->t('BT Sharing settings'));?>
            </h2>
            <div id="ncd_btratio_container" path="<?php print $path;?>">
                <label for="ncd_seed_ratio">
                    <?php print($l->t('Seed ratio'));?>
                </label>
                <input id="ncd_seed_ratio" value="<?php print($ncd_seed_ratio ?? 1.0);?>" placeholder="1.0">
                </input>
                <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_btratio_container" />
            </div>
            <div>
                <div id="seed_time_settings_container" path="<?php print $path;?>">
                    <label for="ncd_seed_time">
                        <?php print($l->t('Seed Time in minutes'));?>
                    </label>
                    <input id="ncd_seed_time" type="text" class="ncd_seed_time"
                        value="<?php print($ncd_seed_time ?? 1);?>" placeholder="1 m,h,d,w,m">
                    </input>
                    <input type="button" value="<?php print($l->t('Save'));?>"
                        data-rel="seed_time_settings_container" />
                </div>
            </div>
        </div>
        <hr />
        <div class="advanced-settings-container">
            <h2 class="title">
                <?php print($l->t('Advanced Settings'));?>
            </h2>
            <div class="ncdownloader-aria2-settings">
                <h3 class="title">
                    <?php print($l->t('Custom Aria2 Settings'));?>
                </h3>
                <div classs="section" id="custom-aria2-settings-container"
                    path="/apps/ncdownloader/personal/aria2/save">
                    <button class="add-custom-aria2-settings">
                        <?php print $l->t('Add Options');?>
                    </button>
                    <button class="save-custom-aria2-settings" data-rel="custom-aria2-settings-container">
                        <?php print $l->t('Save');?>
                    </button>
                </div>
            </div>
            <div class="ncdownloader-youtube-dl-settings">
                <h3 class="title">
                    <?php print($l->t('Custom Youtube-dl Settings'));?>
                </h3>
                <div classs="section" id="custom-youtube-dl-settings-container"
                    path="/apps/ncdownloader/personal/youtube-dl/save">
                    <button class="add-custom-youtube-dl-settings">
                        <?php print $l->t('Add Options');?>
                    </button>
                    <button class="save-custom-youtube-dl-settings" data-tippy-content=''
                        data-rel="custom-youtube-dl-settings-container">
                        <?php print $l->t('Save');?>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>