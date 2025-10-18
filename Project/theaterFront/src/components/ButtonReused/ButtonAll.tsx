import React, {useState} from 'react';
import styles from './ButtonAll.module.css';
type ButtonAllProps = {
    onClick?: () => void;
    title: string;
    backgroundColor?: string;
    color?: string;
    hoverColor: string;
    hoverBackgroundColor: string;
}

export const ButtonAll = ({title, backgroundColor, color, onClick, hoverBackgroundColor, hoverColor}:ButtonAllProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <div
            style={{
                border: '1px solid #51bae4',
                transform: 'skew(-20deg)',
                color: isHovered ? hoverColor : color,
                backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
                padding: 'calc(0.1rem + 0.5vw)',
                fontSize: 'calc(0.8rem + 0.3vw)',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
                maxWidth: '200px',
                margin: '0 auto',
            }}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{transform: 'skew(20deg)', fontSize: '1vw'}}>{title}</div>
        </div>
    );
};

