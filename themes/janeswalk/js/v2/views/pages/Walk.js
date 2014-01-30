
/**
 * WalkPageView
 * 
 * @extends PageView
 */
var WalkPageView = PageView.extend({

    /**
     * _facebookAppId
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    _facebookAppId: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addShareLinkEvents();
    },

    /**
     * _addShareLinkEvents
     * 
     * @protected
     * @return    void
     */
    _addShareLinkEvents: function() {
        var _this = this;
        this._element.find('.facebookShareLink').click(
            function(event) {
                event.preventDefault();
                _this.trackEvent('Walk', 'share.attempted', 'facebook');
                _this.showFacebookShareDialog();
            }
        );
    },

    /**
     * _getWalkDetailsObject
     * 
     * @protected
     * @return    Object
     */
    _getWalkDetailsObject: function() {
        return {
            url: JanesWalk.page.url,
            pictureUrl: JanesWalk.page.pictureUrl,
            title: JanesWalk.page.title,
            description: JanesWalk.page.description
        };
    },

    /**
     * _getShareObject
     * 
     * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
     * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
     * @protected
     * @return    Object
     */
    _getShareObject: function() {
        var walkdetailsObject = this._getWalkDetailsObject();
        return {
            app_id: 206886749509400,
            method: 'feed',
            name: walkdetailsObject.title,
            description: walkdetailsObject.description,
            link: walkdetailsObject.url,
            picture: walkdetailsObject.pictureUrl,
            actions: {
                name: 'More about Jane\'s Walk',
                link: 'http://janeswalk.org/'
            }
        };
    },

    /**
     * showFacebookShareDialog
     * 
     * @see    https://developers.facebook.com/docs/reference/dialogs/feed/
     * @public
     * @return void
     */
    showFacebookShareDialog: function() {
        var _this = this;
        FB.ui(
            this._getShareObject(),
            function(response) {
                if (typeof response !== 'undefined') {
                    if (response === null) {
                        _this.trackEvent('Walk', 'share.failed', 'facebook');
                    } else {
                        _this.trackEvent(
                            'Walk',
                            'share.successful',
                            'facebook'
                        );
                    }
                }
            }
        );
    },
});
