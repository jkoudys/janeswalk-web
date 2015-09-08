/**
 * Connect to Twitter
 * Doesn't technically connect to twitter, but to the Jane's Walk
 * server which connects for you.
 */

class TwitterConnect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      accessToken: true
    };
  }

  componentWillMount() {
    window.setAccessToken = function(accessToken) {
      this.setState({accessToken: accessToken});
    }.bind(this);
  }

  handleLoadToken() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/twitter');
    xhr.onload = function() {
      let data;
      data = JSON.parse(this.responseText);
      if (data.access_token) {
        _this.setState({accessToken: data.access_token});
      }
    };
    xhr.onerror = function() {
    };
    xhr.send();
  }

  loadFeed(query) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      '/api/twitter?q=' + encodeURIComponent(query) +
      '&coords=' + this.props.city.latlng[0] + ',' + this.props.city.latlng[1]
    );
    xhr.onload = function() {
      let data;
      data = JSON.parse(this.responseText);
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
    xhr.send();
  }

  handleQueryChange(ev) {
    this.setState({query: ev.target.value});
  }

  render() {
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
}

export default TwitterConnect;
