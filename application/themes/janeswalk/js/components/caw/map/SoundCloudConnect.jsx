/**
 * SoundCloud Connect
 * Play sounds in your walk!
 */

class SoundCloudConnect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: []
    }

    // Bind functions that need to use local scope
    this.handleAddFilter = this.handleAddFilter.bind(this);
  }

  /**
   * Connect to SoundCloud
   *
   * @param function cb Executes once connection is made
   */
  handleConnect(cb) {
    const clientID = '3a4c85d0eb4f8579fb680bb738bd0ba8';
    const redirectURI = 'http://janeswalk.org/connected';

    // FIXME Race-condition prone if you open multiple services in parallel
    window.loadAccessToken =
      accessToken => this.setState({accessToken: accessToken}, this.handleLoadPlaylists(accessToken, cb));

    window.open('https://soundcloud.com/connect/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token&state=soundcloud');
  }

  /**
   * Load the user's playlists from the API
   *
   * @param string accessToken The token for this session
   * @param function cb Executes once the playlist is loaded
   */
  handleLoadPlaylists(accessToken, cb) {
    const _this = this;
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

  /**
   * Load the points for the map markers from this playlist
   *
   * @param playlistIndex which playlist in our array to pull markers for
   */
  loadPointsFromPlaylist(playlistIndex) {
    const markers = (this.props.valueLink.value || {markers: []}).markers.slice();

    const points = this.state.playlists[playlistIndex].tracks.map(track => {
      const point = {
        title: track.title || '',
        description: track.description || '',
        media: {
          type: 'soundcloud',
          id: track.id,
          url: track.uri
        }
      };

      // Soundcloud puts geotags in the regular tags, as geo:lat=
      track.tag_list.split(' ').forEach(tag => {
        let idx = tag.indexOf('geo:lat=');

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

    // Load our markers into the map state
    this.props.valueLink.requestChange({markers: markers.concat(points), route: this.props.valueLink.value.route}, () => {
      this.props.refreshGMap();
      this.props.boundMapByWalk();
    });
  }

  /**
   * Build a filter for our filter list
   */
  handleAddFilter() {
    const filterProps = {
      type: 'select',
      icon: 'fa fa-soundcloud',
      options: _this.state.playlists,
      value: 0,
      cb: _this.loadPointsFromPlaylist
    }

    if (this.state.accessToken) {
      this.props.addFilter(filterProps);
    } else {
      // Connect, and add the box when done
      this.handleConnect(() => {
        filterProps.options = this.state.playlists;
        this.props.addFilter(filterProps);
      });
    }
  }

  render() {
    return (
      <button onClick={this.handleAddFilter}>
        <i className="fa fa-soundcloud" />
        SoundCloud
      </button>
    );
  }
}

export default SoundCloudConnect;
