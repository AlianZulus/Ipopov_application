import React from 'react';
import styles from './TableTwo.module.css'

export const Indicators = () => {
    const tablesData = [
        {
            title: "Отклонение ожидаемых показателей от плана выше 3000 т.",
            sections: [
                {
                    name: "Производство",
                    rows: [
                        { product: "ДТ кл.1", plan: "99 810", actual: "80 981", delta: "-18 829" },
                        { product: "Мазут", plan: "158 065", actual: "150 201", delta: "-7 864" },
                        { product: "АИ-92", plan: "76 581", actual: "70 754", delta: "-5 827" },
                        { product: "ВГО", plan: "53 159", actual: "50 042", delta: "-3 117" },
                    ],
                },
                {
                    name: "Отгрузка",
                    rows: [
                        { product: "ДТ сорт", plan: "511 596", actual: "408 537", delta: "-103 059" },
                        { product: "Мазут", plan: "206 396", actual: "178 709", delta: "-27 687" },
                        { product: "Нефть", plan: "87 803", actual: "67 293", delta: "-20 510" },
                        { product: "АИ-95", plan: "100 526", actual: "80 675", delta: "-19 851" },
                    ],
                },
            ],
        },
        {
            title: "Наличие паспортного продукта ниже 0",
            sections: [
                {
                    name: "Производство",
                    rows: [
                        { product: "СУГ", date: "28 ноя", passport: "-125" },
                        { product: "СУГ", date: "29 ноя", passport: "-203" },
                        { product: "СУГ", date: "30 ноя", passport: "-170" },
                        { product: "Мазут", date: "29 ноя", passport: "-1 389" },
                    ],
                },
            ],
        },
        {
            title: "Освоение в/ц (общее, по темным, по светлым) ниже 0",
            sections: [
                {
                    name: "Общее",
                    rows: [
                        { date: "30 ноя", освоение: "-384" },
                        { date: "29 ноя", освоение: "-446" },
                        { date: "27 ноя", освоение: "-387" },
                        { date: "26 ноя", освоение: "-48" },
                    ],
                },
                {
                    name: "Светлые",
                    rows: [
                        { date: "30 ноя", освоение: "-331" },
                        { date: "29 ноя", освоение: "-321" },
                        { date: "27 ноя", освоение: "-261" },
                        { date: "26 ноя", освоение: "-17" },
                    ],
                },
                {
                    name: "Темные",
                    rows: [
                        { date: "30 ноя", освоение: "-51" },
                        { date: "29 ноя", освоение: "-121" },
                        { date: "27 ноя", освоение: "-121" },
                        { date: "26 ноя", освоение: "-33" },
                    ],
                },
            ],
        },
    ];

    return (
        <div className={styles.dashboard}>
            {tablesData.map((table, index) => (
                <div key={index} className={styles.tableContainer}>
                    <h3>{table.title}</h3>
                    {table.sections.map((section, secIndex) => (
                        <div key={secIndex} className={styles.section}>
                            <h4>{section.name}</h4>
                            <table>
                                <thead>
                                <tr>
                                    {Object.keys(section.rows[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {section.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((value, cellIndex) => (
                                            <td key={cellIndex}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

