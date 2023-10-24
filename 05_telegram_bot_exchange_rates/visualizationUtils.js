
export const visualizeRatesData = async (data, caption) => {
    try {
        let result = '';
        result += `<b>${caption}</b>\n\n`
        data.forEach(item => {
            result += `<b>${item.currencyA} --- ${item.currencyB}</b>\n`;
            result += `Buy: ${item.buy}\n`;
            result += `Sell: ${item.sell}\n\n`;
        });
        return result.trim();
    }catch (e) {
        console.error(e)
    }
}





