interface LocationData {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
    [key: string]: string | number;
}

interface WeatherData {
    current: CurrentWeather;
    hourly: HourlyWeather;
    daily: DailyWeather;
}

interface CurrentWeather {
    time: Date;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
}

interface HourlyWeather {
    time: Date[];
    temperature_2m: Float32Array<ArrayBufferLike> | null;
    weather_code: Float32Array<ArrayBufferLike> | null;
}

interface DailyWeather {
    time: Date[];
    temperature_2m_max: Float32Array<ArrayBufferLike> | null;
    temperature_2m_min: Float32Array<ArrayBufferLike> | null;
    weather_code: Float32Array<ArrayBufferLike> | null;
}
