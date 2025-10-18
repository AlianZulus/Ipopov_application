import React, {useState, useRef} from 'react';
import styles from './PayModal.module.css';
import {InputPay} from './InputPay';
import {ParkingPlace} from "../../ParkingPlace/ParkingPlace";

export const PayModal = ({
                             prevStepEnd,
                             cart,
                             grandTotal,
                             setCart,
                             setOpenModalCart,
                             setFinalPay,
                             setPlateNumber,
                             plateNumber,
                             handleSendCartToEmail,
                             setLocalEmail,
                             localEmail
                         }: any) => {
    const form = useRef<HTMLFormElement>(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [mail, setMail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleNumericInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<string>>,
        maxLength: number,
        fieldName?: string
    ) => {
        let value = e.target.value.replace(/\D/g, '');
        setter(value.slice(0, maxLength));
    };

    const formatCartContents = () => {
        return cart
            .map((item: any, index: number) => {
                return `
Товар ${index + 1}:
Название: ${item.title || item.comment || item.wineName}
${item.date && !item.imageFood ? `Дата: ${item.date}` : ''}
${item.seatNumber ? `Место: ${item.row || ''}${item.seatNumber}` : ''}
${'quantity' in item ? `Количество: ${item.quantity}` : ''}
Цена: ${item.costPlace || item.cost} ₽
      `;
            })
            .join('\n');

    };

    const isFormValid = () => {
        const isCardNumberValid = cardNumber.length === 16;
        const expiryMonthNum = parseInt(expiryMonth, 10);
        const isExpiryMonthValid = expiryMonth.length === 2 && expiryMonthNum >= 1 && expiryMonthNum <= 12;
        const isExpiryYearValid = expiryYear.length === 2;
        const isCvcValid = cvc.length === 3;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail);


        return (
            isCardNumberValid &&
            isExpiryMonthValid &&
            isExpiryYearValid &&
            isCvcValid &&
            isEmailValid
        );
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

    };
    const testTest = () => {
        setOpenModalCart()
        setFinalPay(true)

    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.form}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2>Оплата</h2>
                    <h2 style={{cursor: 'pointer'}} onClick={prevStepEnd}>x</h2>
                </div>

                <form ref={form} onSubmit={sendEmail}>
                    {}
                    <input type="hidden" name="cart_contents" value={formatCartContents()}/>
                    <input type="hidden" name="grand_total" value={`К оплате: ${grandTotal} ₽`}/>

                    {}
                    <div>
                        <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '10px'}}>
                            Введите электронную почту
                        </div>
                        <InputPay
                            type="email"
                            name="user_email"
                            placeholder="email@culture.mos.ru"
                            width="100%"
                            value={localEmail}
                            onChange={(e) => setLocalEmail(e.target.value)}
                        />
                        {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail) && localEmail.length > 0 && (
                            <span className={styles.error}>Введите корректный email</span>
                        )}
                    </div>

                    {}
                    <InputPay
                        type="text"
                        name="card_number"
                        placeholder="Номер карты"
                        width="100%"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => handleNumericInput(e, setCardNumber, 16)}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    {cardNumber.length > 0 && cardNumber.length < 16 && (
                        <span className={styles.error}>Введите 16 цифр</span>
                    )}

                    <div className={styles.expiryCvcContainer}>
                        <div>
                            <InputPay
                                type="text"
                                name="expiry_month"
                                placeholder="ММ"
                                width="45%"
                                maxLength={2}
                                value={expiryMonth}
                                onChange={(e) => handleNumericInput(e, setExpiryMonth, 2)}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            {expiryMonth.length === 2 && (parseInt(expiryMonth, 10) < 1 || parseInt(expiryMonth, 10) > 12) && (
                                <span className={styles.error}>Месяц от 01 до 12</span>
                            )}
                        </div>
                        <div>
                            <InputPay
                                type="text"
                                name="expiry_year"
                                placeholder="ГГ"
                                width="45%"
                                maxLength={2}
                                value={expiryYear}
                                onChange={(e) => handleNumericInput(e, setExpiryYear, 2)}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            {expiryYear.length > 0 && expiryYear.length < 2 && (
                                <span className={styles.error}>Введите 2 цифры</span>
                            )}
                        </div>
                        <div>
                            <InputPay
                                type="password"
                                name="cvc"
                                placeholder="CVC"
                                width="100%"
                                maxLength={3}
                                value={cvc}
                                onChange={(e) => handleNumericInput(e, setCvc, 3)}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            {cvc.length > 0 && cvc.length < 3 && (
                                <span className={styles.error}>Введите 3 цифры</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', marginTop: '10px'}}>
                            Если требуется парковочное место
                        </div>
                        <ParkingPlace setPlateNumber={setPlateNumber}
                                      plateNumber={plateNumber}/>
                    </div>
                    <button
                        onClick={handleSendCartToEmail}
                        type="submit"
                        className={styles.payButton}
                        disabled={!isFormValid()}
                    >
                        {loading ? 'Отправка...' : 'Оплатить'}
                    </button>
                </form>
                <div>
                </div>
                {message && <div className={styles.message}>{message}</div>}
            </div>
        </div>
    );
};
