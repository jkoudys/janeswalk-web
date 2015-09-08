/**
 * Connect to Twitter
 * Doesn't technically connect to twitter, but to the Jane's Walk
 * server which connects for you.
 */

import * as NotifyActions from '../../../actions/NotifyActions.js';

class TwitterConnect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    // Bind functions that need to use local scope
    this.handleAddFilter = this.handleAddFilter.bind(this);
  }

  /**
   * JW already has a public connection to twitter, so we can load a feed
   * directly from them.
   *
   * @param string query The same sort of query twitter.com/search uses
   */
  loadFeed(query) {
    const _this = this;
    const xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      '/api/twitter?q=' + window.encodeURIComponent(query) + '&coords=' + this.props.city.latlng[0] + ',' + this.props.city.latlng[1]
    );
    xhr.onload = function() {
      const data = JSON.parse(this.responseText);
      const markers = (_this.props.valueLink.value || {markers: []}).markers.slice();

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
    };
  }

  /**
   * Create a 'filter' to specify which tweets to load
   */
  handleAddFilter() {
    // The filter we set to the 'filter box'
    this.props.addFilter({
      type: 'text',
      icon: 'fa fa-twitter',
      placeholder: 'Type in a standard twitter search for geocoded tweets, e.g. "#ParkStroll #janeswalk from:MyName"',
      value: '',
      cb: this.loadFeed
    });
  }

  render() {
    return (
      <button onClick={this.handleAddFilter}>
        <i className="fa fa-twitter" />
        twitter
      </button>
    );
  }
}

export default TwitterConnect;
