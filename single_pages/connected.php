<?php
?>
<script>
var hash = window.location.hash;
window.opener.setAccessToken(hash.substr(hash.indexOf('=') + 1));
</script>
