import React, {useState} from 'react';
import styles from './MenuFood.module.css';
import {ButtonAddFood} from "../ButtonReused/ButtonAddFood";

export const MenuFood = ({setShowModal,isAddButtonDisabled, imageFood, comment, onAdd, cost, quantity, setQuantity, foodId, changeMenu,category, selectedSeats}: any) => {
    const [flyingLabels, setFlyingLabels] = useState([]);
    const [isEditingCost, setIsEditingCost] = useState(false);
    const [editedCost, setEditedCost] = useState(cost);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAdd = () => {
        if (isAddButtonDisabled) {
            setShowModal(true);
            return
        }
        const id = Date.now();
        // @ts-ignore
        setFlyingLabels(prevLabels => [...prevLabels, id]);

        onAdd(editedCost);

        setTimeout(() => {
            setFlyingLabels(prevLabels => prevLabels.filter(labelId => labelId !== id));
        }, 1000);
    };
    const updateCostOnServer = async (newCost: any) => {
        try {
            const endpoint = changeMenu === 'food' ? 'food' : 'drinks';

            const response = await fetch(`http://localhost:3001/${endpoint}/${foodId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cost: newCost }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении цены');
            }

            const data = await response.json();
            console.log(`Цена на бэкенде обновлена в ${endpoint}:`, data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = () => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Неверный логин или пароль');
                return res.json();
            })
            .then(() => {
                setIsEditingCost(true);
                setShowLoginModal(false);
                setUsername('');
                setPassword('');
                setErrorMessage('');
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    };

    return (
        <div className={changeMenu === 'food' ? styles.menuFoodContainer : styles.wineContainer}>
            {flyingLabels.map(labelId => (
                <div key={labelId} className={styles.flyingLabel}>

                    Добавлено в корзину
                </div>
            ))}

            {changeMenu === 'food' ? <div className={styles.imageContainer}>
                <img src={imageFood} alt="food" className={styles.foodImage}/>
            </div> : ''}

            <div className={styles.infoContainer}>
                <div className={styles.commentText}>
                    {category}
                    {comment}
                </div>

                {}
                <div
                    className={styles.constText}
                    onDoubleClick={() => {
                        if (!isEditingCost) {
                            setShowLoginModal(true);
                        }
                    }}
                >
                    {isEditingCost ? (
                        <input
                            type="number"
                            min="0"
                            value={editedCost}
                            onChange={(e) => setEditedCost(Number(e.target.value))}
                            onBlur={() => {
                                setIsEditingCost(false);
                                updateCostOnServer(editedCost);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setIsEditingCost(false);
                                    updateCostOnServer(editedCost);
                                }
                            }}
                            autoFocus
                            className={styles.costInput}
                        />
                    ) : (
                        <span>{editedCost} ₽</span>
                    )}
                </div>
            </div>

            <div className={styles.controlsContainer}>
                <ButtonAddFood
                    onclickAdd={handleIncrease}
                    onClickDelete={handleDecrease}
                    title={quantity}
                />
                <button onClick={handleAdd} className={styles.btw} style={isAddButtonDisabled ? {opacity: 0.3}: undefined}>
                    Добавить
                </button>
            </div>

            {showLoginModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Авторизация</h2>
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <input
                            className={styles.inputStyle}
                            type="text"
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className={styles.inputStyle}
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={styles.modalButtons}>

                            <button onClick={handleLogin}>Войти</button>
                            <button
                                onClick={() => {
                                    setShowLoginModal(false);
                                    setUsername('');
                                    setPassword('');
                                    setErrorMessage('');
                                }}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};