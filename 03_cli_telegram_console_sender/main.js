process.env["NTBA_FIX_350"] = 1;
import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api'
import {TELEGRAM_TOKEN} from "./config.js";


const token = process.env.TELEGRAM_TOKEN ?? TELEGRAM_TOKEN

const program = new Command();
let bot = new TelegramBot(token, { polling: false });;

const main = async () => {
    program
        .version('1.0.0')
        .arguments('[cmd] [value]')
        .option('-h, --help', 'Display the cli usage guide')
        .action(async (cmd, value, options) => {
            if (options.help) {
                await displayHelp();
            } else {
                const chatId = await telegramInit();
                if (cmd === 'send-message') {
                    await sendMessage(chatId, value);
                } else if (cmd === 'send-photo') {
                    await sendPhoto(chatId, value);
                } else {
                    console.error('Invalid command.');
                }
            }
        })
    program.parse(process.argv);
}

const telegramInit = async() => {
    const updates = await bot.getUpdates();
    const chatId = updates[0].message.chat.id;
    return chatId
}

const sendMessage = async (chatId, message) => {
    return await bot.sendMessage(chatId, message);
}


const displayHelp = async() => {
    console.log("Usage: main [options] <cmd> [value]\n");
    console.log("Options:");
    console.log("  -V, --version                   Output the version number.");
    console.log("  -h, --help                      Display the CLI usage guide.");
    console.log("\nCommands:");
    console.log("  send-message <message>        Send a message to the Telegram bot.");
    console.log("  send-photo <path>             Send a photo to the Telegram bot.\n");
}


const sendPhoto = async(chatId, photoPath) => {
    try {
        await bot.sendPhoto(chatId, photoPath);
        console.log('Photo was successfully sent!');
    } catch (error) {
        console.error('Error while sending photo:', error);
    }
}

await main()
