import React, { useEffect, useState, useContext } from 'react';
import MonsterListControllerContext from '../MonsterListControllerContext';
import LocationItem from './LocationItem';

function App() {
  const [locations, setLocations] = useState([]);
  const monsterListController = useContext(MonsterListControllerContext);
  const [locationActivate, setlocationActivate] = useState(null);
  const [totalMonsters, setTotalMonsters] = useState(0);
  const [maxMonstersCaught, setMaxMonstersCaught] = useState(false);
  const [activeGridClass, setActiveGridClass] = useState('md:grid-cols-2 lg:grid-cols-2');

  useEffect(() => {
    setLocations(monsterListController.getLocations());
    console.log(monsterListController);
    setMaxMonstersCaught(monsterListController.getNumberOfMonstersAtMaxCaught());
    setTotalMonsters(monsterListController.getTotalNumberOfMonsters());
  }, [locationActivate]);

  useEffect(() => {
    setMaxMonstersCaught(monsterListController.getNumberOfMonstersAtMaxCaught());
    setTotalMonsters(monsterListController.getTotalNumberOfMonsters());
  }, [maxMonstersCaught]);



  const onLocationActivated = (location) => {
    setlocationActivate(location.id);
    setActiveGridClass('md:grid-cols-1 lg:grid-cols-1'); 
  }

  const onLocationChange = () => {
    setMaxMonstersCaught(monsterListController.getNumberOfMonstersAtMaxCaught());
    setTotalMonsters(monsterListController.getTotalNumberOfMonsters());
  }

  const closeLocation = () => {
    setlocationActivate();
    setActiveGridClass('md:grid-cols-2 lg:grid-cols-2'); 
  }

  return (
    <div id="app" className={`container mx-auto p-4 ${activeGridClass}`}>
      <h1 className="text-3xl font-semibold mb-4">FFX Monster Tracker</h1>
      <h2 className="text-xl font-semibold mb-4">Monsters Completely Captured: {maxMonstersCaught} / {totalMonsters}</h2>
      
      <div className={"grid gap-4 " + activeGridClass}>
      {locations.map((location) => (
       <LocationItem 
        key={location.id} 
        location={location} 
        onLocationActivated={onLocationActivated}
        onLocationChange={onLocationChange} 
        locationStatus={locationActivate} 
        closeLocation={closeLocation} />
      ))}
      </div>
    </div>
  );
}

export default App;