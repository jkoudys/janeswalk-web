class InstagramConnect extends React.Component {
  constructor() {
    super();
    this.state = {accessToken: null};
  }

  handleConnect(cb) {
    var clientID = 'af1d04f3e16940f3801ee06461c9e4bb';
    var redirectURI = 'http://janeswalk.org/connected';

    // Race-condition prone, but safest way to pull this from a child window
    window.loadAccessToken = function(accessToken) {
      this.setState({accessToken: accessToken}, cb);
    }.bind(this);

    var authWindow = window.open('https://instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token');
    this.setState({authWindow: authWindow});
  }

  handleLoadFeed(query) {
    var _this = this;

    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.state.accessToken,
      success: function(data) {
        var markers = (_this.props.valueLink.value || {markers: []}).markers.slice();
        var walkMap = data.data.filter(function(gram) {
          var tagMatch = true;
          if (query) {
            tagMatch = gram.tags.indexOf(query) !== -1;
          }
          return !!(gram.location && tagMatch);
        })
        .reverse()
        .map(function(gram) {
          // If the first comment is from the owner, use that as the description
          var description = '';
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

  render() {
    var _this = this;
    var addFilter = function() {
      var filterProps = {
        type: 'text',
        icon: 'fa fa-instagram',
        placeholder: 'Type in the tag you used on the geocoded photos for your walk',
        value: '',
        cb: _this.handleLoadFeed.bind(_this)
      }
      if (_this.state.accessToken) {
        _this.props.addFilter(filterProps);
      } else {
        // Connect, and add the box when done
        _this.handleConnect(function() {
          _this.props.addFilter(filterProps);
        });
      }
    };

    return (
      <button onClick={addFilter}>
        <i className="fa fa-instagram" />
        Instagram
      </button>
    );
  }
}

export default InstagramConnect;
