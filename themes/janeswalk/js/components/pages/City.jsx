import PageView from '../Page.jsx';

/**
 * CityPageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
export default class CityPageView extends PageView {
  constructor(element) {
    super(element);
    this._resetSelectElements();
    this._initMenu();
    this._addCreateWalkEvent();

    $('.walks-filters .tag').tooltip();
  }

  /**
   * _getFacebookDialogDonateObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogDonateObj() {
    return {
      link: 'http://janeswalk.org',
      // picture: 'http://janeswalk.org',
      name: 'Jane\'s Walk'
    };
  }

  /**
   * _setupText2DonateInterstitials
   * 
   * @protected
   * @return    void
   */
  _setupText2DonateInterstitials() {
    let enabled = false,
      isCanadianCity = (location.pathname.match(/\/canada\/[^/]+/) !== null),
      hasSeenDonateInterstitial,
      closeCallback,
      url,
      link;
    const el = this.getElement();

    // Catfish events
    el.find('a.closeCatfishCta').click(event => {
      event.preventDefault();
      el.find('.catfish').hide();

      // Track the closure
      localStorage.setItem('hasSeenDonateCatfish', 1);
    });

    // Canadian city check
    if (enabled && isCanadianCity === true) {

      // Modal
      hasSeenDonateInterstitial = !!localStorage.getItem('hasSeenDonateInterstitial') &&
        !!localStorage.getItem('hasSeenDonateInterstitial');

      // Hasn't yet been seen
      if (hasSeenDonateInterstitial === false) {
        closeCallback = () => {

          // Track the closure
          localStorage.setItem('hasSeenDonateInterstitial', 1);

          // Open the catfish
          el.find('.catfish.c-donate').removeClass(
            'hidden'
          );
        };
        el.find('.overlay.o-donate').show();
        el.find('.overlay.o-donate .o-background').click(closeCallback);
        el.find('a.closeModalCta').click(closeCallback);

        // Already donated flow
        el.find('div.btnWrapper a').click(event => {
          // Track the closure
          localStorage.setItem('hasSeenDonateInterstitial', 1);

          // Track the closure
          localStorage.setItem('hasSeenDonateCatfish', 1);

          // Shout modal
          event.preventDefault();
          el.find('.o-donate').hide();
          el.find('.o-shout').show();

          // Twitter button
          el.find('.o-shout .icon-twitter').click(function(event) {
            event.preventDefault();
            url = encodeURIComponent(
              'http://janeswalk.org/'
            );
            text = encodeURIComponent(
              $(this).closest('.option').find('.copy').text().trim()
            );
            link = 'https://twitter.com/intent/tweet' +
            '?url=' + (url) +
              '&via=janeswalk' +
              '&text=' + (text);
            window.open(
              link,
              'Twitter Share',
              'width=640, height=320'
            );
          });

          // Twitter button
          el.find('.o-shout .icon-facebook').click(function(event) {
            const shareObj = _this._getFacebookDialogDonateObj();
            event.preventDefault();
            shareObj.description = $(this).closest('.option').find('.copy').text().trim();
            (new FacebookShareDialog(shareObj)).show();
          });
        });
      } else {

        // Catfish
        hasSeenDonateCatfish = !!localStorage.getItem('hasSeenDonateCatfish');

        // Hasn't yet been seen
        if (hasSeenDonateCatfish === false) {
          el.find('.catfish').removeClass('hidden');
        }
      }
    }
  }

  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent() {
    const $btn = this.getElement().find('.create-walk');
    $btn.click(event => {
      if (!JanesWalk.user) {
        event.preventDefault();
        // Redirect to the CAW you were attempting
        // FIXME: bad approach - should be dispatcher based
        JanesWalk.react.login.props.redirectURL = this.href;
        $('#login').modal();
      }
    });
  }
}
