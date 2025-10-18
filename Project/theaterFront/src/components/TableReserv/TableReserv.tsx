import React, {useEffect, useState} from 'react';
import styles from './TableReserv.module.css';
import {TableCircleIcon} from "../../assets/icons/hall/TableCircleIcon";
import {TableSquareIcon} from "../../assets/icons/hall/TableSquareIcon";
import {MyModal} from "../Modals/ModalWarn/ModalWarn";

export interface TableItem {
    id: number | string;
    type: 'table' | 'decor';
    shape?: 'square' | 'circle';
    x: number;
    y: number;
    label?: string;
    rotation?: number;
    imageUrl?: string;

}

export const hallLayout: TableItem[] = [
    {id: 1, type: 'table', shape: 'square', x: 50, y: 50, label: '1'},
    {id: 2, type: 'table', shape: 'square', x: 190, y: 50, label: '2'},
    {id: 3, type: 'table', shape: 'square', x: 330, y: 50, label: '3'},
    {id: 4, type: 'table', shape: 'square', x: 470, y: 50, label: '4'},
    {id: 5, type: 'table', shape: 'square', x: 50, y: 220, label: '5'},
    {id: 6, type: 'table', shape: 'square', x: 190, y: 220, label: '6'},
    {id: 7, type: 'table', shape: 'square', x: 330, y: 220, label: '7'},
    {id: 9, type: 'table', shape: 'square', x: 470, y: 220, label: '8'},
    {id: 10, type: 'table', shape: 'square', x: 320, y: 420, label: '9', rotation: 90},
    {id: 11, type: 'table', shape: 'square', x: 480, y: 420, label: '10', rotation: 90},
    {id: 12, type: 'table', shape: 'square', x: 720, y: 450, label: '11', rotation: 90},

    {id: 13, type: 'table', shape: 'circle', x: 780, y: 50, label: '12'},
    {id: 14, type: 'table', shape: 'circle', x: 780, y: 175, label: '13',},
    {id: 15, type: 'table', shape: 'circle', x: 670, y: 175, label: '14',},
    {id: 16, type: 'table', shape: 'circle', x: 670, y: 50, label: '15',},
    {id: 17, type: 'table', shape: 'circle', x: 670, y: 300, label: '16',},
    {id: 18, type: 'table', shape: 'circle', x: 780, y: 300, label: '17',},
    {id: 19, type: 'table', shape: 'circle', x: 160, y: 485, label: '18',},
    {id: 20, type: 'table', shape: 'circle', x: 40, y: 420, label: '19',},
    {id: 24, type: 'table', shape: 'circle', x: 160, y: 360, label: '20',},

    {id: 'treeA', type: 'decor', x: 600, y: 80, imageUrl: ''},
];

export interface TableReservProps {
    isClose?: () => void
}

export interface TableReservProps {
    isClose?: () => void
    setShowModal: (value: boolean) => void
    showModal: boolean
    setIsModalOpen: any
    setSelectedDate:any
    selectedDate:any
    pendingTables:any
    setPendingTables:any
    showTwo:any
    setShowTwo:any
    reservedTables:any
    setReservedTables:any
    handleTableClick:any
    confirmReservation:any
    isReservationDisabled:any


}

export const TableReserv = ({isClose,isReservationDisabled, handleTableClick,confirmReservation, setShowModal, showModal, setIsModalOpen,setReservedTables,reservedTables,setShowTwo,showTwo,setPendingTables,pendingTables,selectedDate,setSelectedDate}: TableReservProps) => {



    const today = new Date().toISOString().split('T')[0];
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div style={{marginBottom: 10}}>
                    <label style={{fontSize: 22}}>Выберите дату: </label>
                    <input
                        type="date"
                        value={selectedDate}
                        min={today}
                        onChange={e => setSelectedDate(e.target.value)}
                        style={{
                            fontSize: '18px',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: '#d5d0d0',
                            color: '#333',
                            border: '2px solid #333',

                        }}
                    />
                </div>
                {selectedDate.length !== 0 ? <button className={styles.btw} onClick={confirmReservation} style={{marginBottom: 10}}>
                    Забронировать
                </button> : ''}



                <button className={styles.btw} onClick={isClose}>Закрыть</button>
                {showModal  && (
                    <MyModal
                        onClose={() => setShowModal(false)}
                        text="Нельзя забронировать больше 2-х столов"
                    />
                )}
                {showTwo  && (
                    <MyModal
                        onClose={() => setShowTwo(false)}
                        text="Выберите хотя бы один свободный стол"
                    />
                )}

                {selectedDate.length !== 0 ?
                    <div className={styles.restaurantHall}>             {hallLayout.map(item => {
                        const {id, type, shape, x, y, label, rotation} = item;
                        if (type === 'table' && typeof id === 'number') {
                            const isReserved = reservedTables.includes(id);
                            const isPending = pendingTables.includes(id);

                            let fillColor = '#249737';
                            if (isReserved) fillColor = '#ce587b';
                            else if (isPending) fillColor = 'orange';

                            return (
                                <div
                                    key={id}
                                    style={{
                                        position: 'absolute',
                                        left: x,
                                        top: y,
                                        transform: `rotate(${rotation || 0}deg)`,
                                        cursor: isReserved ? 'default' : 'pointer'
                                    }}
                                    onClick={() => handleTableClick(id)}
                                >
                                    {shape === 'circle' ? (
                                        <TableCircleIcon fill={fillColor}/>
                                    ) : (
                                        <TableSquareIcon fill={fillColor}/>
                                    )}
                                    <div className={styles.tableLabel}>{label}</div>
                                </div>
                            );
                        } else if (type === 'decor') {
                            return (
                                <div
                                    key={id}
                                    style={{position: 'absolute', left: x, top: y}}
                                >
                                    {}
                                </div>
                            );
                        }
                        return null;
                    })} </div> : ''}


            </div>
        </div>
    );
};