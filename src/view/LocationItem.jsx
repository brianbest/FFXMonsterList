import React, { useEffect, useState, useContext } from 'react';
import MonsterListControllerContext from '../MonsterListControllerContext.js';
import MonsterItem from './MonsterItem.jsx';

const LocationItem = ({ location, onLocationActivated, onLocationChange, locationStatus, closeLocation }) => {
    const [locationState, setLocationState] = useState(location);
    const [monsters, setMonsters] = useState(location.monsters);
    const monsterListController = useContext(MonsterListControllerContext);
    const [allMonstersCaptured, setAllMonstersCaptured] = useState(false); 
    const [status, setStatus] = useState(locationStatus);

    const onMonsterCaptureChange = (fn) => {
        return () => {
            fn();
            setAllMonstersCaptured(monsters.every(monster => monster.getCaughtCount() >= monsterListController.monsterLocationService.getMaxNumberOfMonsters()));
            onLocationChange();
        };
    }
    const locationClicked = () => {
        if (status == location.id) {
            console.log('location failed', location.id);
            return;
        }
        onLocationActivated(location)
    };

    const checkStatus = () => {
        if (status == location.id) {
            console.log(status, location.id);
            return 'location-active';
        } else if (status && status != location.id) {
            return 'hidden';
        } else {
            return 'cursor-pointer';
        }
    }

    const shouldShowCloseButton = () => {
        return status == location.id;
    }

    useEffect(() => {
        setStatus(locationStatus);
        setLocationState(locationState);
        onMonsterCaptureChange();
    }, [locationStatus, locationState, monsters]);

    return (
        <div className={'bg-white shadow-lg rounded-lg p-4 ' + (checkStatus())} onClick={locationClicked}>
            <div className="flex justify-between items-center mb-4">
            <h2 className='text-xl font-semibold mb-3'>{allMonstersCaptured ? "✅ " : ""}{location.name}</h2>
                <button className={"text-gray-800 font-semibold p-2 rounded hover:bg-gray-200 " + (status == locationState.id ? '' : 'hidden')} onClick={closeLocation}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 ' + (status ? '' : 'hidden')}>
                {location.monsters.map((monster) => (
                    <MonsterItem
                        key={monster.id}
                        name={monster.name}
                        caughtCount = {monster.getCaughtCount()}
                        incrementCaught = {onMonsterCaptureChange(monster.incrementCaught)}
                        decrementCaught = {onMonsterCaptureChange(monster.decrementCaught)}
                        setMaxCaught = {onMonsterCaptureChange(monster.setMaxCaught)} />
                ))}
            </div>
        </div>
    );
};

export default LocationItem;
