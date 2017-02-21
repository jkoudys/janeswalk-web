import { createElement as ce } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import TeamMember from './TeamMember';

const WalkTeam = ({ team = [] }) => (
  ce('section', { className: 'walkTeam' },
    ce('a', { name: 'About the Walk Team' }),
    ce('h2', {}, t`About the Walk Team`),
    ce('section', {}, team.map(({ name, type, bio, ...connections }, key) => (
      ce(TeamMember, { name, type, bio, connections, key })))
    ),
  )
);

export default WalkTeam;
