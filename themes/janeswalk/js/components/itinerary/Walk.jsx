import {dateFormatted} from '../../utils/ItineraryUtils';

const Walk = ({title, start, meeting, url, remove, id, listId, walkSelected, addWalkDialog}) => {
  let removeButton = remove ? <button className="action removeWalk" onClick={(ev) => remove(id, listId, ev.target.value)}></button> : null;
  let addButton = addWalkDialog ? <button className="action addWalk" onClick={(ev) => { addWalkDialog(); walkSelected(id, ev.target.value);}}></button> : null;

  return(
    <li className="walklistItem">
      <div className="walk">
        <h3><a href={url}>{title}</a></h3>
        <h4>{dateFormatted(start)}</h4>
        <h4>{meeting}</h4>
      </div>

      {removeButton}
      {addButton}
    </li>
  );
}

Walk.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.number,
  meeting: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  remove: React.PropTypes.func.isRequired,
  addWalkDialog: React.PropTypes.func.isRequired,
};

Walk.defaultProps = {
  title: 'Walk Title',
  time: Date.now(),
  remove: null,
  addWalkDialog: null,
};

export default Walk;
