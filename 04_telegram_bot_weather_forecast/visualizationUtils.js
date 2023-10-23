const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const visualizeForecastDataArray = async (forecastData) => {
    const visualizedDataArray = [];

    Object.keys(forecastData).forEach((day) => {
        const forecasts = forecastData[day];
        const dayNumber = new Date(forecasts[0].date).getDay();
        let message = `<b>Date: ${day} ${days[dayNumber]}</b>\n\n`;

        forecasts.forEach((forecast, index) => {
            message += `<b>Time:</b> ${new Date(forecast.date).toLocaleTimeString('it-IT')}\n`;
            message += `<b>Temperature:</b> ${Math.round(forecast.temp)} °C \n`;
            message += `<b>Weather:</b> ${forecast.weather[0].description} \n`;
            message += `<b>Wind:</b> ${Math.round(forecast.wind.speed)} m/s \n\n`;
        });
        visualizedDataArray.push(message);
    });

    return visualizedDataArray;
};



