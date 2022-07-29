<?php
script("ncdownloader", 'appSettings');
style("ncdownloader", 'appSettings');
extract($_);

?>
<div class="ncdownloader-personal-settings" id="ncdownloader-personal-settings" data-settings='<?php print json_encode($settings); ?>'>

</div>