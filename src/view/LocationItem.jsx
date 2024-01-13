import React, { useEffect, useState, useContext } from 'react';
import MonsterListControllerContext from '../MonsterListControllerContext.js';
import MonsterItem from './MonsterItem.jsx';

const LocationItem = ({ location }) => {
    const [monsters, setMonsters] = useState(location.monsters);
    const monsterListController = useContext(MonsterListControllerContext);
    const [allMonstersCaptured, setAllMonstersCaptured] = useState(false); // Use state here

    let status = "";
    const onMonsterCaptureChange = () => {
        setAllMonstersCaptured(monsters.every(monster => monster.getCaughtCount() >= monsterListController.monsterLocationService.getMaxNumberOfMonsters()));
    }
    useEffect(() => {
        status = allMonstersCaptured ? "✅" : ""; 
        console.log("status - " + status);
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className='text-xl font-semibold mb-3'>{location.name} {allMonstersCaptured ? "✅" : ""}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {location.monsters.map((monster) => (
                <MonsterItem key={monster.id} monster={monster} onMonsterCaptureChange={onMonsterCaptureChange} />
            ))}
            </div>
        </div>
    );
};

export default LocationItem;
