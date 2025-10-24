import { fetchWeatherApi } from "openmeteo";

export async function getWeatherInfo(
    lat: number,
    lon: number,
    timezone: string,
    temperatureUnit: "celsius" | "fahrenheit" = "celsius",
    windSpeedUnit: "kmh" | "ms" | "mph" | "kn" = "kmh",
    precipitationUnit: "mm" | "inch" = "mm"
) {
    const params = {
        latitude: lat,
        longitude: lon,
        daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
        hourly: ["temperature_2m", "weather_code"],
        current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation",
            "weather_code",
        ],
        timezone: timezone,
        ...(temperatureUnit && { temperature_unit: temperatureUnit }),
        ...(windSpeedUnit && { wind_speed_unit: windSpeedUnit }),
        ...(precipitationUnit && { precipitation_unit: precipitationUnit }),
    };
    try {
        const responses = await fetchWeatherApi(
            "https://api.open-meteo.com/v1/forecast",
            params,
        );
        const current = responses[0].current()!;
        const hourly = responses[0].hourly()!;
        const daily = responses[0].daily()!;
        const utcOffsetSeconds = responses[0].utcOffsetSeconds();
        
        const weatherData = {
            current: {
                time: new Date(
                    (Number(current?.time()) + utcOffsetSeconds) * 1000,
                ),
                temperature_2m: current?.variables(0)!.value(),
                apparent_temperature: current?.variables(1)!.value(),
                relative_humidity_2m: current?.variables(2)!.value(),
                wind_speed_10m: current?.variables(3)!.value(),
                precipitation: current?.variables(4)!.value(),
                weather_code: current?.variables(5)!.value(),
            },
            hourly: {
                time: (() => {
                    const length = (Number(hourly?.timeEnd()) - Number(hourly?.time())) / hourly?.interval();
                    if (!isFinite(length) || length < 0) {
                        throw new Error('Invalid hourly time range');
                    }
                    return [...Array(length)].map(
                        (_, i) =>
                            new Date(
                                (Number(hourly?.time()) +
                                    i * hourly?.interval() +
                                    utcOffsetSeconds) *
                                    1000,
                            ),
                    );
                })(),
                temperature_2m: hourly.variables(0)!.valuesArray(),
                weather_code: hourly.variables(1)!.valuesArray(),
            },
            daily: {
                time: (() => {
                    const length = (Number(daily?.timeEnd()) - Number(daily?.time())) / daily?.interval();
                    if (!isFinite(length) || length < 0) {
                        throw new Error('Invalid daily time range');
                    }
                    return [...Array(length)].map(
                        (_, i) =>
                            new Date(
                                (Number(daily?.time()) +
                                    i * daily?.interval() +
                                    utcOffsetSeconds) *
                                    1000,
                            ),
                    );
                })(),
                temperature_2m_max: daily.variables(0)!.valuesArray(),
                temperature_2m_min: daily.variables(1)!.valuesArray(),
                weather_code: daily.variables(2)!.valuesArray(),
            },
        };
        return weatherData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
