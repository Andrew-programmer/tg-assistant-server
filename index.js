require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const router = require('./router');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(cors());
app.use(express.json());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Please, fill the form.', {
            reply_markup: {
                keyboard: [
                    [{text: 'Fill form', web_app: {url: process.env.WEB_APP + process.env.FORM}}]
                ]

            }
        })

        await bot.sendMessage(chatId, 'Choose product.', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Give me one!', web_app: {url: process.env.WEB_APP}}]
                ]

            }
        })
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg.web_app_data.data);
            await bot.sendMessage(chatId, 'Thank you🥰');
            await bot.sendMessage(chatId, 'Your country: ' + data.country);
            await bot.sendMessage(chatId, 'Your address: ' + data.address);
            await bot.sendMessage(chatId, 'All info you will become in this chat');
        } catch (e) {
            console.log(e);
        }
    }
});

app.use('/web-data', router);

app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`))

module.exports = bot;
