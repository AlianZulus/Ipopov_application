// @ts-nocheck
import React, { useState } from 'react';
import styles from "../TableMain/TableMain.module.css";
import Edit from '../../assets/icons/edit.svg'


interface RowData {
    date: string;
    shipment: string;
    railRoad: string;
    pipe: number;
    mnpp: string;
    water: string;
    emissions: string;
    production: string;
    remainingFirst: string;
    capacity: string;
    unprocessedShipment: string;
}

interface TableProps {
    data: RowData[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
    const [tableData, setTableData] = useState<RowData[]>(data);
    const [editColumn, setEditColumn] = useState<keyof RowData | null>(null);

    const handleDoubleClick = (key: keyof RowData) => {
        setEditColumn(key);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, key: keyof RowData) => {
        const newValue = e.target.value;
        setTableData(prevData => {
            const updatedData = [...prevData];
            updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: newValue };
            return updatedData;
        });
    };

    const exitEditMode = () => {
        setEditColumn(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            exitEditMode();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, startRowIndex: number, key: keyof RowData) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData('Text');
        const pastedRows = clipboardData.split(/\r\n|\n|\r/);

        setTableData(prevData => {
            const updatedData = [...prevData];
            for (let i = 0; i < pastedRows.length; i++) {
                const rowIndex = startRowIndex + i;
                if (rowIndex < updatedData.length) {
                    updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: pastedRows[i] };
                } else {
                    break;
                }
            }
            return updatedData;
        });
    };
    const columns = [
        { key: 'date', label: 'Дата' },
        { key: 'shipment', label: 'Отгрузка' },
        { key: 'railRoad', label: 'Ж/Д' },
        { key: 'pipe', label: 'Труба' },
        { key: 'mnpp', label: 'МНПП' },
        { key: 'water', label: 'Вода' },
        { key: 'emissions', label: 'Выроботка' },
        { key: 'production', label: 'Остатки (товар*компонент)' },
        { key: 'remainingFirst', label: 'Остатки (паспорт)' },
        { key: 'capacity', label: 'Своб. емкость' },
        { key: 'unprocessedShipment', label: 'Неоформл. отгрузка' },
    ];

    return (
        <table className={styles.dataTable}>
            <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.key} onClick={() => handleDoubleClick(column.key)}>
                        {column.label} <img src={Edit} alt={'edit'}/>
                        {editColumn === column.key && (
                            <button onClick={(e) => { e.stopPropagation(); exitEditMode(); }}>&times;</button>
                        )}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map(column => {
                        const cellKey = column.key as keyof RowData;
                        const isEditable = editColumn === cellKey;
                        const cellValue = row[cellKey];

                        let cellStyle = {};
                        if (cellKey === 'railRoad' || cellKey === 'pipe' || cellKey === 'mnpp') {
                            cellStyle = { backgroundColor: 'rgba(234,60,60,0.22)' };
                        } else if (cellKey === 'water') {
                            cellStyle = { backgroundColor: 'rgba(108,193,58,0.18)' };
                        } else if (cellKey === 'emissions') {
                            cellStyle = { backgroundColor: 'rgba(52,121,213,0.22)' };
                        }

                        return (
                            <td key={cellKey} style={cellStyle}>
                                {isEditable ? (
                                    <input
                                        type="text"
                                        onPaste={(e) => handlePaste(e, rowIndex, cellKey)}
                                        value={cellValue}
                                        onChange={(e) => handleChange(e, rowIndex, cellKey)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus={rowIndex === 0}
                                        className={styles.inputField}
                                    />
                                ) : (
                                    cellValue
                                )}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};