<?php
use JanesWalk\Controllers\JanesWalk as Controller;

class BlogEntryPageTypeController extends Controller
{
    public function view()
    {
        parent::view();
        $dh = Loader::helper('concrete/dashboard');
        $im = Loader::helper('image');
        $c = Page::getCurrentPage();
        $uiAuthor = UserInfo::getByID($c->getCollectionUserID());

        if ($imAtt = $c->getAttribute('main_image')) {
            $this->set('headImage', $im->getThumbnail($imAtt, 800, 800));
        }
        $this->set('isLoggedIn', $dh->canRead());
        $this->set('canEdit', is_object(ComposerPage::getByID($c->getCollectionID())));
        if ($uiAuthor) {
            $this->set(
                'authorName',
                ($first_name = $uiAuthor->getAttribute('first_name')) ?
                ("$first_name {$uiAuthor->getAttribute('last_name')}") :
                $uiAuthor->getUserObject()->getUserName()
            );
        }
        $this->set('publishDate', $c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL));
        $this->set('otherBlogsOwned', $this->getOtherBlogsOwned());
        $this->set('pageType', 'blog');
    }

    /**
     * Check if this user owns a city blog, but not this article's city blog
     *
     * @return array<Page>|null Set of other blogs the current user owns
     */
    protected function getOtherBlogsOwned(): array
    {
        // Current user
        $u = new User();
        // Current page
        $c = Page::getCurrentPage();

        // Check if they own any blogs that aren't this one
        $plBlogs = new PageList();
        $plBlogs->filterByCollectionTypeHandle('city_blog');
        $plBlogs->filterByUserID($u->getUserID());
        $plBlogs->filter('p1.cID', $c->getCollectionParentID(), '!=');
        return $plBlogs->get();
    }

    /**
     * Re-blog, ie alias a blog entry under another blog
     */
    public function reblog(int $targetCID = null)
    {
        if ($targetCID) {
            $blog = Page::getByID($targetCID);
            $c = Page::getCurrentPage();
            // Check that you have permissions
            if ((new Permissions($blog))->canAddSubpage()) {
                // Create the page alias
                $newAlias = $c->addCollectionAlias($blog);
                $aliasPage = Page::getByID($newAlias);
                // Redirect to aliased page
                $this->redirect($aliasPage->getCollectionPath());
            }
        }
    }
}
