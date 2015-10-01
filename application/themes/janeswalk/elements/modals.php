<?php
/* Home for all modals which are hidden on page load */
// Error modal
if (isset($error) && $error !== '') {
    if ($error instanceof Exception) {
        $_error[] = $error->getMessage();
    } elseif ($error instanceof ValidationErrorHelper) {
        $_error = $error->getList();
    } elseif (is_array($error)) {
        $_error = $error;
    } elseif (is_string($error)) {
        $_error[] = $error;
    }
}

$sl = Stack::getByName('Social Logins');
if ($sl) {
    $logins = json_encode(ob_get_contents());

    ob_start();
    $sl->display();
    ob_end_clean();

    // Set the social logins stack as accessible to client-side apps
    $this->addFooterItem( <<< EOT
<script type="text/javascript">window.JanesWalk = Object.assign({}, window.JanesWalk, {stacks: {"Social Logins": {$logins}}})</script>
EOT
    );
}

echo '<div id="modals"></div>';
