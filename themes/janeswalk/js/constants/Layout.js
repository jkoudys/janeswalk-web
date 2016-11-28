/**
 * Layout constants
 * Included with the components, since they're included for component style.
 *
 * TODO: see about merging these variables with, or loading them from, the CSS
 */

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


export default {
  Grid,
  Full,
  Gutter: 15,
  Nav: {
    height: 60,
    pad: 20,
  },
};
