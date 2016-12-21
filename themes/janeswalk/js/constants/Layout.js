/**
 * Layout constants
 * Included with the components, since they're included for component style.
 *
 * TODO: see about merging these variables with, or loading them from, the CSS
 */

export const imgDir = '/themes/janeswalk/images';

const Grid = [{
  lg: 12,
  md: 16,
  sm: 17,
  xs: 22,
}, {
  lg: 5,
  md: 5,
  sm: 5,
  xs: 0,
}];

// Add the sides to get our full width
const Full = Object.keys(Grid[0]).reduce((a, e) => ({ ...a, [e]: Grid[0][e] + Grid[1][e] }), {});

export const Welcome = {
  Main: {
    type: 'flex',
    justify: 'space-around',
    align: 'middle',
    style: {
      minHeight: '75vh',
      backgroundImage: `url(${imgDir}/cityscape.svg)`,
      backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat',
    },
  },
  Content: { lg: 12, md: 16, xs: 19 },
};

export const Finished = {
  Main: {
    type: 'flex',
    justify: 'space-around',
    align: 'middle',
    style: {
      minHeight: '90vh',
    },
  },
  Content: { lg: 20, md: 24 },
};

export default {
  Grid,
  Full,
  Gutter: 15,
  Nav: {
    height: 60,
    pad: 20,
  },
};
