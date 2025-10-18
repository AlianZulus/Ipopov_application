import React from 'react';
import { ButtonAll } from "../ButtonReused/ButtonAll";
import styles from './Spectacle.module.css';

type SpectacleDataType = {
    icons: any;
    title: string;
    comment: string;
    age: string;
    dates: any;
    openCombinedModalHandler: (spectacle: any) => void;
    hall: any;
    openCommentHandler: any
};

export const Spectacle = ({ icons, title, comment, dates, age,openCombinedModalHandler, hall, openCommentHandler  }: SpectacleDataType) => {
    return (
        <div className={styles.containerSpectacle}>
            {}
            <div style={{ height: '85%' }}>
                <img src={icons} alt="spectacle" className={styles.imgStyle} />
            </div>

            {}
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{title}</h3>
                {}
                <div className={styles.date}>
                    <span>{dates[0].date.split(' ')[0].split('-').reverse().join('-')}</span>
                </div>
                <span className={styles.age}>{age}</span>
            </div>

            {}
            <div className={styles.containerBtw}>
                <ButtonAll
                    onClick={() => openCombinedModalHandler({ icons, title, comment, dates, age, hall })}
                    title={'Купить билет'}
                    backgroundColor={'#51bae4'}
                    color={'white'}
                    hoverColor={'#03b4ff'}
                    hoverBackgroundColor={'white'}
                />
                <ButtonAll
                    onClick={openCommentHandler}
                    title={'Подробнее'}
                    backgroundColor={'white'}
                    color={'#03b4ff'}
                    hoverColor={'white'}
                    hoverBackgroundColor={'#51bae4'}
                />
            </div>
        </div>
    );
};
