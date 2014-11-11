<?php  defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php');
$this->inc('elements/navbar.php');
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
<?php
                    if (isset($error) && $error != '') {
                        echo '<div class="alert alert-danger">';
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
                    }
?>
            </footer>
        </article>
    </div>
</dialog>
<?php $this->inc('elements/footer.php') ?>
