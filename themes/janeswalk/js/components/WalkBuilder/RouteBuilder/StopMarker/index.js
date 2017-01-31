/**
 * The marker that says "stop"
 */
/* global CCM_THEME_PATH */
import { createElement as ce } from 'react';
import style, * as styles from './style';

const StopMarker = ({ idx = 0 }) => (
  ce('div', { style },
    ce('img', { style: styles.pin, src: `${CCM_THEME_PATH}/images/marker.png` }),
    ce('span', { style: styles.label }, String.fromCharCode(65 + idx)),
  )
);

export default StopMarker;
