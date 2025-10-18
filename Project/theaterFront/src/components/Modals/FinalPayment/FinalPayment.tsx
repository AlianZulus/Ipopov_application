import React, {useEffect} from 'react';
import styles from './FinalPayment.module.css'
import okImage from '../../../assets/icons/task_alt_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'

interface finalType {
    message: string;
    duration?: number;
    onClose: () => void;
    plateNumber: string;
}

export const FinalPayment = ({message, duration = 3000, onClose, plateNumber}: finalType) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={styles.containerFinal}>
            <div className={styles.modal}>
                <div>
                    {message}
                </div>
                <div>
                    {plateNumber.length > 4 ? <div>Ваше парковочное место: <strong style={{fontSize: '1.6vw'}}> № P29</strong></div> : <div>
                        <img style={{width: '4vw'}} src={okImage} alt={'okImage'}/>
                    </div>}
                </div>
            </div>

        </div>
    );
};
