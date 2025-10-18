import React, {useState} from 'react';
import styles from './OpenCommentModal.module.css'
import close from "../../../assets/icons/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import back from '../../../assets/icons/arrow_back_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'

export const OpenCommentModal = ({comment, closeCommentHandler}: any) => {

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div style={{display: 'flex',justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center'}}>
                    <h3 style={{margin: 0}}>Описание</h3>
                    <div onClick={closeCommentHandler} style={{fontSize: 20, cursor: 'pointer'}}>x</div>
                </div>

                <div style={{fontFamily:'MyCustomFont', fontSize: 20}}>
                    {comment}
                </div>

            </div>
        </div>
    );
};

