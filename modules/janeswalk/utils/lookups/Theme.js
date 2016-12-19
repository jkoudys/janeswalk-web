export const icons = {
  'civic-activist': { name: 'Activism', icon: 'bullhorn' },
  'civic-commerce': { name: 'Commerce', icon: 'shopping-cart' },
  'civic-gender': { name: 'Gender', icon: 'transgender-alt' },
  'civic-goodneighbour': { name: 'Community', icon: 'group' },
  'civic-health': { name: 'Health', icon: 'medkit' },
  'civic-international': { name: 'International Issues', icon: 'globe' },
  'civic-military': { name: 'Military', icon: 'fighter-jet' },
  'civic-nativeissues': { name: 'Native Issues', icon: 'sun-o' },
  'civic-religion': { name: 'Religion', icon: 'bell' },
  'civic-truecitizen': { name: 'Citizenry', icon: 'flag-o' },
  'culture-aesthete': { name: 'Design', icon: 'pencil' },
  'culture-artist': { name: 'Art', icon: 'picture-o' },
  'culture-bookworm': { name: 'Literature', icon: 'book' },
  'culture-foodie': { name: 'Food', icon: 'cutlery' },
  'culture-historybuff': { name: 'Heritage', icon: 'archive' },
  'culture-nightowl': { name: 'Night Life', icon: 'glass' },
  'culture-techie': { name: 'Technology', icon: 'gears' },
  'culture-writer': { name: 'Storytelling', icon: 'edit' },
  'nature-greenthumb': { name: 'Gardening', icon: 'leaf' },
  'nature-naturelover': { name: 'Nature', icon: 'bug' },
  'nature-petlover': { name: 'Animals', icon: 'heart' },
  'urban-architecturalenthusiast': { name: 'Architecture', icon: 'building' },
  'urban-film': { name: 'Film', icon: 'video-camera' },
  'urban-moversandshakers': { name: 'Transportation', icon: 'truck' },
  'urban-music': { name: 'Music', icon: 'music' },
  'urban-play': { name: 'Play', icon: 'puzzle-piece' },
  'urban-sports': { name: 'Sports', icon: 'trophy' },
  'urban-suburbanexplorer': { name: 'Suburbs', icon: 'home' },
  'urban-water': { name: 'Water', icon: 'tint' },
};

/**
 * Helpers, to deal with that 'theme-' prefix from the v1 json
 */
export function getThemeName(theme) {
  return (icons[theme.slice(6)] || { name: '' }).name;
}

export function getThemeIcon(theme) {
  return `fa-${(icons[theme.slice(6)] || { icon: '' }).icon}`;
}
