import React from 'react';
import styles from './Contacts.module.css';

export const Contacts = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    Контакты:
                </div>
                <div className={styles.address}>
                    <div>
                        Москва, Спартаковская площадь, 5/1
                    </div>
                    <div>
                        м. «Бауманская»
                    </div>
                    <div>
                        Есть парковочные места
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    Телефон:
                </div>
                <div className={styles.contactDetails}>
                    <div>
                        тел: +7 (499) 888-88-88
                    </div>
                </div>
            </div>
            <div className={styles.email}>
                e-mail: teatr@culture.mos.ru
            </div>
        </div>
    );
};
