
/**
 * ProfilePageView
 * 
 * @extends PageView
 */
var ProfilePageView = PageView.extend({

    /**
     * _currentTab
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _currentTab: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._showProperStep();
        this._addTabClickEvents();
        this._setupDisplayPictureFlashWidget();
        this._addPictureDeleteEvent();
        this._addPromoteWalkClickEvent();
        this._addPromoteCityClickEvent();
        this._setupCityPromoteModalEvents();
        this._setupWalkPromoteModalEvents();
    },

    /**
     * _getFacebookDialogCityObj
     * 
     * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
     * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
     * @protected
     * @return    Object
     */
    _getFacebookDialogCityObj: function() {
        return {
            link: 'http://janeswalk.org',
            name: 'Jane\'s Walk',
            description: 'Jane\s Walk 2014 Festival is fast approaching. Come join us'/*,
            actions: {
                name: 'View Jane\'s Walks in Toronto',
                link: 'http://google.com'
            }*/
        };
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
    },

    /**
     * _setupWalkPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupWalkPromoteModalEvents: function() {
        var _this = this;
        this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                var url = encodeURIComponent(
                        'http://local.janeswalk.org/index.php/profile/'
                    ),
                    text = encodeURIComponent(
                        $(this).closest('.option').find('.copy').text().trim()
                    );
                var link = 'https://twitter.com/intent/tweet' +
                    '?url=' + (url) +
                    '&via=janeswalk' +
                    '&text=' + (text);
                window.open(
                    link,
                    'Twitter Share',
                    'width=640, height=320'
                );
            }
        );
        this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                var shareObj = _this._getFacebookDialogCityObj();
                (new FacebookShareDialog(shareObj)).show();
            }
        );
        this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                var subject = 'Jane\'s Walk in Toronto',
                    body = $(this).closest('.option').find('.copy').text().trim();
                subject = encodeURIComponent(subject);
                body = encodeURIComponent(body);
                var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
                window.open(link);
            }
        );
    },

    /**
     * _setupCityPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupCityPromoteModalEvents: function() {
        var _this = this;
        this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                var url = encodeURIComponent(
                        'http://local.janeswalk.org/index.php/profile/'
                    ),
                    text = encodeURIComponent(
                        $(this).closest('.option').find('.copy').text().trim()
                    );
                var link = 'https://twitter.com/intent/tweet' +
                    '?url=' + (url) +
                    '&via=janeswalk' +
                    '&text=' + (text);
                window.open(
                    link,
                    'Twitter Share',
                    'width=640, height=320'
                );
            }
        );
        this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                var shareObj = _this._getFacebookDialogCityObj();
                (new FacebookShareDialog(shareObj)).show();
            }
        );
        this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                var subject = 'Jane\'s Walk in Toronto',
                    body = $(this).closest('.option').find('.copy').text().trim();
                subject = encodeURIComponent(subject);
                body = encodeURIComponent(body);
                var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
                window.open(link);
            }
        );
    },

    /**
     * _addPromoteWalkClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteWalkClickEvent: function() {
        var _this = this,
            $btn = this._element.find('.subactions .promote');
        $btn.click(
            function(event) {
                event.preventDefault();
                _this._element.find('.walkPromoteOverlay').show();
            }
        );
    },

    /**
     * _addPromoteCityClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteCityClickEvent: function() {
        var _this = this,
            $btn = this._element.find('.promoteBtn');
        $btn.click(
            function(event) {
                event.preventDefault();
                _this._element.find('.cityPromoteOverlay').show();
            }
        );
    },

    /**
     * _addPictureDeleteEvent
     * 
     * @protected
     * @return    void
     */
    _addPictureDeleteEvent: function() {
        this._element.find('a[href="/index.php/profile/delete/"]').click(
            function(event) {
                event.preventDefault();
                $.ajax({
                    type: 'DELETE',
                    url: $(this).attr('href'),
                    success: function() {
                        location.href = '/index.php/profile/#tab=picture&success=1';
                    }
                });
            }
        );
    },

    /**
     * _setupDisplayPictureFlashWidget
     * 
     * @protected
     * @return    void
     */
    _setupDisplayPictureFlashWidget: function() {
      window.ThumbnailBuilder_onSaveCompleted = function() {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
          bgcolor: '#ffffff',
          wmode: 'transparent',
          quality: 'high' 
        },
        flashvars = {
          width: this._element.find('#flashContainer').attr('data-width'),
          height: this._element.find('#flashContainer').attr('data-height'),
          image: this._element.find('#flashContainer').attr('data-imagepath'),
          save: this._element.find('#flashContainer').attr('data-savepath')
        };
      swfobject.embedSWF(
        this._element.find('#flashContainer').attr('data-flashpath'),
        'flashContainer',
        '500',
        '400',
        '10,0,0,0',
        'includes/expressInstall.swf',
        flashvars,
        params
      );
    },

    /**
     * _addTabClickEvents
     * 
     * @protected
     * @return    void
     */
    _addTabClickEvents: function() {

        // Nav tabs
        var _this = this;
        this._element.find('ul.nav-tabs li a').click(
            function(event) {
                event.preventDefault();
                _this._currentTab = $(this).attr('data-tab');
                _this._showCurrentTab();
            }
        );

        // Stand alone links
        this._element.find('.tabLink').click(
            function(event) {
                event.preventDefault();
                _this._currentTab = $(this).attr('data-tab');
                _this._showCurrentTab();
            }
        );
    },

    /**
     * _showCurrentTab
     * 
     * @protected
     * @return    void
     */
    _showCurrentTab: function() {
        this._element.find('ul.nav-tabs li.active').removeClass('active');
        this._element.find('ul.nav-tabs li a[data-tab="' + (this._currentTab) + '"]').parent().addClass('active');
        this._element.find('div.content div.block').addClass('hidden');
        this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').removeClass('hidden');
        location.hash = 'tab=' + (this._currentTab);
    },

    /**
     * _showProperStep
     * 
     * @protected
     * @return    void
     */
    _showProperStep: function() {
        if (location.hash !== '') {
            var pieces = location.hash.split('&'),
                hash = {},
                again;
            $(pieces).each(
                function(index, piece) {
                    again = piece.split('=');
                    hash[again[0].replace('#', '')] = again[1];
                }
            );
            this._currentTab = hash.tab;
            this._showCurrentTab();
            if (
                typeof hash.success !== 'undefined'
                && parseInt(hash.success) === 1
            ) {
                this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').addClass('success');
            }
        }
    }
});
