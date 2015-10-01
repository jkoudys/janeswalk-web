// Flux
const t = require('../../../stores/I18nStore.js').getTranslate();

/**
 * The table with all the walk stops on it, in CAW
 */
export default class WalkStopTable extends React.Component {
  render() {
    const markersSet = this.props.markers.getArray();
    return (
      <table ref="routeStops" className="table-hover routeStops">
        <thead>
          <tr>
            <th>{ t('Title') }</th>
            <th>{ t('Description') }</th>
            <th className="controls"><i className="fa fa-arrows" /></th>
            <th><i className="fa fa-trash-o" /></th>
          </tr>
        </thead>
        <tbody>
          {markersSet.map((marker, i) => {
            const titleObj = JSON.parse(marker.title);
            const showInfoWindow = this.props.showInfoWindow.bind(this, marker);
            let imageThumb = null;
            let opArrow, downArrow;

            // Up/down arrows
            if (i > 0) {
              upArrow = <a className="move-marker-up" onClick={this.props.moveBefore.bind(this, i, i - 1)}>
                <i className="fa fa-arrow-up" />
              </a>;
            }
            if (i < markersSet.length - 1) {
              downArrow = <a className="move-marker-down" onClick={this.props.moveBefore.bind(this, i, i + 1)}>
                <i className="fa fa-arrow-down" />
              </a>;
            }

            // The picture of the stop given in media
            if (titleObj.media) {
              if (titleObj.media.type === 'instagram') {
                imageThumb = <img src={titleObj.media.url + 'media?size=t'} />;
              }
            }
            return (
              <tr data-position={i} key={'marker' + i}>
                <td onClick={showInfoWindow}>{i === 0 ? (t('Meeting Place') + ': ') : ''}{imageThumb}{titleObj.title}</td>
                <td onClick={showInfoWindow}>{titleObj.description}</td>
                <td>
                  {downArrow}
                  {upArrow}
                </td>
                <td>
                  <a className="delete-stop" onClick={this.props.deleteMarker.bind(this, marker)}>
                    <i className="fa fa-times-circle-o" />
                  </a>
                </td>
              </tr>
              );
          })}
        </tbody>
      </table>
    );
  }
}
