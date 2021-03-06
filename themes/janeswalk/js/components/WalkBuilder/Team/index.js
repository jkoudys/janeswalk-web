/**
 * Team
 *
 * The folks who make it happen. The team putting this Walk on.
 */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { Form, Button, Icon } from 'antd';

import Leader from './Leader';
import Organizer from './Organizer';
import Voice from './Voice';
import Volunteer from './Volunteer';

// Map the types set in the store to their component
const typeMap = {
  leader: Leader,
  organizer: Organizer,
  voice: Voice,
  volunteer: Volunteer,
};

const buttonStyle = {
  type: 'dashed',
  style: {
    whiteSpace: 'normal',
    marginBottom: '5px',
    textAlign: 'left',
    display: 'block',
    width: '100%',
  },
};

const Team = ({ id, name, team, handlers }) => ce('section', { id, className: 'Lead__Option' },
  ce('h1', {}, name),
  team
  .filter(({ type }) => typeMap[type])
  .map((member, i) => ce(typeMap[member.type], {
    key: `${member.type}${i}`,
    member,
    handler: handlers.teamMember(member),
  })),
  ce(Form.Item, { label: t`Add members to your team` },
    ce(Button, { ...buttonStyle, onClick: handlers.teamAddLeader },
      ce('h5', {}, ce('i', { className: 'fa fa-bullhorn' }), '  ', t`Walk Leader`),
      ce('p', {}, t`A person presenting information, telling stories, and fostering discussion during the Jane's Walk.`)
    ),
    ce(Button, { ...buttonStyle, onClick: handlers.teamAddOrganizer },
      ce('h5', {}, ce('i', { className: 'fa fa-handshake-o' }), '  ', t`Organizer`),
      ce('p', {}, t`A person responsible for outreach to new and returning Walk Leaders and Community Voices.`)
    ),
    ce(Button, { ...buttonStyle, onClick: handlers.teamAddVolunteer },
      ce('h5', {}, ce(Icon, { type: 'pushpin-o' }), '  ', t`Volunteers`),
      ce('p', {}, t`People who are helping out on your Walk. They could be there to help take photos, set up and coordinate the Walk, or share stories and/or personal experiences.`)
    )
  )
);

export default Team;
