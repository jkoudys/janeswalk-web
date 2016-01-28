import {dateFormatted} from '../../utils/ItineraryUtils';
import {remove} from '../../actions/ItineraryActions';

const Walk = ({title, start, meeting, url, id, listId, walkSelected}) => {
  let removeButton = remove ? <button className="action removeWalk" onClick={(ev) => remove(id, listId, ev.target.value)} /> : null;

  return(
    <li className="walklistItem">
      <div className="walk">
        <h3><a href={url}>{title}</a></h3>
        <h4>{dateFormatted(start)}</h4>
        <h4>{meeting}</h4>
      </div>

      {removeButton}
      <button className="action addWalk" onClick={(ev) => { walkSelected(id, ev.target.value);}} />
    </li>
  );
}

Walk.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.number,
  meeting: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  remove: React.PropTypes.func.isRequired
};

Walk.defaultProps = {
  title: 'Walk Title',
  time: Date.now(),
  remove: null
};

export default Walk;
