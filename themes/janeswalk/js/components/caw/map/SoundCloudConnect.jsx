'use strict';

var SoundCloudConnect = React.createClass({
  getInitialState: function() {
    return {
      playlistSelected: 0,
      playlists: []
    };
  },

  handleConnect: function() {
    var clientID = '3a4c85d0eb4f8579fb680bb738bd0ba8';
    var redirectURI = 'http://janeswalk.org/connected';

    // FIXME Race-condition prone if you open multiple services in parallel
    window.loadAccessToken = function(accessToken) {
      this.setState({accessToken: accessToken}, this.handleLoadPlaylists(accessToken));
    }.bind(this);

    var authWindow = window.open('https://soundcloud.com/connect/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token&state=soundcloud');
    this.setState({authWindow: authWindow});
  },

  handleLoadPlaylists: function(accessToken) {
    var _this = this;
    accessToken = accessToken || this.state.accessToken;

    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.soundcloud.com/me/playlists.json?oauth_token=' + accessToken,
      success: function(data) {
        _this.setState({playlists: data});
      }
    });
  },

  handlePlaylistChange: function(ev) {
    this.setState({playlistSelected: ev.target.value});
  },

  loadPointsFromPlaylist: function() {
    var _this = this;

    var points = this.state.playlists[this.state.playlistSelected].tracks.map(function(track) {
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
    _this.props.valueLink.requestChange({markers: points, route: []}, function() {
      _this.props.refreshGMap();
      _this.props.boundMapByWalk();
    });
  },

  render: function() {
    var playlists = (
      <select ref={playlists} selected={this.state.playlistSelected} onChange={this.handlePlaylistChange}>
        {this.state.playlists.map(function(playlist, i) {
          return <option key={'playlist' + i} value={i}>{playlist.title}</option>
        })}
      </select>
    );
    if (this.state.accessToken) {
      return (
        <div className="loadFeed">
          <i className="fa fa-soundcloud" />
          {playlists}
          <a onClick={this.loadPointsFromPlaylist}>Load</a>
        </div>
      );
    } else {
      return (
        <button onClick={this.handleConnect}>
          <i className="fa fa-soundcloud" />
          SoundCloud
        </button>
      );
    }
  }
});

module.exports = SoundCloudConnect;
