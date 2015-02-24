'use strict';

var WalkInfoWindow = React.createClass({
  getInitialState: function() {
    return {
      marker: null
    };
  },
  componentWillMount: function() {
    this.setState({
      marker: this.props.marker
    });
  },
  setMarkerContent: function(ev) {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());
    if (ev.target.classList.contains('marker-title')) {
      markerContent.title = ev.target.value;
    } else if (ev.target.classList.contains('marker-description')) {
      markerContent.description = ev.target.value;
    }
    marker.setTitle(JSON.stringify(markerContent));
    this.setState({marker: marker});
    this.props.refresh();
  },
  render: function() {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());
    var media;

    // Load rich media
    if (markerContent.media) {
      if (markerContent.media.type === 'instagram') {
        media = <img src={markerContent.media.url + 'media?size=t'} />;
      } else if (markerContent.media.type === 'soundcloud') {
        media = <iframe width="200" height="200" scrolling="no" frameborder="no" src={'https://w.soundcloud.com/player/?url=' + markerContent.media.url + '&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true'} />;
      }
    }

    return (
      <div className='stop-form'>
        {media}
        <section className="details">
          <input
            type='text'
            onChange={this.setMarkerContent}
            value={markerContent.title}
            placeholder='Title of this stop'
            className='marker-title'
          />
          <textarea
            className='marker-description box-sizing'
            onChange={this.setMarkerContent}
            placeholder='Description of this stop'
            value={markerContent.description}
          />
        </section>
        <a onClick={this.props.deleteMarker}>
          <i className="fa fa-trash-o" />
        </a>
      </div>
    );
  }
});

module.exports = WalkInfoWindow;
