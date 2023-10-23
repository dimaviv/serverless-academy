import bot from "./telegramBot.js";
import menu from './telegramMenu.js'
import {CITY} from "./config.js";
import weatherService from "./weatherService.js";
import { visualizeForecastDataArray} from "./visualizationUtils.js";



const main = async () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;

        switch (msg.text) {
            case '/start':
                await menu.mainMenu(chatId, CITY);
                break;
            case 'Forecast in ' + CITY:
                await menu.secondaryMenu(chatId);
                break;
            case 'at intervals of 3 hours':
            case 'at intervals of 6 hours':
                try {
                    const interval = parseInt(msg.text.split(' ')[3]);
                    const forecastData = await weatherService.getForecastByCity(CITY, 3, interval);
                    const formattedForecastArray = await visualizeForecastDataArray(forecastData);

                    for (const day of formattedForecastArray) {
                        await bot.sendMessage(chatId, day, { parse_mode: 'HTML' });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    await menu.sendKeyboard(chatId, 'An error occurred. Please try again later.');
                }
                break;
            case '<-- BACK':
                await menu.mainMenu(chatId, CITY);
                break;
        }
    });
};

await main();
