/**
 * Get some sounds from SoundCloud!
 */

export default class SoundCloudConnect extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    };
  }

  handleConnect(cb) {
    const clientID = '3a4c85d0eb4f8579fb680bb738bd0ba8';
    const redirectURI = 'http://janeswalk.org/connected';

    // FIXME Race-condition prone if you open multiple services in parallel
    window.loadAccessToken = accessToken => {
      this.setState({accessToken: accessToken}, this.handleLoadPlaylists(accessToken, cb));
    };

    const authWindow = window.open('https://soundcloud.com/connect/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token&state=soundcloud');
    this.setState({authWindow: authWindow});
  }

  handleLoadPlaylists(accessToken, cb) {
    accessToken = accessToken || this.state.accessToken;

    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.soundcloud.com/me/playlists.json?oauth_token=' + accessToken,
      success: data => {
        _this.setState({playlists: data});
        cb();
      }
    });
  }

  loadPointsFromPlaylist(i) {
    const markers = (this.props.valueLink.value || {markers: []}).markers.slice();

    const points = this.state.playlists[i].tracks.map(track => {
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
        let idx;
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

    this.props.valueLink.requestChange({markers: markers.concat(points), route: this.props.valueLink.value.route}, () => {
      this.props.refreshGMap();
      this.props.boundMapByWalk();
    });
  }

  addFilter() {
    const filterProps = {
      type: 'select',
      icon: 'fa fa-soundcloud',
      options: this.state.playlists,
      value: 0,
      cb: this.loadPointsFromPlaylist
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
    var _this = this;

    return (
      <button onClick={() => this.addFilter()}>
        <i className="fa fa-soundcloud" />
        SoundCloud
      </button>
    );
  }
}
