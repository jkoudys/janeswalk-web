/**
 * Instagram connect
 *
 * Connect to the Instagram API to pull a photoset
 */

class InstagramConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {accessToken: null};

    // Bind functions that need to use local scope
    this.handleAddFilter = this.handleAddFilter.bind(this);
  }

  /**
   * Connect to Instagram
   *
   * @param function cb Executes once instagram connection is made
   */
  handleConnect(cb) {
    const clientID = 'af1d04f3e16940f3801ee06461c9e4bb';
    /** @param string redirectURI JW page, trusted by service, to receive oauth */
    const redirectURI = 'http://janeswalk.org/connected';

    // Race-condition prone, but safest way to pull this from a child window
    window.loadAccessToken = accessToken => this.setState({accessToken: accessToken}, cb);

    window.open('https://instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token');
  }

  /**
   * Load the instagram feed matching your query
   *
   * @param string query Query for instagram hashtags
   */
  handleLoadFeed(query) {
    const _this = this;

    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.state.accessToken,
      success: function(data) {
        const markers = (_this.props.valueLink.value || {markers: []}).markers.slice();
        const walkMap = data.data.filter(gram => {
          let tagMatch = true;
          if (query) {
            tagMatch = gram.tags.indexOf(query) !== -1;
          }
          return !!(gram.location && tagMatch);
        })
        .reverse()
        .map(gram => {
          // If the first comment is from the owner, use that as the description
          let description = '';
          if (gram.comments && gram.comments.data.length > 0) {
            if (gram.comments.data[0].from.id === gram.user.id) {
              description = gram.comments.data[0].text;
            }
          }

          return {
            title: gram.caption ? gram.caption.text.replace(/\#\w+/g, '').trim() : '',
            description: description,
            media: {
              id: gram.id,
              url: gram.link,
              type: 'instagram'
            },
            lat: gram.location.latitude,
            lng: gram.location.longitude
          };
        });

        _this.props.valueLink.requestChange({markers: markers.concat(walkMap), route: _this.props.valueLink.value.route}, function() {
          _this.props.refreshGMap();
          _this.props.boundMapByWalk();
        });
      }
    });
  }

  /**
   * Build a filter for our filter list
   */
  function handleAddFilter() {
    const filterProps = {
      type: 'text',
      icon: 'fa fa-instagram',
      placeholder: 'Type in the tag you used on the geocoded photos for your walk',
      value: '',
      cb: _this.handleLoadFeed.bind(_this)
    }
    if (this.state.accessToken) {
      this.props.addFilter(filterProps);
    } else {
      // Connect, and add the box when done
      this.handleConnect(() => {
        this.props.addFilter(filterProps);
      });
    }
  }

  render() {
    return (
      <button onClick={this.handleAddFilter}>
        <i className="fa fa-instagram" />
        Instagram
      </button>
    );
  }
}

export default InstagramConnect;
