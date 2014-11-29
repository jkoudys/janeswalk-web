
/**
 * View
 * 
 * @extends Class
 */
var View = Class.extend({

    /**
     * _element
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    _element: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._element = element;
    },

    /**
     * getElement
     * 
     * @public
     * @return HTMLFormElement
     */
    getElement: function() {
        return this._element;
    }
});
