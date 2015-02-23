'use strict';

var TwitterConnect = React.createClass({
  getInitialState: function() {
    return {
      query: '',
      accessToken: true
    };
  },

  componentWillMount: function() {
    window.setAccessToken = function(accessToken) {
      this.setState({accessToken: accessToken});
    }.bind(this);
  },

  handleLoadToken: function() {
    var _this = this;

    // Twitter requires a server-side auth with secret, so clients get token from JW
    $.ajax({
      method: 'GET',
      url: '/api/twitter',
      dataType: 'json',
      success: function(data) {
        if (data.access_token) {
          _this.setState({accessToken: data.access_token});
        }
      }
    });
  },

  handleLoadFeed: function() {
    var _this = this;

    $.ajax({
      type: 'GET',
      url: '/api/twitter?q=' + this.state.query,
      success: function(data) {
        _this.props.valueLink.requestChange({markers: data, route: []}, function() {
          _this.props.refreshGMap();
          _this.props.boundMapByWalk();
        });
      }
    });
  },

  handleQueryChange: function(ev) {
    this.setState({query: ev.target.value});
  },

  render: function() {
    if (this.state.accessToken) {
      return (
        <div className="loadFeed">
          <i className="fa fa-twitter" />
          <input type="text" placeholder="Walk Tag" value={this.state.query} onChange={this.handleQueryChange} />
          <a onClick={this.handleLoadFeed}>Load</a>
        </div>
      );
    } else {
      return (
        <button onClick={this.handleLoadToken}>
          <i className="fa fa-twitter" />
          twitter
        </button>
      );
    }
  }
});

module.exports = TwitterConnect;
