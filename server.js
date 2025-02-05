const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Добавьте эту строку

const app = express();
const PORT = 3000;

// Разрешаем CORS
app.use(cors()); // Добавьте эту строку

// Токен вашего бота
const BOT_TOKEN = '7654180574:AAHg9srd48qA02ppgYmHwF9CRixrifFA32w';
// Ваш ID в Telegram (узнать можно у бота @userinfobot)
const CHAT_ID = '6013048188';

// Middleware для обработки JSON
app.use(bodyParser.json());

// Обработчик POST-запроса с сайта
app.post('/send-response', (req, res) => {
    const { firstName, lastName, isAttending } = req.body;

    // Формируем сообщение
    const message = `Гость: ${firstName} ${lastName}\nПрисутствие: ${isAttending ? 'Будет' : 'Не сможет'}`;

    // Отправляем сообщение в Telegram
    axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
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