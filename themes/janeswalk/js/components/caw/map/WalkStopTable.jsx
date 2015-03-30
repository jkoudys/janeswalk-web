'use strict';
/**
 * The table with all the walk stops on it, in CAW
 */

function WalkStopTable() {}

WalkStopTable.prototype = Object.create(React.Component.prototype, {
  constructor: {value: WalkStopTable},

  componentDidMount: {
    value: function() {
      // Setup sorting on the walk-stops list
      $(React.findDOMNode(this)).sortable({
        items: 'tbody tr',
        update: function(event, ui) {
          this.props.insertBefore(
            this.props.markers.getAt(ui.item.data('position')),
            this.props.markers.getAt(ui.item.index())
          );
        }.bind(this)
      });
    }
  },

  render: {
    value: function() {
      var t = this.props.i18n.translate.bind(this.props.i18n);
      return (
        <table ref="routeStops" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>{ t('Title') }</th>
              <th>{ t('Description') }</th>
              <th><i className="fa fa-trash-o" /></th>
            </tr>
          </thead>
          <tbody>
            {this.props.markers.getArray().map(function(marker, i) {
              var titleObj = JSON.parse(marker.title);
              var showInfoWindow = function() {
                this.props.showInfoWindow(marker);
              }.bind(this);
              var deleteMarker = function() {
                this.props.deleteMarker(marker);
              }.bind(this);
              var imageThumb = null;

              if (titleObj.media) {
                if (titleObj.media.type === 'instagram') {
                  imageThumb = <img src={titleObj.media.url + 'media?size=t'} />;
                }
              }
              return (
                <tr data-position={i} key={'marker' + i}>
                  <td onClick={showInfoWindow}>{imageThumb}{titleObj.title}</td>
                  <td onClick={showInfoWindow}>{titleObj.description}</td>
                  <td>
                    <a className="delete-stop" onClick={deleteMarker}>
                      <i className="fa fa-times-circle-o" />
                    </a>
                  </td>
                </tr>
                );
            }.bind(this))}
          </tbody>
        </table>
      );
    }
  }
});

module.exports = WalkStopTable;
