export const icons = {
  'familyfriendly': {name: 'Family friendly', icon:''},
  'wheelchair': {name: 'Wheelchair accessible', icon:''},
  'dogs': {name: 'Dogs welcome', icon:''},
  'strollers': {name: 'Strollers welcome', icon:''},
  'bicycles': {name: 'Bicycles welcome', icon:''},
  'steephills': {name: 'Steep hills', icon:''},
  'uneven': {name: 'Uneven terrain', icon:''},
  'busy': {name: 'Busy sidewalks', icon:''},
  'bicyclesonly': {name: 'Bicycles only', icon:''},
  'lowlight': {name: 'Low light or nighttime', icon:''},
  'seniors': {name: 'Senior Friendly', icon:''}
};

/**
 * Helpers, to deal with that 'accessible-' prefix from the v1 json
 */
export function getAccessibleName(theme) {
  return (icons[theme.slice(11)] || {name: ''}).name;
}
