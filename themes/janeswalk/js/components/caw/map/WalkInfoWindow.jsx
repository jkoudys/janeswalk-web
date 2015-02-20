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
    var image = markerContent.media ? <img src={markerContent.media.url + 'media?size=t'} /> : null;

    return (
      <div className='stop-form'>
        {image}
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
