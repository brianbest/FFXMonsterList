import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import GradientButton from './components/GradientButton.jsx';

const MonsterItem = ({ name, caughtCount, incrementCaught, decrementCaught, setMaxCaught }) => {
    const [numCaught, setNumCaught] = useState(caughtCount);

    const handleIncrement = () => {
        incrementCaught();
        setNumCaught(caughtCount);
    };

    const handleDecrement = () => {
        decrementCaught();
        setNumCaught(caughtCount);
    };

    const handleSetMax = () => {
        setMaxCaught();
        setNumCaught(caughtCount);
    };

    useEffect(() => {
        setNumCaught(caughtCount);
    }  , [caughtCount]);

    return (
        <div>
            <h2>{name}</h2>
            <p>Number Caught: {numCaught}</p>
            <GradientButton onClick={handleIncrement} color="green" text="+" />
            <GradientButton onClick={handleDecrement} color="red" text="-" />
            <GradientButton onClick={handleSetMax} color="violet" text="max" />
        </div>
    );
};

export default MonsterItem;