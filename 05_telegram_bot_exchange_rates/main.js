import bot from "./telegramBot.js";
import menu from './telegramMenu.js'
import ratesService from "./RatesService.js";
import {visualizeRatesData} from "./visualizationUtils.js";

const getMonobankAndPrivatBankRates = async(chatId, currency) => {
    const monobankRates = await ratesService.getMonobankRates(currency)
    const privatBankRates = await ratesService.getPrivatBankRates(currency)
    await bot.sendMessage(chatId, await visualizeRatesData(monobankRates, 'Monobank | cashless'), {parse_mode : 'HTML'})
    await bot.sendMessage(chatId, await visualizeRatesData(privatBankRates, 'PrivatBank | cashless'), {parse_mode : 'HTML'} )
}

const main = async () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        switch (msg.text) {
            case '/start':
                await menu.chooseCurrencyMenu(chatId);
                break;
            case 'USD':
                await getMonobankAndPrivatBankRates(chatId, msg.text)
                break;
            case 'EUR':
                await getMonobankAndPrivatBankRates(chatId, msg.text)
                break;
        }
    });
};

await main();
