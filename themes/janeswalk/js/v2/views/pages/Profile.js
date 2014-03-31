
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
          width: '<?= (AVATAR_WIDTH) ?>',
          height: '<?= (AVATAR_HEIGHT) ?>',
          image: '<?= ($av->getImagePath($ui)) ?>',
          save: '<?= ($this->url($c->getCollectionPath(), 'save_thumb')) ?>'
        };
      swfobject.embedSWF(
        '<?= (ASSETS_URL_FLASH) ?>/thumbnail_editor_3.swf',
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
        var _this = this;
        this._element.find('ul.nav-tabs li a').click(
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
    },

    /**
     * _showProperStep
     * 
     * @protected
     * @return    void
     */
    _showProperStep: function() {

    }
});
