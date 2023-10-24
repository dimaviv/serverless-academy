import axios from 'axios';
import NodeCache from 'node-cache';

const rateCodes = {
    EUR: 978,
    USD: 840,
    UAH: 980,
    GBR: 826,
    PLN: 985,
}

const monobankRatesCache = new NodeCache( { stdTTL: 65, checkperiod: 70 } );
const privatBankRatesCache = new NodeCache( { stdTTL: 65, checkperiod: 70 } );

class RatesService {

    constructor() {
        this.rateCodes = rateCodes;
    }


    async getMonobankRates(currency){
        try {
            const cachedRates = monobankRatesCache.get(currency);
            if (cachedRates) return cachedRates;

            const rateCodesArray = Object.values(rateCodes)
            let allRates;
            const cachedMonobankRates = monobankRatesCache.get('monobank')
            if (cachedMonobankRates) allRates = cachedMonobankRates;

            const url = `https://api.monobank.ua/bank/currency`;
            const apiResponse = await axios.get(url)
            allRates = apiResponse.data

            monobankRatesCache.set('monobank', allRates, 65);

            const rates = allRates.filter((rate) => rate.currencyCodeA === rateCodes[currency] && rateCodesArray.includes(rate.currencyCodeB))

            const formattedRates = await this.monobankToUnifiedFormat(rates);
            monobankRatesCache.set(currency, formattedRates, 65);

            return formattedRates;

        }catch (e) {
            console.error(e)
        }
    }


    async getPrivatBankRates(currency){
        try {
            const cachedRates = privatBankRatesCache.get(currency);
            if (cachedRates) return cachedRates;

            const url = `https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11`;
            const allRates = await axios.get(url)

            const rates = allRates.data.filter((rate) => rate.ccy === currency)
            const formattedRates = await this.privatBankToUnifiedFormat(rates);
            privatBankRatesCache.set(currency, formattedRates, 65);

            return formattedRates;
        }catch (e) {
            console.error(e)
        }
    }


    async monobankToUnifiedFormat(rates){
        try {
            return rates.map(rate => {
                return {
                    currencyA: Object.keys(rateCodes).find(key => rateCodes[key] === rate.currencyCodeA),
                    currencyB: Object.keys(rateCodes).find(key => rateCodes[key] === rate.currencyCodeB),
                    buy: rate.rateBuy,
                    sell: rate.rateSell,
                }
            })
        }catch (e) {
            console.error(e)
        }

    }

    async privatBankToUnifiedFormat(rates){
        try {
            return rates.map(rate => {
                return {
                    currencyA: rate.ccy,
                    currencyB: rate.base_ccy,
                    buy: parseFloat(rate.buy),
                    sell: parseFloat(rate.sale)
                }
            })
        }catch (e) {
            console.error(e)
        }
    }
}

export default new RatesService()
