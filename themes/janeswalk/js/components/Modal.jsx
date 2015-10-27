import View from '../View.jsx';

/**
 * ModalView
 *
 * @extends View
 * @param element jQuery element
 */
export default class ModalView extends View {
  constructor(element) {
    super(element);
    View.call(this, element);
    this._addCloseEvents();
  }

  /**
   * _addCloseEvents
   *
   * @protected
   * @return    void
   */
  _addCloseEvents() {
    this._element.find('.closeModalSource').click(ev => {ev.preventDefault; this.close()});
  }
}
