import React, { useState } from "react";
import styles from './CombinatedModal.module.css'



export const CombinedModal = ({
                                  closeModal,
                                  selectedSpectacle,
                                  selectedDate,
                                  setSelectedDate,
                                  selectedSeats,
                                  toggleSeatSelection,
                                  addToCart,
                                  reservedSeats,
                              }: any) => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    if (!selectedSpectacle) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>

                <button className={styles.closeButton} onClick={closeModal}>×</button>
                {step === 1 && (
                    <div>
                        <div>
                            <h3 className={styles.titleH3}>{selectedSpectacle.title}</h3>
                        </div>
                        {}
                        <div className={styles.choiceSeanceTitle}>
                            <h4 className={styles.h4Title}>Выбор сеанса</h4>
                        </div>
                        <div className={styles.divider} />
                        {}
                        <div className={styles.datesContainer}>
                            <div className={styles.datesWrapper}>
                                {Array.isArray(selectedSpectacle.dates) ? (
                                    selectedSpectacle.dates.map((dateObj: any, index: number) => (
                                        <div key={index} className={styles.dateItem}>
                                            <div>
                                                {dateObj.date.split(' ')[0].split('-').reverse().join('.')}
                                            </div>
                                            <div>
                                                {dateObj.time}
                                            </div>
                                            <div>
                                                {dateObj.cost}
                                            </div>
                                            <div
                                                className={styles.btw}
                                                onClick={() => {
                                                    setSelectedDate(dateObj.date);
                                                    nextStep();
                                                }}
                                            >
                                                Выбрать
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Даты не найдены</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className={styles.stepTwoContainer}>
                        <h2 className={styles.h2Title}>
                            Выберите места для даты {selectedDate.split(' ')[0].split('-').reverse().join('.')}
                        </h2>
                        <div className={styles.colorPriceContainer}>
                            <div className={styles.priceItem}>
                                <div>5000₽</div>
                                <div className={`${styles.colorLine} ${styles.color5000}`} />
                            </div>
                            <div className={styles.priceItem}>
                                <div>8000₽</div>
                                <div className={`${styles.colorLine} ${styles.color8000}`} />
                            </div>
                            <div className={styles.priceItem}>
                                <div>9500₽</div>
                                <div className={`${styles.colorLine} ${styles.color9500}`} />
                            </div>
                            <div className={styles.priceItem}>
                                <div>11000₽</div>
                                <div className={`${styles.colorLine} ${styles.color11000}`} />
                            </div>
                            <div className={styles.priceItem}>
                                <div>Занято</div>
                                <div className={`${styles.colorLine} ${styles.colorOccupied}`} />
                            </div>
                        </div>
                        {Array.isArray(selectedSpectacle.hall) ? (
                            <div className={styles.theater}>
                                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                    <span style={{margin: 0, textAlign: 'center'}}>Сцена</span>
                                    <div className={styles.lineScen}/>
                                </div>

                                {selectedSpectacle.hall.map((row: any, rowIndex: number) => (
                                    <div key={rowIndex} className={styles.row}>
                                        {row.map((seat: any) => {
                                            const seatId = `${seat.row}-${seat.seatNumber}`;
                                            const isReserved = seat.reserved || reservedSeats.includes(seatId);

                                            return (
                                                <div
                                                    key={seatId}
                                                    className={`${styles.seat} ${isReserved ? styles.reserved : ''} ${selectedSeats.includes(seatId) ? styles.selected : ''}`}
                                                    style={{ '--seat-color': seat.color || 'green' } as React.CSSProperties}
                                                    onClick={() => !isReserved && toggleSeatSelection(seat.row, seat.seatNumber)}
                                                >
                                                    {seat.seatNumber}{seat.row}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Схема зала не найдена</p>
                        )}
                        <div className={styles.navigationButtons}>
                            <button className={`${styles.btw} ${styles.navigationButton}`} onClick={prevStep}>Назад</button>
                            <button
                                className={`${styles.btw} ${styles.navigationButton}`}
                                onClick={() => {
                                    addToCart();
                                    closeModal();
                                }}
                                disabled={selectedSeats.length === 0}
                            >
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
