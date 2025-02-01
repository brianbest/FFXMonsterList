import { useState, useEffect } from 'react'
import LocationList from './components/LocationList'
import MonsterList from './components/MonsterList'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [locations, setLocations] = useState([])
  const [monsters, setMonsters] = useState([])

  // New state for monsters captured per fiend_id
  const [captures, setCaptures] = useState(() => {
    // Attempt to initialize from localStorage
    const saved = localStorage.getItem('monsterCaptures')
    return saved ? JSON.parse(saved) : {}
  })

  // State for showing/hiding the reset modal
  const [showResetModal, setShowResetModal] = useState(false)

  // New state for grouping all monsters by location for check mark display
  const [allMonstersByLocation, setAllMonstersByLocation] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/monsters')
      .then(res => res.json())
      .then(data => {
        // Group monsters by their location name (assumes each monster has either location_name or location field)
        const grouped = {};
        data.forEach(monster => {
          // Use monster.location_name if it exists, otherwise use monster.location
          const loc = monster.location_name || monster.location;
          if (!grouped[loc]) grouped[loc] = [];
          grouped[loc].push(monster);
        });
        setAllMonstersByLocation(grouped);
      })
      .catch(err => console.error('Error fetching all monsters:', err));
  }, []);

  useEffect(() => {
    // Fetch all locations when component mounts
    fetch('http://localhost:3000/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error('Error fetching locations:', err))
  }, [])

  useEffect(() => {
    // Fetch monsters for selected location
    if (selectedLocation) {
      fetch(`http://localhost:3000/api/monsters?location=${selectedLocation}`)
        .then(res => res.json())
        .then(data => setMonsters(data))
        .catch(err => console.error('Error fetching monsters:', err))
    }
  }, [selectedLocation])

  // Persist captures to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('monsterCaptures', JSON.stringify(captures))
  }, [captures])

  // Function to update capture count for a given monster id
  const updateCapture = (monsterId, newCount) => {
    setCaptures(prev => ({
      ...prev,
      [monsterId]: newCount
    }))
  }

  // Function to handle reset after confirmation
  const handleResetCaptures = () => {
    setCaptures({})
    setShowResetModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Final Fantasy X Monster Compendium</h1>
        {/* Reset button */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => setShowResetModal(true)}
        >
          Reset Captured Data
        </button>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <LocationList 
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
              // Pass current monsters & captures so LocationList can determine if the location is complete
              currentMonsters={monsters}
              captures={captures}
              allMonstersByLocation={allMonstersByLocation}
            />
          </div>
          <div className="md:col-span-3">
            <MonsterList 
              monsters={monsters}
              selectedLocation={selectedLocation}
              captures={captures}
              onUpdateCapture={updateCapture}
            />
          </div>
        </div>
      </main>

      {/* Confirmation Modal for Reset */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="mb-4">Are you sure you want to reset all captured monster data?</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleResetCaptures}
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App 