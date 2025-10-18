
const express = require('express');
const cors = require('cors');
const db = require('./database');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/drinks', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM drinks');
        const drinks = stmt.all();
        res.json(drinks);
    } catch (error) {
        console.error('Ошибка при получении drinks:', error);
        res.status(500).json({ error: 'Не удалось получить список напитков' });
    }
});

app.get('/addition', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM addition');
        const additions = stmt.all();
        res.json(additions);
    } catch (error) {
        console.error('Ошибка при получении additions:', error);
        res.status(500).json({ error: 'Не удалось получить список additions' });
    }
});

app.post('/addition', (req, res) => {
    const { additionName, cost, quantity } = req.body;
    if (!additionName || typeof cost !== 'number' || typeof quantity !== 'number') {
        return res.status(400).json({ error: 'Некорректные данные для добавления дополнения.' });
    }
    try {
        const stmt = db.prepare('INSERT INTO addition (additionName, cost, quantity) VALUES (?, ?, ?)');
        const result = stmt.run(additionName, cost, quantity);
        res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
        console.error('Ошибка при добавлении дополнения:', error);
        res.status(500).json({ error: 'Не удалось добавить дополнение.' });
    }
});

app.put('/addition/:id', (req, res) => {
    const { id } = req.params;
    const { additionName, cost, quantity } = req.body;
    if (!additionName || typeof cost !== 'number' || typeof quantity !== 'number') {
        return res.status(400).json({ error: 'Некорректные данные для обновления дополнения.' });
    }
    try {
        const stmt = db.prepare('UPDATE addition SET additionName = ?, cost = ?, quantity = ? WHERE id = ?');
        const result = stmt.run(additionName, cost, quantity, id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Дополнение не найдено.' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка при обновлении дополнения:', error);
        res.status(500).json({ error: 'Не удалось обновить дополнение.' });
    }
});

app.delete('/addition/:id', (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM addition WHERE id = ?');
        const result = stmt.run(id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Дополнение не найдено.' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка при удалении дополнения:', error);
        res.status(500).json({ error: 'Не удалось удалить дополнение.' });
    }
});

app.get('/food', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM food');
        const foods = stmt.all();
        res.json(foods);
    } catch (error) {
        console.error('Ошибка при получении food:', error);
        res.status(500).json({ error: 'Не удалось получить список блюд' });
    }
});

app.put('/food/:id', (req, res) => {
    const { id } = req.params;
    const { cost } = req.body;
    if (typeof cost !== 'number' || cost < 0) {
        return res.status(400).json({ error: 'Некорректная стоимость' });
    }
    try {
        const stmt = db.prepare('UPDATE food SET cost = ? WHERE id = ?');
        const result = stmt.run(cost, id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Блюдо не найдено' });
        }
        res.json({ success: true, updatedCost: cost });
    } catch (error) {
        console.error('Ошибка при обновлении стоимости блюда:', error);
        res.status(500).json({ error: 'Не удалось обновить стоимость блюда' });
    }
});

app.put('/drinks/:id', (req, res) => {
    const { id } = req.params;
    const { cost } = req.body;
    if (typeof cost !== 'number' || cost < 0) {
        return res.status(400).json({ error: 'Некорректная стоимость' });
    }
    try {
        const stmt = db.prepare('UPDATE drinks SET cost = ? WHERE id = ?');
        const result = stmt.run(cost, id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Напиток не найден' });
        }
        res.json({ success: true, updatedCost: cost });
    } catch (error) {
        console.error('Ошибка при обновлении стоимости напитка:', error);
        res.status(500).json({ error: 'Не удалось обновить стоимость напитка' });
    }
});

