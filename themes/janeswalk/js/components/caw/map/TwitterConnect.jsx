/**
 * Pull all the tweets
 */

export default class TwitterConnect extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      accessToken: true
    };
  }

  componentWillMount() {
    window.setAccessToken = accessToken => this.setState({accessToken: accessToken});
  }

  handleLoadToken() {
    // Twitter requires a server-side auth with secret, so clients get token from JW
    $.ajax({
      method: 'GET',
      url: '/api/twitter',
      dataType: 'json',
      success: data => {
        if (data.access_token) {
          this.setState({accessToken: data.access_token});
        }
      }
    });
  }

  loadFeed(query) {
    query = encodeURIComponent(query);

    $.ajax({
      type: 'GET',
      url: '/api/twitter?q=' + query + '&coords=' + this.props.city.latlng[0] + ',' + this.props.city.latlng[1],
      success: data => {
        const markers = (this.props.valueLink.value || {markers: []}).markers.slice();

        this.props.valueLink.requestChange({
          markers: markers.concat(data.map(tweet => ({
            // Take first 5 words as the title
            title: tweet.description.split(' ').slice(0, 5).join(' '),
            description: tweet.description,
            lat: tweet.lat,
            lng: tweet.lng,
          }))),
          route: this.props.valueLink.value.route
        }, () => {
          // kludge - need to find if there's a callback we can pass into gmaps for this
          setTimeout(() => {
            this.props.refreshGMap();
            this.props.boundMapByWalk();
          }, 100);
        });
      }
    });
  }

  handleQueryChange(ev) {
    this.setState({query: ev.target.value});
  }

  addFilter() {
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
      <button onClick={() => this.addFilter}>
        <i className="fa fa-twitter" />
        twitter
      </button>
    );
  }
}
