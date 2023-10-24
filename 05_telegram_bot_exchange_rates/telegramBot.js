import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_TOKEN } from './config.js';

const telegramToken = process.env.TELEGRAM_TOKEN || TELEGRAM_TOKEN;

const bot = new TelegramBot(telegramToken, { polling: true });

export default bot;