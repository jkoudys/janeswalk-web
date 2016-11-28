<?php
$v = View::getInstance();

if (isset($error) && $error != '') {
    $errors = '<div class="alert alert-danger">';
    if ($error instanceof Exception) {
        $_error[] = $error->getMessage();
    } elseif ($error instanceof ValidationErrorHelper) {
        $_error = $error->getList();
    } elseif (is_array($error)) {
        $_error = $error;
    } elseif (is_string($error)) {
        $_error[] = $error;
    }
    foreach ($_error as $e) {
        echo $e . '<br />';
    }
    echo '</div>';
    $errors = '<div class="alert alert-danger">' . implode('<br />', $_error) . '</div>';
}

$v->inc('elements/header.php');
$v->inc('elements/navbar.php');
?>
<dialog id="survey-panel" class="in">
    <div>
        <article>
            <header>
                <?php (new Area('Header'))->display($c) ?>
            </header>
            <section>
                <?php (new Area('Body'))->display($c) ?>
            </section>
            <footer>
                <?= $errors ?>
            </footer>
        </article>
    </div>
</dialog>
<?php $v->inc('elements/footer.php') ?>
