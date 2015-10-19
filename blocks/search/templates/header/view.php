<?php
echo $error ?: null;

echo <<< EOT
<div id="b{$bID}" class="ccm-search-block-form"></div>
<script type="text/javascript">
    JanesWalk.event.emit('search.init', 'b{$bID}', {placeholder: '{$title}', action: '{$this->action('resultsJson')}'});
</script>
EOT;
