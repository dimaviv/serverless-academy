import axios from 'axios';
import {allowedForecastIntervals, OPENWEATHER_API_KEY} from "./config.js";

const cityName = 'London';
const apiKey = process.env.OPENWEATHER_API_KEY ?? OPENWEATHER_API_KEY


class WeatherService {
    async getForecastByCity(city, days, interval= 3){
        if (!allowedForecastIntervals.includes(interval)) throw Error('Incorrect interval value')
        const initialApiInterval = 3;
        const stepsInterval =  (24 / initialApiInterval) / (24 / interval)
        const stepsAmount = 24 / initialApiInterval * days

        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        const forecastData =  (await axios.get(url)).data.list;
        forecastData.splice(stepsAmount + 1);

        let forecast = forecastData
            .map((item, index) => {
                return {
                    date: new Date(item.dt_txt),
                    temp: item.main.temp,
                    pressure: item.main.pressure,
                    humidity: item.main.pressure,
                    weather: item.weather,
                    wind: item.wind,
                    pop: item.pop,
                };
            })
        if (stepsInterval !== 1){
            forecast = forecast.filter((item, index) => index % stepsInterval === 0);
        }
        return await this.forecastByDays(forecast);
    }

    async forecastByDays(forecast) {
        const forecastByDaysObject = {};
        forecast.forEach(f => {
            const day = f.date.getUTCDate() + '-' + (f.date.getUTCMonth() + 1);
            if (forecastByDaysObject[day]) {
                forecastByDaysObject[day].push(f);
            } else {
                forecastByDaysObject[day] = [f];
            }
        });
        return forecastByDaysObject;
    }
}

export default new WeatherService()
