"use client";
import Image from "next/image";
import getWeatherIcon from "@/utils/getWeatherIcon";
import CurrentWeather from "./CurrentWeather";
import useUnitStore from "@/stores/unit";

function DailyWeather({
    weatherData,
    locationData,
    loading,
}: {
    weatherData: WeatherData | undefined;
    locationData: LocationData;
    loading: boolean;
}) {
    const currentData = weatherData?.current;
    const dailyData = weatherData?.daily;

    return (
        <div className="flex flex-col justify-between w-full md:w-2/3 h-full">
            <CurrentWeather
                currentData={currentData}
                locationData={locationData}
                loading={loading}
            ></CurrentWeather>
            <DailyForecast
                dailyData={dailyData}
                loading={loading}
            ></DailyForecast>
        </div>
    );
}

function DailyForecast({
    dailyData,
    loading,
}: {
    dailyData: DailyWeather | undefined;
    loading: boolean;
}) {
    const { temperatureUnit } = useUnitStore();
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Daily forecast</h2>
            <div className="grid grid-cols-3 lg:grid-cols-7 gap-3">
                {dailyData?.time.map((date, index) => (
                    <div
                        key={index}
                        className="bg-neutral-700 p-2 rounded-lg flex flex-col items-center min-h-36"
                    >
                        {!loading && (
                            <>
                                <h3 className="text-xl font-medium mb-2">
                                    {date.toLocaleDateString("en-US", {
                                        weekday: "short",
                                    })}
                                </h3>
                                <Image
                                    src={getWeatherIcon(
                                        dailyData.weather_code
                                            ? dailyData.weather_code[index]
                                            : 0,
                                    )}
                                    alt="Weather Icon"
                                    width={64}
                                    height={64}
                                    className="mb-3"
                                ></Image>
                                {dailyData.temperature_2m_max &&
                                dailyData.temperature_2m_min ? (
                                    <div className="flex justify-between w-full">
                                        <div className="text-sm">
                                            {Math.round(
                                                dailyData.temperature_2m_max[
                                                    index
                                                ],
                                            )}
                                            {temperatureUnit === "celsius"
                                                ? "°C"
                                                : "°F"}
                                        </div>
                                        <div className="text-sm">
                                            {Math.round(
                                                dailyData.temperature_2m_min[
                                                    index
                                                ],
                                            )}
                                            {temperatureUnit === "celsius"
                                                ? "°C"
                                                : "°F"}
                                        </div>
                                    </div>
                                ) : (
                                    "N/A"
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DailyWeather;
