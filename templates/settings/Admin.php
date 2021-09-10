<?php
script("ncdownloader", 'appSettings');
?>
<div class="ncdownloader-admin-settings">
    <form id="ncdownloader" class="section">
        <h2>ncDownloader admin Settings</h2>
        <div><span class="info">
                <?php print($l->t('Leave empty to reset a setting value'));?>
            </span>
            <span id="ncdownloader-message"></span>
        </div>
        <div id="ncd_rpctoken_settings" path="<?php print $path;?>">
            <label for="ncd_rpctoken">
                <?php print($l->t('Aria2 RPC Token'));?>
            </label>
            <input type="text" class="ncd_rpctoken" id="ncd_rpctoken" name="ncd_rpctoken"
                value="<?php print($ncd_rpctoken ?? 'ncdownloader123');?>"
                placeholder="ncdownloader123" />
            <input type="button" value="<?php print($l->t('Save'));?>" data-rel="ncd_rpctoken_settings" />
        </div>
  </form>
</div>