<?php
script("vapor", 'appSettings');
style("vapor", 'appSettings');
extract($_);

?>
<div class="vapor-personal-settings" id="vapor-personal-settings" data-settings='<?php print json_encode($settings); ?>' data-options='<?php print json_encode($options); ?>'>
</div>