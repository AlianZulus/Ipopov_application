import React from 'react';
import styles from "./ButtonAll.module.css";


export const ButtonAddFood = ({onclickAdd,onClickDelete, title}: any) => {
    return (
        <div className={styles.quantityControls}>
            <button onClick={onClickDelete}>-</button>
            <span className={styles.quantity}>
                        {title}
                    </span>
            <button onClick={onclickAdd}>+</button>
        </div>
    );
};

