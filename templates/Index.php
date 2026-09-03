<?php
extract($_);
\OCP\Util::addHeader('meta', [
    'name' => 'viewport',
    'content' => 'width=device-width, initial-scale=1',
]);
?>
<div id="app-vapor-wrapper">
    <button
        id="app-navigation-toggle"
        type="button"
        class="icon-menu"
        aria-controls="app-navigation"
        aria-expanded="false"
        aria-label="<?php p($l->t('Toggle navigation')); ?>"
    ></button>
    <?php print_unescaped($this->inc('Navigation'));?>
    <?php print_unescaped($this->inc('Content'));?>
    <div id="app-settings-data" data-search-sites=<?php print $search_sites;?> data-settings='<?php print($settings);?>' ></div>
</div>
