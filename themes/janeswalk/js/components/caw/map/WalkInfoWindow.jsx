'use strict';

/**
 * The 'info window', aka the input box that pops up over markers in maps
 */

function WalkInfoWindow(props) { 
  // Weird, but needed since it's rendering to a DOM node
  this.state = {marker: props.marker};

  // Bind methods
  this.handleTitleChange = this.handleTitleChange.bind(this);
  this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
}

WalkInfoWindow.prototype = Object.create(React.Component.prototype, {
  constructor: {value: WalkInfoWindow},

  /**
   * Set the content of this marker
   * @param Object props The properties to set
   */
  setMarkerContent: {
    value: function(props) {
      var marker = this.state.marker;
      // Parse, apply new properties, re-encode then assign as new title. Needed
      // as gmaps doesn't give you multiple fields, so we encode in the title.
      marker.setTitle(JSON.stringify(Object.assign({}, JSON.parse(marker.getTitle()), props)));
      this.setState({marker: marker}, this.props.refresh);
    }
  },

  // Simple method to set title property
  handleTitleChange: {
    value: function(ev) {
      this.setMarkerContent({title: ev.target.value});
    },
    writable: true
  },

  // Simple method to set description property
  handleDescriptionChange: {
    value: function(ev) {
      this.setMarkerContent({description: ev.target.value});
    },
    writable: true
  },

  render: {
    value: function() {
      var marker = this.state.marker;
      var markerContent = JSON.parse(marker.getTitle());
      var media;

      // Load rich media
      if (markerContent.media) {
        if (markerContent.media.type === 'instagram') {
          media = <img className="media" src={markerContent.media.url + 'media?size=t'} />;
        } else if (markerContent.media.type === 'soundcloud') {
          media = <iframe className="media" width="150" height="100%" scrolling="no" frameborder="no" src={'https://w.soundcloud.com/player/?url=' + markerContent.media.url + '&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true'} />;
        }
      }

      return (
        <div className='stop-form'>
          {media}
          <section className="details">
            <input
              type='text'
              onChange={this.handleTitleChange}
              value={markerContent.title}
              placeholder='Title of this stop'
              className='marker-title'
            />
            <textarea
              className='marker-description box-sizing'
              onChange={this.handleDescriptionChange}
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
  }
});

module.exports = WalkInfoWindow;
