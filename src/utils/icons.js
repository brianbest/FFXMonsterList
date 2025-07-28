// Get location icon based on name
export function getLocationIcon(locationName) {
  const icons = {
    'Besaid': '🏝️',
    'Kilika': '🌺',
    'Mi\'ihen Highroad': '🛤️',
    'Mushroom Rock Road': '🍄',
    'Djose Road': '⚡',
    'Thunder Plains': '⛈️',
    'Macalania': '❄️',
    'Bikanel': '🏜️',
    'Calm Lands': '🌾',
    'Stolen Fayth Cavern': '🕳️',
    'Mt. Gagazet': '🏔️',
    'Inside Sin': '👹',
    'Omega Ruins': '🏛️'
  };
  return icons[locationName] || '📍';
}

// Get monster avatar based on name/type
export function getMonsterAvatar(monsterName) {
  const avatars = {
    'flan': '🟢',
    'element': '⚡',
    'wolf': '🐺',
    'coeurl': '🐱',
    'cactuar': '🌵',
    'tonberry': '🔪',
    'behemoth': '🦣',
    'malboro': '🌿',
    'dragon': '🐉',
    'eye': '👁️',
    'fiend': '👹'
  };
  
  const name = monsterName.toLowerCase();
  for (const [key, avatar] of Object.entries(avatars)) {
    if (name.includes(key)) return avatar;
  }
  return '👾'; // default
}

// Get item icon based on name/type
export function getItemIcon(itemName) {
  const icons = {
    'potion': '🧪',
    'sphere': '🔮',
    'gem': '💎',
    'key': '🔑',
    'scales': '⚖️',
    'fang': '🦷',
    'marble': '🔸',
    'grenade': '💣',
    'bomb': '💣',
    'wind': '💨',
    'water': '💧',
    'spring': '💧',
    'tablet': '📜',
    'tonic': '🧪',
    'curtain': '🛡️',
    'feather': '🪶',
    'wing': '🪶',
    'hourglass': '⏳',
    'shadow': '👤',
    'star': '⭐',
    'matter': '⚫'
  };
  
  const name = itemName.toLowerCase();
  for (const [key, icon] of Object.entries(icons)) {
    if (name.includes(key)) return icon;
  }
  return '💎'; // default
} 