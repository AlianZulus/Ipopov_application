import React, {useState} from 'react';
import styles from './ParkingPlace.module.css';

export const ParkingPlace = ({setPlateNumber,plateNumber}: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [parkingSpot, setParkingSpot] = useState<string | null>(null);

    const plateNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.toUpperCase().replace(/[^А-ЯA-Z0-9]/g, '');
        setPlateNumber(input);
        setIsError(false);
        setParkingSpot(null);
    };

    return (
        <div style={{border: '1px solid black', width: '30%', padding: '5px'}}>
            <input
                value={plateNumber}
                onChange={plateNumberHandler}
                className={styles.styleInput}
                placeholder="Введите номер авто"
                maxLength={9}
            />
            {parkingSpot && (
                <div style={{color: 'green', marginTop: 5, fontSize: 12}}>
                    Ваше место парковки: {parkingSpot}
                </div>
            )}
            {isError && !isLoading && (
                <div style={{color: 'red', marginTop: 5, fontSize: 12}}>
                    Номер не соответствует формату.
                </div>
            )}
        </div>
    );
};
