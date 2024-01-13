import React, { useState } from 'react';

const MonsterItem = ({ monster, onMonsterCaptureChange }) => {
    const [numCaught, setNumCaught] = useState(monster.getCaughtCount());

    const incrementCaught = () => {
        monster.incermentCaught();
        setNumCaught(monster.getCaughtCount());
        onMonsterCaptureChange();
    };

    const decrementCaught = () => {
        monster.decrmentCaught();
        setNumCaught(monster.getCaughtCount());
        onMonsterCaptureChange();
    };

    return (
        <div>
            <h2>{monster.name}</h2>
            <p>Number Caught: {numCaught}</p>
            <button onClick={incrementCaught}
            className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>+</button>
            <button onClick={decrementCaught}
            className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>-</button>
        </div>
    );
};

export default MonsterItem;
