export const icons = {
  dogs: { name: 'Dogs welcome', icon: 'paw' },
  bicycles: { name: 'Bicycles welcome', icon: 'bicycle' },
  steephills: { name: 'Steep hills', icon: 'area-chart' },
  uneven: { name: 'Uneven terrain', icon: 'street-view' },
  busy: { name: 'Busy sidewalks', icon: 'users' },
  lowlight: { name: 'Low light or nighttime', icon: 'low-vision' },
  academic: { name: 'Academic content', icon: 'graduation-cap' },
  breaks: { name: 'Has rest stops', icon: 'coffee' },
};

/**
 * Helpers, to deal with that 'accessible-' prefix from the v1 json
 */
export function getAccessibleName(theme) {
  return (icons[theme.slice(11)] || { name: '' }).name;
}
