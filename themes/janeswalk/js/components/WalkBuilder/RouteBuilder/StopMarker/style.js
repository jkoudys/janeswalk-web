/**
 * Style of a pin
 */

const IMGHEIGHT = 46;
const IMGWIDTH = 30;
// The image has a shadow, so we need to center on the pin itself
const PINWIDTH = 24;

export const pin = {
  height: IMGHEIGHT,
  width: IMGWIDTH,
};

export const label = {
  position: 'absolute',
  top: 7,
  left: (PINWIDTH - IMGWIDTH) / 2 - 1,
  textAlign: 'center',
  width: '100%',
  fontWeight: 700,
  fontSize: 15,
  color: '#fff',
};

export default {
  position: 'absolute',
  left: -(PINWIDTH / 2),
  top: -IMGHEIGHT,
};
