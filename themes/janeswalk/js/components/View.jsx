/**
* View constructor
* 
* @public
* @param  jQuery element
* @return void
*/
export default class View {
  constructor(element) {
    this._element = element;
  }

  /**
   * getElement
   * 
   * @public
   * @return HTMLFormElement
   */
  getElement() {
    return this._element;
  }
}
