import React, { useEffect, useState } from 'react';

function GradientButton({ onClick, color, text }) {
    return (
        <button 
            onClick={onClick}
            className={`text-white bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
        >
            {text}
        </button>
    );
}

export default GradientButton;