import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

import ConnectionLinks from './ConnectionLinks';

const teamTypes = require('../../../../json/TeamMembers.json');

const TeamMember = ({ name = '', type = '', bio = '', connections = {} }) => (
  ce('article', {},
    ce('header', {},
      ce('h3', {},
        name.trim(),
        ce('span', { className: 'walkTeamMemberRole' }, t([teamTypes.roles[type] || type])),
      ),
      ce('footer', {}, ce(ConnectionLinks, { name, connections })),
    ),
    ce('summary', { dangerouslySetInnerHTML: { __html: bio } }),
  )
);

export default TeamMember;
