<?php
extract($_);
$downloadsList = [
    ["name" => "active", "label" => "Active Downloads", "id" => "active-downloads", "path" => "/apps/ncdownloader/status/active"],
    ["name" => "waiting", "label" => "Waiting Downloads", "id" => "waiting-downloads", "path" => "/apps/ncdownloader/status/waiting"],
    ["name" => "fail", "label" => "Failed Downloads", "id" => "failed-downloads", "path" => "/apps/ncdownloader/status/fail"],
    ["name" => "complete", "label" => "Complete Downloads", "id" => "complete-downloads", "path" => "/apps/ncdownloader/status/complete"],
    ["name" => "ytdl", "label" => "Youtube-dl Downloads", "id" => "ytdl-downloads", "path" => "/apps/ncdownloader/ytdl/get"],
];
?><div id="app-navigation">
    <?php if (!$ncd_hide_errors): ?>
        <?php foreach ($errors as $error): ?>
            <div data-error-message="<?php print $l->t($error);?>"></div>
        <?php endforeach;?>
    <?php endif;?><div class="app-navigation-new" id="search-download" data-inputbox="form-input-wrapper">
    <button type="button" class="icon-add">
        <?php print($l->t('Download & Search'));?>
    </button>
</div>

<?php if ($is_admin): ?>
<div class="app-navigation-new" id="start-aria2">
    <?php if ($aria2_installed && $aria2_executable): ?>
    <button type="button" class="icon-power"
        data-aria2="<?php $aria2_running ? print $l->t('on') : print $l->t('off');?>">
        <?php $aria2_running ? print $l->t('Stop Aria2') : print $l->t('Start Aria2');?>
    </button>
    <?php elseif ($aria2_installed && !$aria2_executable): ?>
    <button type="button" class="icon-power notinstalled" >
        <?php print $l->t("aria2c is installed but not executable");?>
    </button>
    <?php else: ?>
    <button type="button" class="icon-power notinstalled">
        <?php print $l->t("aria2c is not installed!");?>
    </button>
    <?php endif;?>
</div>
<?php endif; ?>

<ul class="navigation-list">
    <?php foreach ($downloadsList as $item): ?>
        <li class="navigation-item">
            <a href="<?php print $item['path']; ?>" id="<?php print $item['id']; ?>">
                <span class="nav-label"><?php print $item['label']; ?></span>
                <span class="nav-count"><?php print $counts[$item['name']] ?? 0; ?></span>
            </a>
        </li>
    <?php endforeach; ?>
</ul>

</div>
<style>
    .navigation-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .navigation-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
    }
    .nav-label {
        flex-grow: 1;
    }
    .nav-count {
        background: #444;
        color: white;
        padding: 2px 6px;
        border-radius: 12px;
        min-width: 20px;
        text-align: center;
    }
</style>
