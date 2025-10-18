// @ts-nocheck
import React, {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Spectacle} from '../Spectacle/Spectacle';
import {Menu} from '../Menu/Menu';
import {MenuAll, MenuItem} from '../../assets/const/data';
import {AddCart} from "../AddCart/AddCart";
import {MenuFood} from "../MenuFood/MenuFood";
import styles from './Main.module.css';
import {Contacts} from "../Contacts/Contacts";
import {CombinedModal} from "../Modals/CombinatedModal/CombinatedModal";
import {OpenCommentModal} from "../Modals/OpenCommentModal/OpenCommentModal";
import {DrinkItem, FoodItem, ReservedSeatsByDate, SeatData} from "../../assets/const/types";
import axios from "axios";
import {Carusel} from "../Carusel/Carusel";
import {MyModal} from "../Modals/ModalWarn/ModalWarn";


export const Main = () => {
    const [data, setData] = useState([]);
    const [food, setFood] = useState<FoodItem[]>([]);
    const [drinksData, setDrinksData] = useState<DrinkItem[]>([]);
    const [openModalCart, setOpenModalCart] = useState(false);
    const [changeMenu, setChangeMenu] = useState('food');
    const [selectedSpectacle, setSelectedSpectacle] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [cart, setCart] = useState<SeatData[]>([]);
    const [reservedSeatsByDate, setReservedSeatsByDate] = useState<ReservedSeatsByDate>({});
    const [menu] = useState<MenuItem[]>(MenuAll);
    const [openComment, setOpenComment] = useState<number | null>(null);
    const [finalPay, setFinalPay] = useState<boolean>(false);
    const [plateNumber, setPlateNumber] = useState('');
    const [openCombinedModal, setOpenCombinedModal] = useState(false);
    const [activeProgram, setActiveProgram] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [countTwo, setCountTwo] = useState<number>(0);
    const [groupedDrinks, setGroupedDrinks] = useState<DrinkItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [orderCount, setOrderCount] = useState<number>(0);

    useEffect(() => {
        const grouped = drinksData.reduce((acc, drink) => {

            if (!acc[drink.category]) {

                acc[drink.category] = [];
            }

            acc[drink.category].push(drink);
            return acc;
        }, {});

        setGroupedDrinks(grouped);
    }, [drinksData]);
    useEffect(() => {
        axios
            .get('http://localhost:3001/food')
            .then((response) => {
                setFood(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении списка блюд:', error);
            });
    }, []);


    useEffect(() => {
        axios
            .get('http://localhost:3001/drinks')
            .then((response) => {
                setDrinksData(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении списка блюд:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:3001/spectacles')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении списка блюд:', error);
            });
    }, []);


    const openCommentHandler = (id: number) => {
        setOpenComment(id);
    };

    const closeCommentHandler = () => {
        setOpenComment(null);
    };


    const openCombinedModalHandler = (spectacle: any) => {
        setSelectedSpectacle(spectacle);
        setOpenCombinedModal(true);
    };

    const closeCombinedModalHandler = () => {
        setOpenCombinedModal(false);
        setSelectedSpectacle(null);
        setSelectedDate(null);
        setSelectedSeats([]);
    };

    const selectedSlides = data.slice(4, 6);

    const test = cart.length === 0 ? '' : cart.length;

    const addToCartTwo = (item: any, listType: 'food' | 'drinks', customCost: number) => {
        setCart((prevCart: any): any => {
            const existingItemIndex = prevCart.findIndex(
                (el: any) => el.id === item.id && el.customCost === customCost
            );

            if (existingItemIndex !== -1) {
                const updatedCart = structuredClone(prevCart);
                const existingItem = updatedCart[existingItemIndex];
                existingItem.quantity += item.quantity;
                return updatedCart;
            } else {
                return [...prevCart, {...item, customCost, listType}];
            }
        });

        if (listType === 'food') {
            setFood((prevFood) =>
                prevFood.map(f => f.id === item.id ? {...f, quantity: 1} : f)
            );
        }
    };


    const scrollToSection = (sectionId: string) => {
        console.log(`Прокрутка к разделу с ID: ${sectionId}`);
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            console.log('Элемент найден:', targetSection);
            targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        } else {
            console.error(`Секция с id '${sectionId}' не найдена`);
        }
    };

    const addToCart = () => {
        if (selectedSpectacle && selectedDate) {
            const selectedSeatsData = selectedSeats.map((seatId) => {
                for (let row of selectedSpectacle.hall) {
                    for (let seat of row) {
                        if (`${seat.row}-${seat.seatNumber}` === seatId) {
                            return {
                                title: selectedSpectacle.title,
                                date: selectedDate,
                                row: seat.row,
                                seatNumber: seat.seatNumber,
                                costPlace: seat.costPlace,
                            };
                        }
                    }
                }
                return null;
            }).filter((seat) => seat !== null) as SeatData[];

            setCart((prevCart) => [...prevCart, ...selectedSeatsData]);

            setReservedSeatsByDate((prevReserved) => ({
                ...prevReserved,
                [selectedDate]: [...(prevReserved[selectedDate] || []), ...selectedSeats],
            }));

            setSelectedSeats([]);
        }
    };

    const removeCartHandler = (index: number) => {
        const itemToRemove = cart[index];

        if (!itemToRemove) return;

        if ('quantity' in itemToRemove && (itemToRemove as FoodItem).quantity > 1) {
            setCart((prevCart) => {
                const updatedCart = structuredClone(prevCart);
                updatedCart[index].quantity -= 1;
                return updatedCart;
            });
        } else {
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);

            const hasSeatNumber = updatedCart.some(el => 'seatNumber' in el)
            if (!hasSeatNumber) {
                setCart([])
                setCount(0)
                setCountTwo(0)
                setShowModal(true)
            }
            if ('date' in itemToRemove) {
                setReservedSeatsByDate((prevReserved) => {
                    const updatedReservedSeats = {...prevReserved};
                    const date = itemToRemove.date;

                    updatedReservedSeats[date] = updatedReservedSeats[date].filter(
                        (seatId) => seatId !== `${itemToRemove.row}-${itemToRemove.seatNumber}`
                    );

                    if (updatedReservedSeats[date].length === 0) {
                        delete updatedReservedSeats[date];
                    }

                    return updatedReservedSeats;
                });
            }
        }
    };

    const grandTotal = cart.reduce((total, item: any) => {
        if ('costPlace' in item) {
            return total + (item.costPlace || 0);
        } else if ('cost' in item && 'quantity' in item) {
            const itemCost = item.customCost !== undefined ? item.customCost : item.cost;
            return total + (itemCost * item.quantity);
        } else {
            return total;
        }
    }, (count || 0) * 1000 + (activeProgram ? 1000 : 0));

    const toggleSeatSelection = (row: string, seatNumber: number) => {
        const seatId = `${row}-${seatNumber}`;
        if (reservedSeatsByDate[selectedDate || '']?.includes(seatId)) return;

        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatId)
                ? prevSelectedSeats.filter((seat) => seat !== seatId)
                : [...prevSelectedSeats, seatId]
        );
    };

    const openModalCartHandler = () => setOpenModalCart(true);
    const closeModalCartHandler = () => setOpenModalCart(false);
    const changeMenuFoodHandler = () => {
        setChangeMenu('food');
    };
    const changeMenuDrinksHandler = () => {
        setChangeMenu('drinks');
    };
    const handleSetQuantity = (id: number, newQuantity: number) => {
        setFood((prevFood) =>
            prevFood.map(item =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const handleSetQuantityDrinks = (id: number, newQuantity: number) => {
        setDrinksData((prevDrinks) =>
            prevDrinks.map((item) =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    };


    return (
        <div id={'home'} className={styles.mainContainer}>

            {}
            <Menu
                openModalCartHandler={openModalCartHandler}
                scrollToSection={scrollToSection}
                menu={menu}
                test={test}
            />
            {}
            <div className={styles.caruselContainer}>
                <Carusel openCombinedModalHandler={openCombinedModalHandler} selectedSlides={selectedSlides}/>
            </div>
            {}
            <div id={'spectacle'} className={styles.spectacleContainer}>
                <h1 style={{color: 'white', fontSize: '2vw'}}>Репертуар сезона 2023/2024</h1>
            </div>

            {}
            <div
                style={{
                    padding: 'calc(1vh + 1rem) calc(5vw + 20px)',
                    backgroundColor: '#001b22',
                }}
            >
                <div className={styles.spectacleMap}>
                    {data.map((spectacle: any, id: number) => (
                        <div key={id} style={{width: 'calc(40% + 10px)', border: '2px solid white'}}>
                            <Spectacle
                                openCommentHandler={() => openCommentHandler(spectacle.id)}
                                icons={spectacle.icons}
                                title={spectacle.title}
                                comment={spectacle.comment}
                                age={spectacle.age}
                                dates={spectacle.dates}
                                hall={spectacle.hall}
                                openCombinedModalHandler={openCombinedModalHandler}
                            />
                            {}
                            {openComment === spectacle.id && (
                                <OpenCommentModal
                                    comment={spectacle.comment}
                                    closeCommentHandler={closeCommentHandler}
                                />
                            )}
                            {}
                            <AddCart
                                showModal={showModal}
                                setShowModal={setShowModal}
                                setCountTwo={setCountTwo}
                                countTwo={countTwo}
                                count={count}
                                setCount={setCount}
                                setActiveProgram={setActiveProgram}
                                activeProgram={activeProgram}
                                setOpenModalCart={setOpenModalCart}
                                grandTotal={grandTotal}
                                removeCartHandler={removeCartHandler}
                                cart={cart}
                                closeModalCartHandler={closeModalCartHandler}
                                setCart={setCart}
                                setFinalPay={setFinalPay}
                                setPlateNumber={setPlateNumber}
                                plateNumber={plateNumber}
                                openModalCart={openModalCart}
                            />
                            {}
                            {openCombinedModal && selectedSpectacle && (
                                <CombinedModal
                                    closeModal={closeCombinedModalHandler}
                                    selectedSpectacle={selectedSpectacle}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    selectedSeats={selectedSeats}
                                    toggleSeatSelection={toggleSeatSelection}
                                    addToCart={addToCart}
                                    reservedSeats={reservedSeatsByDate[selectedDate || ''] || []}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {showModal && (
                    <MyModal
                        onClose={() => setShowModal(false)}
                        text="Сначала нужно выбрать билет на представления"
                    />
                )}
                {}
                <div className={styles.containerFood}>
                    <div id={'menu'}>
                        <h1 style={{color: 'white', fontSize: '2vw'}}>Меню ресторана</h1>
                    </div>
                    {}
                    <div className={styles.choiceTitle}>
                        <div
                            className={`${styles.btw} ${changeMenu === 'food' ? styles.active : ''}`}
                            onClick={changeMenuFoodHandler}
                        >
                            Блюда
                        </div>
                        <div
                            className={`${styles.btw} ${changeMenu === 'drinks' ? styles.active : ''}`}
                            onClick={changeMenuDrinksHandler}
                        >
                            Напитки
                        </div>
                    </div>
                    <div className={styles.changeModal}>
                        {}
                        {changeMenu === 'food' && food.map((el, id) => (
                            <div key={id} style={{width: 'calc(50% - 10px)'}}>
                                <MenuFood

                                    setShowModal={setShowModal}
                                    isAddButtonDisabled={cart.length === 0}
                                    changeMenu={changeMenu}
                                    foodId={el.id}
                                    imageFood={el.imageFood}
                                    comment={el.comment}
                                    cost={el.cost}
                                    quantity={el.quantity}
                                    setQuantity={(newQuantity: number) => handleSetQuantity(el.id, newQuantity)}
                                    onAdd={(customCost: number) => addToCartTwo(el, 'food', customCost)}
                                />
                            </div>
                        ))}

                        {}
                        {changeMenu === 'drinks' && Object.keys(groupedDrinks).map((category, index: number) => (
                            <div key={index} style={{width: '100%', marginBottom: '20px'}}>
                                <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: '20px'}}>
                                    {groupedDrinks[category].map((el: any, id: number) => (
                                        <div key={id} style={{width: 'calc(50% - 10px)'}}>
                                            <MenuFood
                                                setShowModal={setShowModal}
                                                isAddButtonDisabled={cart.length === 0}
                                                selectedSeats={selectedSeats}
                                                changeMenu={changeMenu}
                                                foodId={el.id}
                                                imageFood={''}
                                                comment={`${el.drinkName} - ${el.overview}`}
                                                cost={el.cost}
                                                quantity={el.quantity}
                                                setQuantity={(newQuantity: any) => handleSetQuantityDrinks(el.id, newQuantity)}
                                                onAdd={(customCost: any) => addToCartTwo(el, 'drinks', customCost)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {}
            <div id={'contacts'} style={{width: '100%', padding: 0}}>
                <Contacts/>
            </div>
        </div>
    );
};