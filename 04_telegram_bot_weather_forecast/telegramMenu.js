import bot from "./telegramBot.js";

class TelegramMenu{

    async mainMenu (chatId, city){
        await this.sendKeyboard(chatId, 'Choose an option:', ['Forecast in ' + city]);
    }

    async secondaryMenu (chatId){
        await this.sendKeyboard(chatId, 'Choose an option:', ['at intervals of 3 hours', 'at intervals of 6 hours', '<-- BACK']);
    }

    async sendKeyboard (chatId, text, keyboards, options) {
        const keyboard = keyboards.map(keyboard => [keyboard])
        const defaultOptions = {
            reply_markup: {
                keyboard,
                resize_keyboard: true,
            },
        };
        const mergedOptions = { ...defaultOptions, ...options };
        await bot.sendMessage(chatId, text, mergedOptions);
    };
}

export default new TelegramMenu()