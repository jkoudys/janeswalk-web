var View = require('../View.jsx');

/**
 * ModalView
 * 
 * @extends View
 */
var ModalView = View.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addCloseEvents();
    },

    /**
     * _addCloseEvents
     * 
     * @protected
     * @return    void
     */
    _addCloseEvents: function() {
        var _this = this;
        this._element.find('.closeModalSource').click(
            function(event) {
                event.preventDefault();
                _this.close();
            }
        );
    }
});

modules.extend = ModalView;
