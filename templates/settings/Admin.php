<?php
script("vapor", 'appSettings');
style("vapor", 'appSettings');
extract($_);
?>
<div id="vapor-admin-settings" class="vapor-admin-settings" data-settings='<?php print json_encode($settings);?>' data-options='<?php print json_encode($options);?>'>

</div>