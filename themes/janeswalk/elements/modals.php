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
    ob_start();
    $sl->display();
    // Set the social logins stack as accessible to client-side apps
    $this->addFooterItem(
        '<script type="text/javascript">window.JanesWalk = window.JanesWalk || {}; Object.assign(window.JanesWalk, {stacks: {"Social Logins": ' .
        json_encode(ob_get_contents()) .
        '}});</script>'
    );
    ob_end_clean();
}
?>
<div id="modals"></div>
