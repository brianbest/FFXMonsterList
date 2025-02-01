import PropTypes from 'prop-types';

function LocationList({ locations, selectedLocation, onLocationSelect, currentMonsters, captures, allMonstersByLocation }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Locations</h2>
      <ul className="space-y-2">
        {locations.map(location => {
          // Use the complete monster list for this location from allMonstersByLocation
          const monstersForLocation = allMonstersByLocation[location.location_name] || [];
          const isComplete = monstersForLocation.length > 0 && monstersForLocation.every(monster => (captures[monster.fiend_id] || 0) === 10);
          return (
            <li 
              key={location.location_id}
              className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                selectedLocation === location.location_name 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onLocationSelect(location.location_name)}
            >
              <span>{location.location_name}</span>
              {isComplete && (
                <span title="All monsters captured" className="text-green-600 font-bold">
                  ✓
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      location_id: PropTypes.number.isRequired,
      location_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedLocation: PropTypes.string,
  onLocationSelect: PropTypes.func.isRequired,
  // New props for current monsters, captures and complete monster mapping by location
  currentMonsters: PropTypes.array,
  captures: PropTypes.object,
  allMonstersByLocation: PropTypes.object,
};

export default LocationList; 