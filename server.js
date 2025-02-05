const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware для обработки JSON
app.use(bodyParser.json());

// Обслуживаем статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработчик POST-запроса с сайта
app.post('/send-response', (req, res) => {
    const { firstName, lastName, isAttending } = req.body;

    // Формируем сообщение
    const message = `Гость: ${firstName} ${lastName}\nПрисутствие: ${isAttending ? 'Будет' : 'Не сможет'}`;

    // Отправляем сообщение в Telegram
    axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.CHAT_ID,
        text: message,
    })
    .then(response => {
        console.log('Сообщение отправлено:', response.data);
        res.status(200).send('Сообщение отправлено');
    })
    .catch(error => {
        console.error('Ошибка отправки сообщения:', error);
        res.status(500).send('Ошибка отправки сообщения');
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});