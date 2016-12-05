/**
 * Team
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

const Team = ({ order }) => ce('section', {}, `${order}. `, 'Go team!');

export default Team;
