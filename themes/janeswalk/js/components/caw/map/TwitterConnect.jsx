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

  loadFeed: function(query) {
    var _this = this;

    $.ajax({
      type: 'GET',
      url: '/api/twitter?q=' + query + '&coords=' + this.props.city.lat + ',' + this.props.city.lng,
      success: function(data) {
        var markers = (_this.props.valueLink.value || {markers: []}).markers.slice();

        _this.props.valueLink.requestChange({
          markers: markers.concat(data.map(function(tweet) {
            // Take first 5 words as the title
            return {
              title: tweet.description.split(' ').slice(0, 5).join(' '),
              description: tweet.description,
              lat: tweet.lat,
              lng: tweet.lng,
            };
          })),
          route: _this.props.valueLink.value.route
        }, function() {
          // kludge - need to find if there's a callback we can pass into gmaps for this
          setTimeout(function() {
            _this.props.refreshGMap();
            _this.props.boundMapByWalk();
          }, 100);
        });
      }
    });
  },

  handleQueryChange: function(ev) {
    this.setState({query: ev.target.value});
  },

  render: function() {
    var addFilter = function() {
      // The filter we set to the 'filter box'
      this.props.addFilter({
        type: 'text',
        icon: 'fa fa-twitter',
        placeholder: 'Type in a standard twitter search for geocoded tweets, e.g. "#ParkStroll #janeswalk from:MyName"',
        value: '',
        cb: this.loadFeed
      });
    }.bind(this);

    return (
      <button onClick={addFilter}>
        <i className="fa fa-twitter" />
        twitter
      </button>
    );
  }
});

module.exports = TwitterConnect;
