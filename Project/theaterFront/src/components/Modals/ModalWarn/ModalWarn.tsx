import React from 'react';
import styles from './ModalWarn.module.css'

interface MyModalProps {
    onClose: () => void;
    text: string;
}

export const MyModal: React.FC<MyModalProps> = ({ onClose, text }) => {
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.myModalOverlay} onClick={onClose}>
            <div className={styles.myModalContent} onClick={stopPropagation}>
                <p>{text}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};