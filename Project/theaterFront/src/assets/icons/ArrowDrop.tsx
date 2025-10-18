import React from 'react';

export const ArrowDrop = ({rotate}:any) => {
    return (
        <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"  style={{
            transform: `rotate(${rotate}deg)`,
            transition: 'transform 0.5s ease'
        }} >
            <path rotate={rotate} d="M480-360 280-560h400L480-360Z"/>
        </svg>
    );
};

