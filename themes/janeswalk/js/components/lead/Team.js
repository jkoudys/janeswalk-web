/**
 * Team
 *
 * The folks who make it happen. The team putting this Walk on.
 */

const { createElement: ce } = React;

const Team = ({ order }) => ce('section', {}, `${order}. `, 'Go team!');

export default Team;
