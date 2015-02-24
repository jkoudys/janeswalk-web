<?php
?>
<script>
(function() {
    var hash = window.location.hash.substr(1);
    hash.split('&').forEach(function(param) {
        var kvp = param.split('=');
        if (kvp[0] === 'access_token') {
            window.opener.loadAccessToken(kvp[1]);
            window.close();
        }
    });
})();
</script>
