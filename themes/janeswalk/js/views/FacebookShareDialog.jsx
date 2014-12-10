'use strict';
/**
* The dialogue to share on facebook
* 
* @public
* @param  Object shareObj
* @return void
*/
var FacebookShareDialog = function(shareObj) {
  this._shareObj = shareObj;
  this._shareObj.method = 'feed';
};
Object.defineProperties(FacebookShareDialog.prototype, {
  /**
   * _shareObj
   * 
   * @protected
   * @var       Object (default: null)
   */
  _shareObj: {value: null, writable: true},

  /**
   * show
   * 
   * @public
   * @param  Function failed
   * @param  Function successful
   * @return void
   */
  show: {
    value: function(failed, successful) {
      var _this = this;
      FB.ui(
        this._shareObj,
        function(response) {
          if (response !== undefined) {
            if (response === null) {
              if (failed) failed();
            } else {
              if (successful) successful();
            }
          }
        }
      );
    }
  }
});

module.exports = FacebookShareDialog;

