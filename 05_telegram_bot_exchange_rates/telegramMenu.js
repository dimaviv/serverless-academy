import bot from "./telegramBot.js";
import {exchangeCurrencies} from "./config.js";


class TelegramMenu{

    async chooseCurrencyMenu (chatId, currencies = exchangeCurrencies){
        try {
            await this.sendKeyboard(chatId, 'Choose an option:', currencies);
        }catch (e) {
            console.error(e)
        }
    }

    async sendKeyboard (chatId, text, keyboards, options) {
        try {
            const keyboard = keyboards.map(keyboard => [keyboard])
            const defaultOptions = {
                reply_markup: {
                    keyboard,
                    resize_keyboard: true,
                },
            };
            const mergedOptions = { ...defaultOptions, ...options };
            await bot.sendMessage(chatId, text, mergedOptions);
        }catch (e) {
            console.error(e)
        }

    };
}

export default new TelegramMenu()