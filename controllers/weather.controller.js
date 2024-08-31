const getWeatherInCity = async (req, res) => {
    const city = req.params.city;
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            return res.end({});
        }

        const data = await response.json();
        console.log(data);
        return res.json({
            weatherType: data.weather[0].main,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
        });
    } catch (error) {
        console.log(error);
        return res.json({});
    }
};
module.exports = { getWeatherInCity };
