<?php
use Concrete\Core\Legacy\IndexedPageList;
use Concrete\Core\Legacy\CollectionAttributeKey;
use Concrete\Core\Legacy\TextHelper;

class SearchBlockController extends Concrete5_Controller_Block_Search
{
    public function highlightedMarkup($fulltext, $highlight)
    {
        if (!$highlight) {
            return $fulltext;
        }
        $this->hText = $fulltext;
        // strip the quotes as they mess the regex
        $this->hHighlight  = str_replace(['"', '\'', '&quot;'], '', $highlight);
        $this->hText = preg_replace(
            '#' . $this->hHighlight . '#ui',
            '**$0**',
            $this->hText
        );

        return $this->hText;
    }

    public function do_search()
    {
        $q = $_REQUEST['query'];
        $_q = $q;
        $ipl = new IndexedPageList();
        $aksearch = false;
        $ipl->ignoreAliases();
        if (is_array($_REQUEST['akID'])) {
            foreach ($_REQUEST['akID'] as $akID => $req) {
                $fak = CollectionAttributeKey::getByID($akID);
                if (is_object($fak)) {
                    $type = $fak->getAttributeType();
                    $cnt = $type->getController();
                    $cnt->setAttributeKey($fak);
                    $cnt->searchForm($ipl);
                    $aksearch = true;
                }
            }
        }

        if (isset($_REQUEST['month']) && isset($_REQUEST['year'])) {
            $month = strtotime($_REQUEST['year'] . '-' . $_REQUEST['month'] . '-01');
            $month = date('Y-m-', $month);
            $ipl->filterByPublicDate($month . '%', 'like');
            $aksearch = true;
        }

        if (empty($_REQUEST['query']) && $aksearch == false) {
            return false;
        }

        $ipl->setSimpleIndexMode(true);
        if (isset($_REQUEST['query'])) {
            $ipl->filterByKeywords($_q);
        }

        if ( is_array($_REQUEST['search_paths']) ) {
            foreach ($_REQUEST['search_paths'] as $path) {
                if(!strlen($path)) continue;
                $ipl->filterByPath($path);
            }
        } elseif ($this->baseSearchPath != '') {
            $ipl->filterByPath($this->baseSearchPath);
        }

        $ipl->filter(false, '(ak_exclude_page_list = 0 or ak_exclude_page_list is null)');
        $ipl->filter(false, '(ak_exclude_search_index = 0 or ak_exclude_search_index is null)');
        $ipl->setItemsPerPage(5);

        $res = $ipl->getPage();
        foreach ($res as $r) {
            $results[] = new IndexedSearchResult(
                $r['cID'],
                $r['cName'],
                $r['cDescription'],
                $r['score'],
                $r['cPath'],
                $r['content']
            );
        }

        $this->set('query', $q);
        $this->set('paginator', $ipl->getPagination());
        $this->set('results', $results);
        $this->set('do_search', true);
        $this->set('searchList', $ipl);
    }

    public function action_resultsJson()
    {
        $tt = new TextHelper();
        $this->do_search();
        $query = $this->get('query');
        $results = $this->get('results');
        $return['results'] = array_map(function ($r) use ($tt, $query) {
            $ret = [
                'url' => $r->getPath(),
                'name' => $r->getName()
            ];
            if ($r->getDescription()) {
                $ret['description'] = $this->highlightedMarkup(
                    $tt->shortText($r->getDescription()),
                    $query
                );
            }

            return $ret;
        }, (array) $results);

        $return['query'] = $this->get('query');
        $return['paginator'] = $this->get('paginator');
        echo json_encode($return);
        exit;
    }
}
