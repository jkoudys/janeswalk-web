<?php

defined('C5_EXECUTE') or die("Access Denied.");
class View extends Concrete5_Library_View {
  /**
   *
   * @param $file string Full file path as string
   */
  public function includeFileInScope($file, $args = array()) {
    extract($args);
    include($file);
  }
}
