export default class InstagramConnect extends React.Component {
  constructor() {
    super();
    this.state = {accessToken: null};
  }

  handleConnect(cb) {
    const clientID = 'af1d04f3e16940f3801ee06461c9e4bb';
    const redirectURI = 'http://janeswalk.org/connected';

    // Race-condition prone, but safest way to pull this from a child window
    window.loadAccessToken = accessToken => this.setState({accessToken: accessToken}, cb);

    const authWindow = window.open('https://instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token');
    this.setState({authWindow: authWindow});
  }

  handleLoadFeed(query) {
    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.state.accessToken,
      success: (data) => {
        const markers = (this.props.valueLink.value || {markers: []}).markers.slice();
        const walkMap = data.data.filter(gram => {
          let tagMatch = true;
          if (query) {
            tagMatch = gram.tags.indexOf(query) !== -1;
          }
          return !!(gram.location && tagMatch);
        })
        .reverse()
        .map(gram => {
          // If the first comment is from the owner, use that as the description
          let description = '';
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
              type: 'instagram'
            },
            lat: gram.location.latitude,
            lng: gram.location.longitude
          };
        });

        this.props.valueLink.requestChange({
          markers: markers.concat(walkMap),
          route: _this.props.valueLink.value.route
        }, function() {
          this.props.refreshGMap();
          this.props.boundMapByWalk();
        });
      }
    });
  }

  render() {
    const addFilter = () => {
      const filterProps = {
        type: 'text',
        icon: 'fa fa-instagram',
        placeholder: 'Type in the tag you used on the geocoded photos for your walk',
        value: '',
        cb: this.handleLoadFeed.bind(this)
      }
      if (this.state.accessToken) {
        this.props.addFilter(filterProps);
      } else {
        // Connect, and add the box when done
        this.handleConnect(() => this.props.addFilter(filterProps));
      }
    };

    return (
      <button onClick={addFilter}>
        <i className="fa fa-instagram" />
        Instagram
      </button>
    );
  }
}
