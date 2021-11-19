<?php
script("ncdownloader", 'appSettings');
style("ncdownloader", "settings");
extract($_);
?>
<div class="ncdownloader-admin-settings">
<div id="ncdownloader-message-banner" style="display: none;"></div>
    <form id="ncdownloader" class="section">
        <h2>NCDownloader admin Settings</h2>
        <div id="ncd_rpctoken_settings" path="<?php print $path;?>">
            <label for="ncd_rpctoken">
                <?php print($l->t('Aria2 RPC Token'));?>
            </label>
            <input type="text" class="ncd_rpctoken" id="ncd_rpctoken" name="ncd_rpctoken"
                value="<?php print($ncd_rpctoken ?? 'ncdownloader123');?>"
                placeholder="ncdownloader123" />
            <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_rpctoken_settings" />
        </div>
        <div id="ncd_yt_binary_container" path="<?php print $path;?>">
            <label for="ncd_yt_binary">
                <?php print($l->t('Youtube-dl Binary Path'));?>
            </label>
            <input type="text" class="ncd_yt_binary" id="ncd_yt_binary" name="ncd_yt_binary"
                value="<?php print($ncd_yt_binary ?? '/usr/local/bin/youtube-dl');?>"
                placeholder='/usr/local/bin/youtube-dl' />
            <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_yt_binary_container" />
        </div>
        <div id="ncd_aria2_binary_container" path="<?php print $path;?>">
            <label for="ncd_aria2_binary">
                <?php print($l->t('Aria2 Binary Path'));?>
            </label>
            <input type="text" class="ncd_aria2_binary" id="ncd_aria2_binary" name="ncd_aria2_binary"
                value="<?php print($ncd_aria2_binary ?? '/usr/bin/aria2c');?>"
                placeholder="/usr/bin/aria2c" />
            <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_aria2_binary_container" />
        </div>
  </form>
</div>