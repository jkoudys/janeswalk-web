<?php
echo $error ?: null;

$payload = json_encode([
    'placeholder' => $title,
    'action' => htmlspecialchars_decode($this->action('resultsJson'))
]);

echo <<< EOT
<div id="b{$bID}" class="ccm-search-block-form"></div>
<script type="text/javascript">
    JanesWalk.event.emit('search.init', 'b{$bID}', {$payload});
</script>
EOT;