app.get('/spectacles', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM spectacles');
        const rows = stmt.all();
        const spectacles = rows.map(row => ({
            id: row.id,
            icons: row.icons,
            age: row.age,
            hall: JSON.parse(row.hall),
            dates: JSON.parse(row.dates),
            adress: JSON.parse(row.adress),
            title: row.title,
            comment: row.comment,
            reservedSeats: row.reservedSeats ? JSON.parse(row.reservedSeats) : {}
        }));
        res.json(spectacles);
    } catch (error) {
        console.error('Ошибка при получении spectacles:', error);
        res.status(500).json({ error: 'Не удалось получить список спектаклей' });
    }
});

app.post('/spectacles', (req, res) => {
    try {
        const {
            id,
            icons,
            age,
            hall,
            dates,
            adress,
            title,
            comment,
            reservedSeats
        } = req.body;
        const hallJSON = JSON.stringify(hall);
        const datesJSON = JSON.stringify(dates);
        const adressJSON = JSON.stringify(adress);
        const reservedSeatsJSON = reservedSeats ? JSON.stringify(reservedSeats) : '{}';
        const stmt = db.prepare(`
            INSERT INTO spectacles (id, icons, age, hall, dates, adress, title, comment, reservedSeats)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(id, icons, age, hallJSON, datesJSON, adressJSON, title, comment, reservedSeatsJSON);
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка при добавлении spectacles:', error);
        res.status(500).json({ error: 'Не удалось добавить спектакль' });
    }
});

app.put('/spectacles/:id/seats', (req, res) => {
    try {
        const { id } = req.params;
        const { updatedSeats } = req.body;
        if (!Array.isArray(updatedSeats)) {
            return res.status(400).json({ error: 'updatedSeats должно быть массивом' });
        }
        const spectacleStmt = db.prepare('SELECT hall FROM spectacles WHERE id = ?');
        const spectacle = spectacleStmt.get(id);
        if (!spectacle) {
            return res.status(404).json({ error: 'Спектакль не найден' });
        }
        const hall = JSON.parse(spectacle.hall);
        updatedSeats.forEach(({ row, seatNumber }) => {
            const seat = hall.flat().find(
                seatItem => seatItem.row === row && seatItem.seatNumber === seatNumber
            );
            if (seat) {
                seat.reserved = true;
            }
        });
        const updateStmt = db.prepare('UPDATE spectacles SET hall = ? WHERE id = ?');
        updateStmt.run(JSON.stringify(hall), id);
        res.json({ success: true, updatedSeats });
    } catch (error) {
        console.error('Ошибка при обновлении мест (hall):', error);
        res.status(500).json({ error: 'Не удалось обновить места' });
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 587,
    secure: false,
    auth: {
        user: 'teartmpscow@yandex.com',
        pass: 'glndlssasaeczwmu',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

app.post('/sendmail', async (req, res) => {
    const { userEmail, cart, grandTotal, tableNumbers } = req.body;

    if (!userEmail || !Array.isArray(cart) || typeof grandTotal !== 'number') {
        return res.status(400).json({ error: 'Поля userEmail, cart и grandTotal обязательны!' });
    }

    const spectacles = cart.filter(item =>
        item.title && item.date && item.row && item.seatNumber && item.costPlace
    );
    const foodItems = cart.filter(item =>
        item.comment && item.quantity && item.cost
    );
    const drinks = cart.filter(item =>
        item.drinkName && item.quantity && item.cost
    );
    const additions = cart.filter(item =>
        item.additionName && item.cost && item.quantity
    );

    const formatTableRows = (items, type) => {
        return items.map(item => {
            if (type === 'spectacles') {
                return `
                    <tr>
                        <td>${item.title}</td>
                        <td>${item.date}</td>
                        <td>${item.row}</td>
                        <td>${item.seatNumber}</td>
                        <td>${item.costPlace.toFixed(2)} ₽</td>
                    </tr>
                `;
            } else if (type === 'food') {
                return `
                    <tr>
                        <td>${item.comment}</td>
                        <td>${item.quantity}</td>
                        <td>${item.cost.toFixed(2)} ₽</td>
                    </tr>
                `;
            } else if (type === 'drinks') {
                return `
                    <tr>
                        <td>${item.drinkName}</td>
                        <td>${item.quantity}</td>
                        <td>${item.cost.toFixed(2)} ₽</td>
                    </tr>
                `;
            } else if (type === 'additions') {
                return `
                    <tr>
                        <td>${item.additionName}</td>
                        <td>${item.quantity}</td>
                        <td>${item.cost.toFixed(2)} ₽</td>
                    </tr>
                `;
            }
            return '';
        }).join('');
    };

    const tableNumbersHTML = Array.isArray(tableNumbers) && tableNumbers.length > 0
        ? `<h3>Резерв столов:</h3>
           <ul>
               ${tableNumbers.map(num => `<li>Стол №${num}</li>`).join('')}
           </ul>`
        : '<h3>Резерв столов:</h3><p>Нет забронированных столов</p>';

    const emailHTML = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
            <h2 style="text-align: center; color: #555;">Спасибо за ваш заказ!</h2>
            <p>Ваши покупки:</p>
            ${spectacles.length > 0 ? `
                <h3>Спектакли</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Название</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Дата</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Ряд</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Место</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formatTableRows(spectacles, 'spectacles')}
                    </tbody>
                </table>
            ` : ''}
            ${foodItems.length > 0 ? `
                <h3>Блюда</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Название</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Количество</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formatTableRows(foodItems, 'food')}
                    </tbody>
                </table>
            ` : ''}
            ${drinks.length > 0 ? `
                <h3>Напитки</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Название</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Количество</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formatTableRows(drinks, 'drinks')}
                    </tbody>
                </table>
            ` : ''}
            ${additions.length > 0 ? `
                <h3>Дополнительно</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Название</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Количество</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formatTableRows(additions, 'additions')}
                    </tbody>
                </table>
            ` : ''}
            ${tableNumbersHTML}
            <h3 style="text-align: right;">Итого: ${grandTotal.toFixed(2)} ₽</h3>
            <p>С уважением,<br/>The theatre begins with the buffet.</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: '"Театр" <teartmpscow@yandex.com>',
            to: userEmail,
            subject: 'Ваш заказ в Театре',
            html: emailHTML,
        });
        console.log(`Письмо отправлено на адрес: ${userEmail}`);
        res.json({ success: true, message: `Письмо отправлено на ${userEmail}` });
    } catch (error) {
        console.error('Ошибка при отправке письма:', error);
        res.status(500).json({ error: 'Ошибка при отправке письма.' });
    }
});


app.get('/reservations', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'date is required' });
    }
    try {
        const rows = db.prepare(`
            SELECT tableId
            FROM reservations
            WHERE date = ? AND isReserved = 1
        `).all(date);
        const reservedTables = rows.map(r => r.tableId);
        return res.json({ reservedTables });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

app.post('/reserve', (req, res) => {
    const { tableId, date } = req.body;
    if (!tableId || !date) {
        return res.status(400).json({ error: 'tableId and date are required' });
    }
    try {
        const row = db.prepare(`
            SELECT COUNT(*) as count
            FROM reservations
            WHERE tableId = ? AND date = ? AND isReserved = 1
        `).get(tableId, date);
        if (row.count > 0) {
            return res.status(400).json({ error: 'Table is already reserved on that date' });
        }
        const info = db.prepare(`
            INSERT INTO reservations (date, tableId, isReserved)
            VALUES (?, ?, 1)
        `).run(date, tableId);
        return res.json({ success: true, reservationId: info.lastInsertRowid });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

app.post('/unreserve', (req, res) => {
    const { tableId, date } = req.body;
    if (!tableId || !date) {
        return res.status(400).json({ error: 'tableId and date are required' });
    }
    try {
        const info = db.prepare(`
            DELETE FROM reservations
            WHERE tableId = ? AND date = ?
        `).run(tableId, date);
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'test' && password === 'test') {
        return res.json({ success: true });
    }
    return res.status(401).json({ error: 'Неверный логин или пароль' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
