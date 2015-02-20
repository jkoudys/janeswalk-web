'use strict';

var TwitterConnect = React.createClass({
  getInitialState: function() {
    return {
      tag: ''
    };
  },

  componentWillMount: function() {
    window.setAccessToken = function(accessToken) {
      this.setState({accessToken: accessToken});
    }.bind(this);
  },

  handleConnect: function() {
    var clientID = 'IVfBVtRBs7AT7gQnhU3o8iHpc';
    var redirectURI = 'http://janeswalk.org/connected';
    var authWindow = window.open('https://twitter.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token');
    this.setState({authWindow: authWindow});
  },

  handleLoadToken: function() {
    var hash = this.state.authWindow.location.hash;
    this.setState({
      authWindow: undefined,
      accessToken: hash.substr(hash.indexOf('=') + 1)
    });
  },

  handleLoadFeed: function() {
    var _this = this;
    var tag = this.state.tag;

    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.state.accessToken,
      success: function(data) {
        var walkMap = data.data.filter(function(gram) {
          var tagMatch = true;
          if (tag) {
            tagMatch = gram.tags.indexOf(tag) !== -1;
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
              type: 'twitter'
            },
            lat: gram.location.latitude,
            lng: gram.location.longitude
          };
        });

        _this.props.valueLink.requestChange({markers: walkMap, route: []}, function() {
          _this.props.refreshGMap();
          _this.props.boundMapByWalk();
        });
      }
    });
  },

  handleTagChange: function(ev) {
    this.setState({tag: ev.target.value});
  },

  render: function() {
    if (this.state.accessToken) {
      return (
        <div className="loadFeed">
          <i className="fa fa-twitter" />
          <input type="text" placeholder="Walk Tag" value={this.state.tag} onChange={this.handleTagChange} />
          <a onClick={this.handleLoadFeed}>Load</a>
        </div>
      );
    } else if (this.state.authWindow) {
      return (
        <a onClick={this.handleLoadToken}>Get that token!</a>
      );
    } else {
      return (
        <button onClick={this.handleConnect}>
          <i className="fa fa-twitter" />
          twitter
        </button>
      );
    }
  }
});

module.exports = TwitterConnect;
