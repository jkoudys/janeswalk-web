/**
 * Start up our google maps
 */
/* global google */

function* iterateGMapCollection() {
  for (let i = 0, len = this.getLength(); i < len; i++) {
    yield this.getAt(i);
  }
}

export default new Promise((resolve) => {
  const mapCallback = '_googleMapsIsFinished';
  const script = Object.assign(document.createElement('script'), {
    type: 'text/javascript',
    src: `//maps.googleapis.com/maps/api/js?sensor=false&callback=${mapCallback}`,
  });
  document.head.appendChild(script);

  // Global callback on gmaps script init
  window[mapCallback] = () => {
    // Shim Geometry so we can iterate it
    google.maps.Data.Geometry.prototype[Symbol.iterator] = iterateGMapCollection;
    google.maps.MVCArray.prototype[Symbol.iterator] = iterateGMapCollection;
    delete window[mapCallback];
    resolve(google);
  };
});
