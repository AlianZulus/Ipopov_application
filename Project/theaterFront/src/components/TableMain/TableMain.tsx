// @ts-nocheck
import React, {useState} from 'react';
import styles from './TableMain.module.css'
import {Table} from "../Table/Table";
import {Filter} from "../Filter/Filter";
import {TableTwo} from "../TableTwo/TableTwo";

import OpenTable from '../../assets/icons/openTable.svg'
import {data} from "../../assets/data/table";

export const TableMain = ( ) => {
    const [table] = useState(data);
    const [open, setOpen] = useState(false);

    const openTable = () => {
        setOpen(true);
    }
    const closeTable = () => {
        setOpen(false);
    }

    const datas = [
        { date: '31.10.2024', shipment:'', railRoad: 26814, pipe: 4237, mnpp: 9861, water: '', emissions: 34884, production: 169408, remainingFirst: 126737, capacity: 143384, unprocessedShipment: 9044 },
        { date: '01.11.2024', shipment: 40911, railRoad: 26814, pipe: 0, mnpp: 9861, water: '', emissions: 34017, production: 171663, remainingFirst: 87610, capacity: 147032, unprocessedShipment: 6458 },
        { date: '02.11.2024', shipment: '', railRoad: 26814, pipe: 0, mnpp: 9861, water: '', emissions: 40715, production: 168593, remainingFirst: 84540, capacity: 162990, unprocessedShipment: '' },
        { date: '03.11.2024', shipment: 43354, railRoad: 26814, pipe:0 , mnpp: 9861, water: '', emissions: 40715, production: 170323, remainingFirst: 86270, capacity: 161260, unprocessedShipment: '' },
        { date: '04.11.2024', shipment: 43553, railRoad: 26814, pipe: 0, mnpp: 9861, water: '', emissions: 40715, production: 168553, remainingFirst: 84500, capacity: 163030, unprocessedShipment: '' },
        { date: '05.11.2024', shipment: 36054, railRoad: 19954, pipe: 0, mnpp: 9861, water: 13600, emissions: 40715, production: 162183, remainingFirst: 78130, capacity: 169400, unprocessedShipment: '' },
        { date: '06.11.2024', shipment: 39854, railRoad: 24154, pipe: 0, mnpp: 9800, water: 9600, emissions: 40715, production: 155613, remainingFirst: 71560, capacity: 175970, unprocessedShipment: '' },
        { date: '07.11.2024', shipment: 39854, railRoad: 16354, pipe: 0, mnpp: 9800, water: 9900, emissions: 40715, production: 156543, remainingFirst: 72490, capacity: 175040, unprocessedShipment: '' },
        { date: '08.11.2024', shipment: 33954, railRoad: 24154, pipe: 0, mnpp: 9800, water: 9500, emissions: 40715, production: 153673, remainingFirst: 69620, capacity: 177910, unprocessedShipment: '' },
        { date: '09.11.2024', shipment: 29754, railRoad: 19954, pipe: 0, mnpp: 9800, water: 10100, emissions: 39715, production: 149803, remainingFirst: 65750, capacity: 181780, unprocessedShipment: '' },
        { date: '10.11.2024', shipment: 38754, railRoad: 24154, pipe: 0, mnpp: 9800, water: '', emissions: 39706, production: 151824, remainingFirst: 67771, capacity: 179759, unprocessedShipment: '' },
        { date: '11.11.2024', shipment: 35354, railRoad: 19954, pipe: 0, mnpp: 9800, water: '', emissions: 39584, production: 157923, remainingFirst: 73870, capacity: 173660, unprocessedShipment: '' },
        { date: '12.11.2024', shipment: 40054, railRoad: 24154, pipe: 0, mnpp: 9800, water: 4800, emissions: 38932, production: 154370, remainingFirst: 70317, capacity: 177213, unprocessedShipment: '' },
        { date: '13.11.2024', shipment: 34054, railRoad: 20354, pipe: 0, mnpp: 9800, water: 5200, emissions: 37517, production: 152802, remainingFirst: 68749, capacity: 178781, unprocessedShipment: '' },
        { date: '14.11.2024', shipment: 40254, railRoad: 24154, pipe: 0, mnpp: 9800, water: 6100, emissions: 36987, production: 146004, remainingFirst: 61951, capacity: 185579, unprocessedShipment: '' },
        { date: '15.11.2024', shipment: 29754, railRoad: 19954, pipe: 0, mnpp: 9800, water: 4300, emissions: 36987, production: 145206, remainingFirst: 61153, capacity: 186377, unprocessedShipment: '' },
        { date: '16.11.2024', shipment: 33954, railRoad: 24154, pipe: 0, mnpp: 9800, water: 6300, emissions: 36987, production: 138208, remainingFirst: 54155, capacity: 193375, unprocessedShipment: '' },
        { date: '17.11.2024', shipment: 40757, railRoad: 19954, pipe: 0, mnpp: 9800, water: '', emissions: 36987, production: 141710, remainingFirst: 57657, capacity: 189873, unprocessedShipment: '' },
        { date: '18.11.2024', shipment: 28154, railRoad: 24154, pipe: 0, mnpp: 9800, water: '', emissions: 36987, production: 141012, remainingFirst: 56959, capacity: 190571, unprocessedShipment: '' },
        { date: '19.11.2024', shipment: 41152, railRoad: 16354, pipe: 0, mnpp: 9800, water: 14600, emissions: 36987, production: 133514, remainingFirst: 49461, capacity: 198069, unprocessedShipment: '' },
        { date: '20.11.2024', shipment: 41154, railRoad: 19954, pipe: 0, mnpp: 9000, water: 4800, emissions: 36993, production: 133022, remainingFirst: 48969, capacity: 198561, unprocessedShipment: '' },
        { date: '21.11.2024', shipment: 31554, railRoad: 24154, pipe: 0, mnpp: 8200, water: '', emissions: 38023, production: 134960, remainingFirst: 50907, capacity: 196623, unprocessedShipment: '' },
        { date: '22.11.2024', shipment: 27354, railRoad: 24154, pipe: 0, mnpp: 8200, water: 5100, emissions: 38023, production: 131798, remainingFirst: 47745, capacity: 199785, unprocessedShipment: '' },
        { date: '23.11.2024', shipment: 30954, railRoad: 19954, pipe: 0, mnpp: 8200, water: '', emissions: 38023, production: 137936, remainingFirst: 53883, capacity: 193647, unprocessedShipment: '' },
        { date: '24.11.2024', shipment: 35064, railRoad: 20354, pipe: 0, mnpp: 10500, water: 10100, emissions: 38023, production: 131074, remainingFirst: 47021, capacity: 200509, unprocessedShipment: '' },
        { date: '25.11.2024', shipment: 30954, railRoad: 20354, pipe: 0, mnpp: 11000, water: '', emissions: 38023, production: 134012, remainingFirst: 49959, capacity: 197571, unprocessedShipment: '' },
        { date: '26.11.2024', shipment: 35064, railRoad: 16354, pipe: 0, mnpp: 11000, water: '', emissions: 38023, production: 140950, remainingFirst: 56897, capacity: 190633, unprocessedShipment: '' },
        { date: '27.11.2024', shipment: 40054, railRoad: 20354, pipe: 0, mnpp: 11000, water: '', emissions: 38023, production: 143688, remainingFirst: 59635, capacity: 187895, unprocessedShipment: '' },
        { date: '28.11.2024', shipment: 30954, railRoad: 19954, pipe: 0, mnpp: 11000, water: '', emissions: 38023, production: 147026, remainingFirst: 62973, capacity: 184557, unprocessedShipment: '' },
        { date: '29.11.2024', shipment: 35064, railRoad: 24154, pipe: 0, mnpp: 11000, water: '', emissions: 38023, production: 146254, remainingFirst: 62201, capacity: 185329, unprocessedShipment: '' },
        { date: '30.11.2024', shipment: 31347, railRoad: 20347, pipe: 0, mnpp: 11000, water: '', emissions: 38018, production: 149194, remainingFirst: 65141, capacity: 182389, unprocessedShipment: '' },
        { date: 'Всего', shipment: 960718, railRoad: 579121, pipe: 4237, mnpp: 266961, water: 110400, emissions: 1188500, production: 341071, remainingFirst: 214347, capacity: 290416, unprocessedShipment: 15502 },
    ];


    return (
        <div style={{padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%'}}>
                    <h1>
                        Прогноз по отгрузке продуктов
                    </h1>
                   <img    onClick={openTable}  src={OpenTable} alt={'openTable'}/>
                </div>
            </div>
            <div>
                <Filter/>
            </div>
            <div className={styles.tableResponsive}>
                <Table data={datas}/>
                {open && <TableTwo table={table} closeTable={closeTable}/>}
            </div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                }}>
                    <div
                        style={{
                        borderRadius: 10,
                        border: '1px solid grey',
                        padding: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        cursor: 'pointer'
                    }}>
                        Сохранить
                    </div>
                </div>
            </div>

            );
            };

