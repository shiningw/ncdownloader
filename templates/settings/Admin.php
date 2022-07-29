<?php
script("ncdownloader", 'appSettings');
style("ncdownloader", 'appSettings');
extract($_);
?>
<div id="ncdownloader-admin-settings" class="ncdownloader-admin-settings" data-settings='<?php print json_encode($settings);?>'>

</div>