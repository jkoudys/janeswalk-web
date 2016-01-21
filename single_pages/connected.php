<?php
/**
 * Simple page for receiving an 'access_token' hash on redirect from an
 * oauth2 API
 */
?>
<script>
(function() {
    var hash = window.location.hash.substr(1);
    hash.split('&').forEach(function(param) {
        var kvp = param.split('=');
        if (kvp[0] === 'access_token') {
            window.opener.loadAccessToken(kvp[1]);
//            window.close();
        }
    });
})();
</script>
