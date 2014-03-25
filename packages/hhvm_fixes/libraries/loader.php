<?php defined('C5_EXECUTE') or die("Access Denied.");
class Loader extends Concrete5_Library_Loader {
  /**
   * @access private
   */
  public function packageElement($file, $pkgHandle, $args = null) {
    self::element($file, $args, $pkgHandle);
  }

  /**
   * Loads an element from C5 or the site
   */
  public function element($_file, $args = null, $_pkgHandle= null) {
    if (is_array($args)) {
      $collisions = array_intersect(array('_file', '_pkgHandle'), array_keys($args));
      if ($collisions) {
        throw new Exception(t("Illegal variable name '%s' in element args.", implode(', ', $collisions)));
      }
      $collisions = null;
    }

    View::getInstance()->includeFileInScope(Environment::get()->getPath(DIRNAME_ELEMENTS . '/' . $_file . '.php', $_pkgHandle), (array) $args);
  }
}
