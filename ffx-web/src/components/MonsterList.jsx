import PropTypes from 'prop-types';

function MonsterList({ monsters, selectedLocation, captures, onUpdateCapture }) {
  if (!selectedLocation) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">Select a location to view monsters</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">
        Monsters in {selectedLocation}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monsters.map(monster => {
          // Get current captured count for this monster or default to 0
          const count = captures[monster.fiend_id] || 0;
          return (
            <div 
              key={monster.fiend_id} 
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">{monster.name}</h3>
              <div className="space-y-1 text-sm">
                <p>HP: {monster.hp}</p>
                <p>MP: {monster.mp}</p>
                <p>Type: {monster.fiend_type}</p>
                <p>Common Drop: {monster.common_drop}</p>
                <p>Bribe: {monster.bribe_drop}</p>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                  onClick={() => onUpdateCapture(monster.fiend_id, Math.max(count - 1, 0))}
                  disabled={count === 0}
                >
                  -
                </button>
                <span className="font-semibold">{count}</span>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                  onClick={() => onUpdateCapture(monster.fiend_id, Math.min(count + 1, 10))}
                  disabled={count === 10}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

MonsterList.propTypes = {
  monsters: PropTypes.arrayOf(
    PropTypes.shape({
      fiend_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hp: PropTypes.number.isRequired,
      mp: PropTypes.number.isRequired,
      fiend_type: PropTypes.string.isRequired,
      common_drop: PropTypes.string,
      bribe_drop: PropTypes.string,
    })
  ).isRequired,
  selectedLocation: PropTypes.string,
  // New props for captures
  captures: PropTypes.object.isRequired,
  onUpdateCapture: PropTypes.func.isRequired,
};

export default MonsterList 