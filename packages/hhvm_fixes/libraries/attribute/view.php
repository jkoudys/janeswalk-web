<?php
defined('C5_EXECUTE') or die("Access Denied.");
class AttributeTypeView extends Concrete5_Library_AttributeTypeView {
  /**
   * Renders a particular view for an attribute
   */
  public function render($view, $return = false) {

    if ($return) {
      ob_start();
    }

    $this->includeHeader($view);

    $js = $this->attributeType->getAttributeTypeFileURL($view . '.js');
    $css = $this->attributeType->getAttributeTypeFileURL($view . '.css');

    $html = Loader::helper('html');
    if ($js != false) {
      $this->controller->addHeaderItem($html->javascript($js));
    }
    if ($css != false) {
      $this->controller->addHeaderItem($html->css($css));
    }

    $this->controller->setupAndRun($view);
    extract($this->controller->getSets());
    extract($this->controller->getHelperObjects());
    $atHandle = $this->attributeType->getAttributeTypeHandle();

    if (is_object($attributeKey)) {
      $this->controller->set('akID', $this->attributeKey->getAttributeKeyID());
    }

    $file = $this->getIncludeFile($view);

    if ($view == 'composer' && !$file) {
      $file = $this->getIncludeFile('form');
    }

    if ($file) {
      include($file);
    }

    $this->includeFooter($view);

    if ($return) {
      $contents = ob_get_contents();
      ob_end_clean();
      return $contents;
    }	
  }	
  /**
   *
   * @param $view string
   */
  protected function includeHeader($view) {
    if ($_file = Environment::get()->getPath(DIRNAME_ATTRIBUTES . '/' . $view . '_header.php')) {
      $type = $this->attributeType;
      include($_file);
    }
  }

  /**
   *
   * @param $view string
   */
  protected function includeFooter($view) {
    if ($_file = Environment::get()->getPath(DIRNAME_ATTRIBUTES . '/' . $view . '_footer.php')) {
      $type = $this->attributeType;
      include($_file);
    }
  }
}
