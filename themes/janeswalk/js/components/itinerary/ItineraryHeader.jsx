import {t} from 'janeswalk/stores/I18nStore';

const ItineraryHeader = ({list, onChangeTitle, onChangeDescription}) => (
  <header className="itineraryHeader">
    <h2>
      <input
        type="text"
        required="required"
        value={list.title}
        placeholder={t('My Itinerary\'s Title')}
        onChange={ev => onChangeTitle(ev.target.value)}
      />
    </h2>
    {(list.shareUrl && false) ? <h5 className="shareUrl"><a href={list.shareUrl}>{list.shareUrl}</a></h5> : null}
    <h4 className="walklistDescription">
      <textarea
        required="required"
        value={list.description}
        placeholder={t('Tell people about it! Start typing here to give your list some commentary.')}
        onChange={ev => onChangeDescription(ev.target.value)}
      />
    </h4>
  </header>
);

ItineraryHeader.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string
};

export default ItineraryHeader;
