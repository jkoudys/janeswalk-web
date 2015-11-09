import PageView from '../Page.jsx';

/**
 * _isMobile
 *
 * @static
 * @var bool
 */
const _isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const facebookDialogDonate = {
  link: 'http://janeswalk.org',
  // picture: 'http://janeswalk.org',
  name: 'Jane\'s Walk'
};

function shareOnTwitter(event) {
  const url = encodeURIComponent('http://janeswalk.org/');
  const text = encodeURIComponent($(this).closest('.option').find('.copy').text().trim());
  const link = 'https://twitter.com/intent/tweet' +
    '?url=' + url +
    '&via=janeswalk' +
    '&text=' + text;

  window.open(
    link,
    'Twitter Share',
    'width=640, height=320'
  );

  event.preventDefault();
}

function shareOnFacebook(event) {
  const shareObj = Object.assign({}, facebookDialogDonate, {
    description: $(this).closest('.option').find('.copy').text().trim()
  });
  (new FacebookShareDialog(shareObj)).show();
  event.preventDefault();
}

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
    this._addCreateWalkEvent();
  }

  /**
   * _addCreateWalkEvent
   *
   * @protected
   * @return    void
   */
  _addCreateWalkEvent() {
    const $btn = $('.create-walk');
    $btn.click(function(event) {
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
