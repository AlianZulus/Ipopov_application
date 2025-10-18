import React, {useState} from 'react';
import styles from './ModalBuy.module.css';
import close from '../../../assets/icons/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';

type Props = {
    closeBuyHandler: () => void;
    openModalHallHandler: (selectedDate: string) => void,
    selectedSpectacl: any,
};

export const ModalBuy = ({closeBuyHandler, openModalHallHandler, selectedSpectacl }: Props) => {
    const {title, icons, age, dates, adress} = selectedSpectacl
    const [isHovered, setIsHovered] = useState(false);
    console.log(dates)
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div onClick={closeBuyHandler}>
                    <img
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{position: "absolute", top: '-8%', left: '90%'}}
                        className={`${styles.rotate} ${isHovered ? '' : styles.mouseOut}`}
                        src={close}
                        alt={'close'}
                    />
                </div>

                {}
                <div style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '5%',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginBottom: '2px'
                }}>
                    <h3 style={{marginLeft: '40px', textAlign: 'left'}}>{title}</h3>
                </div>

                {}
                <div style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '5%',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                }}>
                    <h4 style={{marginLeft: '20px', textAlign: 'left'}}>Выбор сеанса</h4>
                </div>

                {}
                <div style={{
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '30px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        width: '80%',
                        height: '90%',
                        borderRadius: '10px',
                        overflowY: 'scroll',
                        padding: '20px',
                    }}>
                        {}
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column',}}>
                                <div style={{display: 'flex', alignItems: 'start'}}>
                                    <img style={{width: '240px', height: '270px', borderRadius: 20}} src={icons}
                                         alt={'icons'}/>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '20px'
                                    }}>
                                        <div style={{
                                            fontWeight: 600,
                                            fontSize: 'calc(1rem /(14 / 24))',
                                            color: '#233353'
                                        }}>{title}</div>
                                        <div style={{
                                            marginLeft: 20,
                                            fontSize: 'calc(1rem /(25 / 24))',
                                            backgroundColor: '#233353',
                                            padding: 3,
                                            color: 'white',
                                            borderRadius: 5
                                        }}> {age}</div>
                                    </div>
                                </div>
                                <h3 style={{
                                    fontWeight: 600,
                                    fontSize: 'calc(1rem /(14 / 24))',
                                    color: '#233353'
                                }}>Выбор сеанса</h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                    {dates.map((d: any, id: number) => (
                                        <div key={id} style={{
                                            padding: '10px',
                                            borderBottom: '1px solid #233353',
                                            color: '#233353'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}> {}

                                                {}
                                                <div style={{fontSize: 26, color: '#233353'}}>
                                                    {d.date.split(' ')[0].split('-').reverse().join(' ')}
                                                </div>

                                                {}
                                                <div>
                                                    {d.time}
                                                </div>

                                                {}
                                                <div>
                                                    <div>Театр по адресу:</div>
                                                    <div>{adress}</div>
                                                </div>

                                                {}
                                                <div className={styles.btw} onClick={() => openModalHallHandler(d.date)}>
                                                    5000₽ - 11000₽
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
