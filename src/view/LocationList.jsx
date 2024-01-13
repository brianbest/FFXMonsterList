import React, { useEffect, useState, useContext } from 'react';
import MonsterListControllerContext from '../MonsterListControllerContext';
import LocationItem from './LocationItem';

function App() {
  const [locations, setLocations] = useState([]);
  const monsterListController = useContext(MonsterListControllerContext);

  useEffect(() => {
    setLocations(monsterListController.getLocations());
  }, []);

  return (
    <div id="app" className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
      {locations.map((location) => (
       <LocationItem key={location.id} location={location} />
      ))}
      </div>
    </div>
  );
}

export default App;