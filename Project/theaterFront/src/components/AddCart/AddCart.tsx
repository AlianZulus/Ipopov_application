
import React, {useEffect, useState} from 'react';
import styles from './AddCart.module.css';
import close from '../../assets/icons/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import th from '../../assets/icons/th6.webp';
import del from '../../assets/icons/delete.svg';
import {PayModal} from "../Modals/PayModal/PayModal";
import {ArrowDrop} from "../../assets/icons/ArrowDrop";
import {TableReserv} from "../TableReserv/TableReserv";
import {MyModal} from "../Modals/ModalWarn/ModalWarn";


export const AddCart = ({
                            cart,
                            setShowModal,
                            showModal,
                            grandTotal,
                            userEmail,
                            setCart,
                            setCount,
                            count,
                            countTwo,
                            setCountTwo,
                            activeProgram,
                            setActiveProgram,
                            openModalCart,
                            setOpenModalCart,
                            setFinalPay,
                            setPlateNumber,
                            plateNumber,
                            closeModalCartHandler,
                            removeCartHandler
                        }: any) => {
    const [step, setStep] = useState<number>(1);
    const [openMenuDop, setOpenMenuDop] = useState<boolean>(true);
    const [tables, setTables] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [tempReservations, setTempReservations] = useState<{ [key: string]: number[] }>({});
    const [additions, setAdditions] = useState<any[]>([]);
    const [reservedTables, setReservedTables] = useState<number[]>([]);
    const [pendingTables, setPendingTables] = useState<number[]>([]);
    const [showTwo, setShowTwo] = useState(false);
    const [isReservationDisabled, setIsReservationDisabled] = useState(false);
    const [bookedTables, setBookedTables] = useState<number[]>([]);
    useEffect(() => {
        if (!selectedDate) return;

        fetch(`http://localhost:3001/reservations?date=${selectedDate}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.reservedTables) {
                    setReservedTables(data.reservedTables);
                    setPendingTables([]);
                }
            })
            .catch(err => console.error('Ошибка GET /reservations:', err));
    }, [selectedDate]);

    const handleTableClick = (tableId: number | string) => {
        if (typeof tableId !== 'number') return;

        if (reservedTables.includes(tableId)) {
            return;
        }

        if (pendingTables.includes(tableId)) {
            setPendingTables(prev => prev.filter(id => id !== tableId));
        } else {
            if (pendingTables.length >= 2) {
                setShowModal(true)
                return;
            }
            setPendingTables(prev => [...prev, tableId]);
        }
    };

    const confirmReservation = async () => {
        if (!selectedDate) {
            alert('Сначала выберите дату!');
            return;
        }
        if (pendingTables.length === 0) {
            setShowTwo(true);
            return;
        }

        for (const tableId of pendingTables) {
            try {
                const resp = await fetch('http://localhost:3001/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tableId, date: selectedDate })
                });
                const data = await resp.json();
                if (!resp.ok) {
                    alert(data.error || `Не удалось забронировать стол #${tableId}`);
                } else {
                    console.log(`Стол #${tableId} забронирован на ${selectedDate}`);
                }
            } catch (err) {
                console.error('Ошибка POST /reserve:', err);
            }
        }

        setBookedTables(pendingTables);

        setReservedTables(prev => [...prev, ...pendingTables]);
        setPendingTables([]);
        setIsModalOpen(false);
        setIsReservationDisabled(true);
    };


    useEffect(() => {
        const fetchAdditions = async () => {
            try {
                const response = await fetch('http://localhost:3001/addition');
                if (!response.ok) {
                    throw new Error('Не удалось загрузить дополнения');
                }
                const data = await response.json();
                const additionsWithCount = data.map((addition: any) => ({
                    ...addition,
                    count: 0
                }));
                setAdditions(additionsWithCount);
            } catch (error) {
                console.error('Ошибка при загрузке дополнений:', error);
            }
        };

        fetchAdditions();
    }, []);

    const handleAdditionIncrease = (id: number) => {
        setAdditions(prevAdditions =>
            prevAdditions.map(addition =>
                addition.id === id
                    ? {...addition, count: Math.min(addition.count + 1, 5)}
                    : addition
            )
        );
    };

    const handleAdditionDecrease = (id: number) => {
        setAdditions(prevAdditions =>
            prevAdditions.map(addition =>
                addition.id === id
                    ? {...addition, count: Math.max(addition.count - 1, 0)}
                    : addition
            )
        );
    };



    const changeOpenMenuDop = () => {
        setOpenMenuDop(!openMenuDop);
    }

    console.log(plateNumber)
    const [localEmail, setLocalEmail] = useState('');


    const nextStep = () => setStep(2);
    const nextStepThree = () => {
        setStep(3)
    };
    const prevStepEnd = () => {
        setStep(0)

    }

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        closeModalCartHandler();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleSendCartToEmail = async () => {
        try {
            if (!localEmail) {
                alert("Введите e-mail, чтобы получить письмо с заказом");
                return;
            }

            const selectedAdditions = additions
                .filter(addition => addition.count > 0)
                .map(addition => ({
                    additionId: addition.id,
                    additionName: addition.additionName,
                    quantity: addition.count,
                    cost: addition.cost,
                    totalCost: addition.count * addition.cost,
                }));

            const updatedCart = [...cart, ...selectedAdditions];

            const response = await fetch('http://localhost:3001/sendmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: updatedCart,
                    grandTotal: grandTotal,
                    userEmail: localEmail,
                    tableNumbers: bookedTables,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных на почту');
            }

            const data = await response.json();
            console.log('Ответ сервера:', data);
            nextStep();

            setIsReservationDisabled(false);
        } catch (error) {
            console.error('Ошибка при отправке корзины:', error);
            alert('Не удалось отправить письмо. Проверьте консоль сервера.');
        }

        closeModalCartHandler();
        setCart([]);
        nextStepThree();
        setCount(0);
        setCountTwo(0);
        handleConfirmReservations();
        setTimeout(() => {
            prevStepEnd();
        }, 4000);
    };


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        fetchTables();

    };

    const fetchTables = async () => {
        try {
            const response = await fetch("http://localhost:3001/reservations");
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных о столах");
            }
            const data = await response.json();

            const groupedTables = data.reduce((acc: any, table: any) => {
                const date = table.date || "undefined";
                if (!acc[date]) acc[date] = [];
                acc[date].push(table);
                return acc;
            }, {});

            setTables(groupedTables);
        } catch (error) {
            console.error("Ошибка при загрузке столов:", error);
        }
    };

    const handleConfirmReservations = async () => {
        try {
            const dateReservations = tempReservations[selectedDate] || [];
            console.log("Выбранные столы для бронирования:", dateReservations);

            const payload = dateReservations.map(id => ({
                id,
                userReserved: true,
                colorReserved: 'grey',
                date: selectedDate
            }));

            console.log("Отправляемые данные для бронирования:", {tables: payload});

            const response = await fetch("http://localhost:3001/reservations/book", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({tables: payload}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Ошибка ответа от сервера:", errorData);
                throw new Error(errorData.error || "Не удалось забронировать столы");
            }

            const result = await response.json();
            console.log("Бронирование успешно:", result);

            setTempReservations({});
            fetchTables();
        } catch (error: any) {
            console.error("Ошибка при подтверждении брони:", error.message);

        }
    };

    return (
        <>
            {}
            {step === 1 && (
                <div
                    className={`${styles.container} ${openModalCart ? styles.active : ''}`}
                    onClick={handleOutsideClick}
                >
                    <div
                        className={`${styles.modal} ${openModalCart ? styles.active : ''}`}
                        onClick={handleModalClick}
                    >
                        <h2 className={styles.header}>Корзина</h2>

                        <div className={styles.cartItemsContainer}>
                            {cart.length > 0 ? (
                                cart.map((item: any, index: number) => (
                                    <div key={index} className={styles.cartItem}>
                                        <div className={styles.itemContent}>
                                            <div className={styles.itemDetails}>
                                                <h3 className={styles.title}>
                                                    {item.title || item.comment || item.wineName || item.drinkName}
                                                </h3>
                                                {item.date && !item.imageFood && (
                                                    <p>
                                                        <strong>Дата:</strong> {item.date}
                                                    </p>
                                                )}
                                                {item.row && item.seatNumber && (
                                                    <p>
                                                        <strong>Место:</strong> {`${item.row}${item.seatNumber}`}
                                                    </p>
                                                )}
                                                {!item.date && 'quantity' in item && (
                                                    <div className={styles.quantityInfo}>
                                                        <strong>Количество: {item.quantity}</strong>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.priceOrDelete}>
                                                <span className={styles.price}>
                                                    {item.customCost !== undefined
                                                        ? item.customCost
                                                        : item.costPlace}
                                                    {' '}₽
                                                </span>
                                                <img
                                                    src={del}
                                                    alt="delete icon"
                                                    className={styles.deleteIcon}
                                                    onClick={() => removeCartHandler(index)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.emptyCart}>
                                    <img className={styles.emptyImage} src={th} alt="empty cart"/>
                                    <p className={styles.emptyText}>Пока тут пусто</p>
                                </div>
                            )}
                        </div>

                        {}
                        {cart.length > 0 && (
                            <div className={styles.binocularSection}>
                                {"teatr@culture.mos.ru"}

                                <div onClick={changeOpenMenuDop} style={{
                                    padding: 10,
                                    fontSize: 16,
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <strong className={styles.add}> Добавить к заказу? </strong>
                                    <ArrowDrop rotate={openMenuDop ? 180 : 0}/>


                                </div>
                                <div
                                    className={`${styles.accordionContent} ${
                                        openMenuDop ? styles.open : ''
                                    }`}
                                >
                                    <div style={{padding: '20px', width: '92%'}}>
                                        {}
                                        <div className={styles.choiceRow}>
                                            <strong className={styles.choiceLabel}>Добавить бинокль?</strong>

                                            <div className={styles.containerBtwChoice}>
                                                <button
                                                    onClick={() => {
                                                        handleAdditionDecrease(1);
                                                        setCount(count - 1)
                                                    }}
                                                    className={styles.btwChoice}
                                                    disabled={additions.find(a => a.id === 1)?.count === 0}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <div className={styles.count}>
                                                {additions.find(a => a.id === 1)?.count || 0}
                                            </div>
                                            <div className={styles.containerBtwChoice}>
                                                <button
                                                    onClick={() => {
                                                        handleAdditionIncrease(1);
                                                        setCount(count + 1);
                                                    }}
                                                    className={styles.btwChoice}
                                                    disabled={additions.find(a => a.id === 1)?.count === 5}
                                                >
                                                    +
                                                    <span
                                                        className={styles.tooltip}>Цена: {additions.find(a => a.id === 1)?.cost}р</span>
                                                </button>
                                            </div>
                                        </div>

                                        {}
                                        <div className={styles.choiceRow}>
                                            <strong className={styles.choiceLabel}>Добавить программу
                                                спектакля?</strong>

                                            <div className={styles.containerBtwChoice}>
                                                <button
                                                    onClick={() => {
                                                        handleAdditionDecrease(2);
                                                        setCount(count - 1)
                                                    }}
                                                    className={styles.btwChoice}
                                                    disabled={additions.find(a => a.id === 2)?.count === 0}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <div className={styles.count}>
                                                {additions.find(a => a.id === 2)?.count || 0}
                                            </div>
                                            <div className={styles.containerBtwChoice}>
                                                <button
                                                    onClick={() => {
                                                        handleAdditionIncrease(2);
                                                        setCount(count + 1)
                                                    }}
                                                    className={styles.btwChoice}
                                                    disabled={additions.find(a => a.id === 2)?.count === 5}
                                                >
                                                    +
                                                    <span
                                                        className={styles.tooltip}>Цена: {additions.find(a => a.id === 2)?.cost}р</span>
                                                </button>
                                            </div>
                                        </div>
                                        <button  disabled={isReservationDisabled}   className={styles.reserveButton} onClick={toggleModal}>
                                            Забронировать стол
                                        </button>
                                    </div>
                                </div>
                                {}
                                <div onClick={nextStep} className={styles.total}>
                                    <div onClick={() => setPlateNumber('')} className={styles.btwTotal}>
                                        К оплате: {grandTotal} ₽
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={styles.closeButton} onClick={closeModalCartHandler}>
                            <img src={close} alt="close"/>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen &&
                <TableReserv isReservationDisabled={isReservationDisabled} reservedTables={reservedTables} pendingTables={pendingTables} selectedDate={selectedDate}
                             setSelectedDate={setSelectedDate} setShowTwo={setShowTwo} showTwo={showTwo} confirmReservation={confirmReservation} handleTableClick={handleTableClick}
                             setReservedTables={setReservedTables} setPendingTables={setPendingTables}
                             isClose={() => setIsModalOpen(false)} setIsModalOpen={setIsModalOpen}
                             showModal={showModal} setShowModal={setShowModal}/>}
            {}
            {step === 2 && (
                <div className={styles.containerTwo}>
                    <div className={styles.modalTwo}>
                        {}
                        <PayModal
                            localEmail={localEmail}
                            setLocalEmail={setLocalEmail}
                            handleSendCartToEmail={handleSendCartToEmail}
                            setOpenModalCart={setOpenModalCart}
                            prevStepEnd={prevStepEnd}
                            cart={cart}
                            grandTotal={grandTotal}
                            setCart={setCart}
                            setStep={setStep}
                            setFinalPay={setFinalPay}
                            setPlateNumber={setPlateNumber}
                            plateNumber={plateNumber}
                        />
                    </div>
                </div>
            )}
            {}
            {step === 3 && (
                <div className={styles.containerThree}>
                    <div className={styles.modalThree}>
                        <div className={styles.checkmarkContainer}>
                            <div className={styles.checkmark}></div>
                        </div>
                        <div className={styles.thankYouText}>Покупка успешна!</div>
                        {plateNumber.length > 4 ? (
                            <div>Ваше парковочное место <span className={styles.highlight}>32</span></div>) : ''}

                    </div>
                </div>
            )}
        </>
    );
};
