class SoundCloudConnect extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    }
  }

  handleConnect(cb) {
    var clientID = '3a4c85d0eb4f8579fb680bb738bd0ba8';
    var redirectURI = 'http://janeswalk.org/connected';

    // FIXME Race-condition prone if you open multiple services in parallel
    window.loadAccessToken = function(accessToken) {
      this.setState({accessToken: accessToken}, this.handleLoadPlaylists(accessToken, cb));
    }.bind(this);

    var authWindow = window.open('https://soundcloud.com/connect/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token&state=soundcloud');
    this.setState({authWindow: authWindow});
  }

  handleLoadPlaylists(accessToken, cb) {
    var _this = this;
    accessToken = accessToken || this.state.accessToken;

    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.soundcloud.com/me/playlists.json?oauth_token=' + accessToken,
      success: function(data) {
        _this.setState({playlists: data});
        cb();
      }
    });
  }

  loadPointsFromPlaylist(i) {
    var _this = this;
    var markers = (_this.props.valueLink.value || {markers: []}).markers.slice();

    var points = this.state.playlists[i].tracks.map(function(track) {
      var point = {
        title: track.title || '',
        description: track.description || '',
        media: {
          type: 'soundcloud',
          id: track.id,
          url: track.uri
        }
      };

      // Soundcloud puts geotags in the regular tags, as geo:lat=
      track.tag_list.split(' ').forEach(function(tag) {
        var idx;
        idx = tag.indexOf('geo:lat=');
        if (idx > -1) {
          point.lat = tag.substr(idx + 8);
        }
        idx = tag.indexOf('geo:lon=');
        if (idx > -1) {
          point.lng = tag.substr(idx + 8);
        }
      });

      return point;
    });
    _this.props.valueLink.requestChange({markers: markers.concat(points), route: _this.props.valueLink.value.route}, function() {
      _this.props.refreshGMap();
      _this.props.boundMapByWalk();
    });
  }

  render() {
    var _this = this;
    var addFilter = function() {
      var filterProps = {
        type: 'select',
        icon: 'fa fa-soundcloud',
        options: _this.state.playlists,
        value: 0,
        cb: _this.loadPointsFromPlaylist
      }
      if (_this.state.accessToken) {
        _this.props.addFilter(filterProps);
      } else {
        // Connect, and add the box when done
        _this.handleConnect(function() {
          filterProps.options = _this.state.playlists;
          _this.props.addFilter(filterProps);
        });
      }
    };

    return (
      <button onClick={addFilter}>
        <i className="fa fa-soundcloud" />
        SoundCloud
      </button>
    );
  }
}

export default SoundCloudConnect;
