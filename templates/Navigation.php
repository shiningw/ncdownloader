<?php
extract($_);
?>
<div id="app-navigation">
    <?php if (!$ncd_hide_errors): ?>
        <?php foreach ($errors as $error): ?>
            <div data-error-message="<?php print $l->t($error);?>"></div>
        <?php endforeach;?>
    <?php endif;?>

    <div class="app-navigation-new" id="search-download"  data-inputbox="form-input-wrapper">
        <button type="button" class="icon-add">
            <?php print($l->t('Download & Search'));?>
        </button>
    </div>
    <div class="app-navigation-new" id="start-aria2">
        <?php if ($aria2_installed && $aria2_executable): ?>
        <button type="button" class="icon-power"
            data-aria2="<?php $aria2_running ? print $l->t('on') : print $l->t('off');?>">
            <?php $aria2_running ? print $l->t('Stop Aria2') : print $l->t('Start Aria2');?>
        </button>
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
    <ul>
        <li class="active-downloads">
            <div class="app-navigation-entry-bullet"></div>
            <a  role="button" tabindex="0" path="/apps/ncdownloader/dl/active">
                <?php print($l->t('Active Downloads'));?>
            </a>
            <div class="app-navigation-entry-utils">
                <ul>
                    <li class="app-navigation-entry-utils-counter" id="active-downloads-counter">
                        <div class="number"><?php print($_['counter']['active']);?></div>
                    </li>
                </ul>
            </div>
        </li>
        <li class="waiting-downloads">
            <div class="app-navigation-entry-bullet"></div>
            <a  role="button" tabindex="0" path="/apps/ncdownloader/dl/waiting">
                <?php print($l->t('Waiting Downloads'));?>
            </a>
            <div class="app-navigation-entry-utils">
                <ul>
                    <li class="app-navigation-entry-utils-counter" id="waiting-downloads-counter">
                        <div class="number"><?php print($_['counter']['waiting']);?></div>
                    </li>
                </ul>
            </div>
        </li>
        <li class="complete-downloads">
            <div class="app-navigation-entry-bullet"></div>
            <a  role="button" tabindex="0" path="/apps/ncdownloader/dl/complete">
                <?php print($l->t('Complete Downloads'));?>
            </a>
            <div class="app-navigation-entry-utils">
                <ul>
                    <li class="app-navigation-entry-utils-counter" id="complete-downloads-counter">
                        <div class="number"><?php print($_['counter']['complete']);?></div>
                    </li>
                </ul>
            </div>
        </li>
        <li class="fail-downloads">
            <div class="app-navigation-entry-bullet"></div>
            <a  role="button" tabindex="0" path="/apps/ncdownloader/dl/fail">
                <?php print($l->t('Failed Downloads'));?>
            </a>
            <div class="app-navigation-entry-utils">
                <ul>
                    <li class="app-navigation-entry-utils-counter" id="fail-downloads-counter">
                        <div class="number"><?php print($_['counter']['fail']);?></div>
                    </li>
                </ul>
            </div>
        </li>
        <li class="youtube-dl-downloads">
            <div class="app-navigation-entry-bullet"></div>
            <a role="button" tabindex="0">
                <?php print($l->t('Youtube-dl Downloads'));?>
            </a>
            <div class="app-navigation-entry-utils">
                <ul>
                    <li class="app-navigation-entry-utils-counter" id="youtube-dl-downloads-counter">
                        <div class="number"><?php print($_['counter']['youtube-dl']);?></div>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
    <div id="app-settings">
      <div id="app-settings-header">
        <button
          name="app settings"
          class="settings-button"
          data-apps-slide-toggle="#app-settings-content"
        >
        <?php p($l->t('Settings'));?>
        </button>
      </div>
      <div id="app-settings-content" ></div>
    </div>
</div>