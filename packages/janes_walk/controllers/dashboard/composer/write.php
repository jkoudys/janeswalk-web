<?php
/**
 * Controller for managing the 'write' feature in the composer
 *
 * The builtin logic doesn't allow us to set the parent on the request. This
 * has been extended so you can call the composer and set the parent ID in the
 * request. Mainly used to say 'publish a blog entry under this blog' from
 * another page, instead of asking them to select a parent on the composer.
 */

class DashboardComposerWriteController extends Concrete5_Controller_Dashboard_Composer_Write
{
    /**
     * Views the composer edit page.
     * @param string|int $ctID The collection type
     * @param string|int $cPublishParentID The parent page under which to publish
     */
    public function view($ctID = false, $cPublishParentID = false)
    {
        // Load Page objects from their IDs
        $ct = $this->setCollectionType($ctID);
        $cPublishParent = Page::getByID($cPublishParent);

        // If we couldn't load a collection type, send them to the composer menu
        if (!is_object($ct)) {
            $ctArray = CollectionType::getComposerPageTypes();
            // If there's only one collection type, just choose that one
            if (count($ctArray) === 1) {
                $ct = $ctArray[0];
                $this->redirect('/dashboard/composer/write', $ct->getCollectionTypeID());
                exit;
            }
            // Otherwise, they need to choose the CT from this array of types
            $this->set('ctArray', $ctArray);
        } else {
            // CT was set, so create a draft of this type
            $entry = ComposerPage::createDraft($ct);
            if (is_object($entry)) {
                // Check if we have a parent specified to create this draft under
                if ($cPublishParentID && is_object($cPublishParent)) {
                    // Make this draft under the specified parent
                    $entry->setComposerDraftPublishParentID($cPublishParentID);
                }
                // New draft is created, so start editing it
                $this->redirect('/dashboard/composer/write', 'edit', $entry->getCollectionID());
            } else {
                // Something failed when trying to create a draft, so send back to drafts folder
                $this->redirect('/dashboard/composer/drafts');
            }
        }
    }
}
