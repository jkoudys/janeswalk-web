// Flux
const t = require('../../../stores/I18nStore.js').getTranslate();

const UpArrow = props => (
  <a className="move-marker-up" {...props}>
    <i className="fa fa-arrow-up" />
  </a>
);

const DownArrow = props => (
  <a className="move-marker-down" {...props}>
    <i className="fa fa-arrow-down" />
  </a>
);

const DeleteStop = props => (
  <a className="delete-stop" {...props}>
    <i className="fa fa-times-circle-o" />
  </a>
);

const MarkerRow = props => {
  const titleObj = JSON.parse(props.marker.title);
  const i = props.index;
  const showInfoWindow = () => props.showInfoWindow(props.marker);
  let meetingPlace;
  let imageThumb;
  let upArrow, downArrow;

  // Up/down arrows
  if (i > 0) {
    upArrow = <UpArrow onClick={() => props.moveBefore(i, i - 1)} />;
  } else {
    meetingPlace = t('Meeting Place') + ': ';
  }

  if (i < props.length - 1) {
    downArrow = <DownArrow onClick={() => props.moveBefore(i, i + 1)} />;
  }

  // The picture of the stop given in media
  if (titleObj.media) {
    if (titleObj.media.type === 'instagram') {
      imageThumb = <img src={titleObj.media.url + 'media?size=t'} />;
    }
  }
  return (
    <tr>
      <td onClick={showInfoWindow}>{meetingPlace}{imageThumb}{titleObj.title}</td>
      <td onClick={showInfoWindow}>{titleObj.description}</td>
      <td>
        {downArrow}
        {upArrow}
      </td>
      <td>
        <DeleteStop onClick={() => props.deleteMarker(marker)} />
      </td>
    </tr>
  );
}

/**
 * The table with all the walk stops on it, in CAW
 */
const WalkStopTable = props => {
  const markersSet = props.markers.getArray();
  return (
    <table className="table-hover routeStops">
      <thead>
        <tr>
          <th>{ t('Title') }</th>
          <th>{ t('Description') }</th>
          <th className="controls"><i className="fa fa-arrows" /></th>
          <th><i className="fa fa-trash-o" /></th>
        </tr>
      </thead>
      <tbody>
        {markersSet.map((marker, i) => <MarkerRow marker={marker} key={'marker' + i} index={i} length={markersSet.length} {...props} />)}
      </tbody>
    </table>
  );
}

export default WalkStopTable;
