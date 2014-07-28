<?php
namespace Qaribou\Template;

defined('C5_EXECUTE') || die(_('Access Denied.'));

class Dom {
  protected $_document;
  protected $_filename;
  protected $_settings = array(
    'version'             => '5',
    'encoding'            => 'UTF-8',
    'preserve_whitespace' => false,
    'namespace'           => 'ddtemplate'
  );

  public function __construct($tmpl_file_src)
  {
    $this->_document = new \DOMDocument($this->_settings['version'], $this->_settings['encoding']);
    $this->_document->preserveWhiteSpace = $this->_settings['preserve_whitespace'];
    $this->_document->load($tmpl_file_src);
    $this->_filename = $tmpl_file_src;
  }
  public function getFragment($xml = null)
  {
    $f = $this->_document->createDocumentFragment();
    if($xml) {
      $f->appendXML($xml);
    }
    return $f;
  }
  public function getTextFragment($text = '') {
    $this->_document->createTextNode($text);
  }
  public function getContents()
  {
    return $this->_document->saveXML();
  }
  public function printContents()
  {
    $this->_document->saveHTMLFile('php://output');
  }
  public function apply(array $tVars) {
    try {
      // set tVars should be available in this scope
      extract($tVars);
      foreach($this->_document->getElementsByTagNameNS($this->_settings['namespace'],'*') as $el) {
        /* Special template types for c5 */
        switch(strtolower($el->localName)) {
        case 'area':
          $f = $this->getFragment();
          ob_start(array($this, '_buildDoc'));
          if($el->getAttribute('global')) {
            $a = new \GlobalArea($el->getAttribute('name'));
          } else {
            $a = new \Area($el->getAttribute('name'));
          }
          $a->display();
          $ob_end_flush();

          /* Append this area html to the parent, and remove t:area */
          $el->parentNode->replaceChild( ob_get_clean(), $el );
          break;
        case 'inc':
          $f = $this->getFragment();
          ob_start(array($this, '_buildDoc'));
          $this->inc($el->getAttribute('src');
          $ob_end_flush();
          $el->parentNode->replaceChild( ob_get_clean(), $el );
          break;
        default:
          break;
        }

        foreach($el->attributes as $k=>$attr) {
          if($attr->namespaceURI === $this->_settings['namespace']) {
            $tVar = $tVars[$attr->value];
            if(!isset($tVar)) {
              throw new \Exception('No variable set for template placeholder ' . $attr->value);
            }
            if('child' === strtolower($k)) {
              $childNode = $tVar;
              if(is_string($childNode)) {
                $childNode = $this->_document->createTextNode($text);
              } else {
                $el->appendChild($childNode);
              }
            } else {
              $attr->value = $tVar;
            }
          }
        }
      }
      // All done, so clean out the template namespace and make this regular ol' html
      $this->_document->childNodes->item(0)->removeAttributeNS($this->_settings['namespace'], 't');
    } catch(\Exception $e) {
      echo 'err', PHP_EOL;
      \Log::addEntry('Error loading DomTemplate for ' . $this->_filename . ': ' . $e, 'DomTemplate');
    }
  }

  // Need to make public for 5.2 compat
  public function _buildDoc($buffer) {
    $doc = new \DOMDocument($this->_settings['version'], $this->_settings['encoding']);
    $doc->preserveWhiteSpace = $this->_settings['preserve_whitespace'];
    $doc->loadHTML($buffer);
    $import = $this->_document->importNode($doc->documentElement);
    return $import;
  }
}

