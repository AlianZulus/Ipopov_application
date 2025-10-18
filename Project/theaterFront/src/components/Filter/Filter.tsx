import React from 'react';
import styles from './Filter.module.css'

export const Filter = () => {
    return (
        <div style={{display: 'flex', width: '100%', color: 'grey' ,gap: 50, justifyContent: 'flex-end'}}>
    {}
    <div className={styles.btw}>АИ-92</div>
    <div className={styles.btw}>АИ-95</div>
    <div className={styles.btw}>ВГО</div>
    <div className={styles.btw}>ДТ кл-1</div>
    <div className={styles.btw}>ДТ сорт.</div>
    <div className={styles.btw}>Керосины</div>
    <div className={styles.btw}>Мазут</div>
    <div className={styles.btw}>Нафта</div>
    <div className={styles.btw} style={{marginRight: 100}}>СУГ</div>
        </div>
    );
};

