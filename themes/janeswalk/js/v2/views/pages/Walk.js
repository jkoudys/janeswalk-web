
/**
 * WalkPageView
 * 
 * @extends PageView
 */
var WalkPageView = PageView.extend({

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
                var shareObj = _this._getFacebookDialogObj();
                (new FacebookShareDialog(shareObj)).show(
                    _this._facebookShareFailed,
                    _this._facebookShareSuccessful
                );
            }
        );
    },

    /**
     * _facebookShareFailed
     * 
     * @protected
     * @return    void
     */
    _facebookShareFailed: function() {
        this.trackEvent('Walk', 'share.failed', 'facebook');
    },

    /**
     * _facebookShareSuccessful
     * 
     * @protected
     * @return    void
     */
    _facebookShareSuccessful: function() {
        this.trackEvent('Walk', 'share.successful', 'facebook');
    },

    /**
     * _getFacebookDialogObj
     * 
     * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
     * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
     * @protected
     * @return    Object
     */
    _getFacebookDialogObj: function() {
        return {
            link: JanesWalk.page.url,
            picture: JanesWalk.page.pictureUrl,
            name: JanesWalk.page.title,
            description: JanesWalk.page.description,
            actions: {
                name: 'View Jane\'s Walks in ' + (JanesWalk.page.city.name),
                link: JanesWalk.page.city.url
            }
        };
    }
});
