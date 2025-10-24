function parseHourlyData(weatherData: WeatherData | undefined) {
    let weatherHourly: Record<string, any> = {};
    const temperatureMetrics = weatherData?.hourly;
    if (temperatureMetrics) {
        temperatureMetrics.temperature_2m?.forEach(
            (temp: number, index: number) => {
                const time = temperatureMetrics.time[index];
                const code = temperatureMetrics.weather_code?.[index];
                const key = time.toLocaleDateString("en-US", {
                    weekday: "long",
                });
                if (weatherHourly.hasOwnProperty(key) === false) {
                    weatherHourly[key] = {
                        [time.toLocaleString("en-US", {
                            hour: "numeric",
                            hour12: true,
                        })]: {
                            temperature: temp.toFixed(0),
                            weatherCode: code,
                        },
                    };
                } else {
                    weatherHourly[key][time.toLocaleString("en-US", {
                        hour: "numeric",
                        hour12: true,
                    })] = {
                        temperature: temp.toFixed(0),
                        weatherCode: code,
                    };
                }
            },
        );

        return weatherHourly;
    }
}

export default parseHourlyData;