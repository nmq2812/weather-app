"use client";
import React from "@/../public/assets/images/logo.svg";
import { getWeatherInfo } from "@/api/getWeatherInfo";
import DailyWeather from "@/components/DailyWeather";
import Header from "@/components/Header";
import HourlyWeather from "@/components/HourlyWeather";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import useUnitStore from "@/stores/unit";
import parseHourlyData from "@/utils/parseHourlyData";
import Image from "next/image";

export default function Home() {
    const { temperatureUnit, windSpeedUnit, precipitationUnit } =
        useUnitStore();
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [location, setLocation] = useState<LocationData>({
        id: 0,
        name: "Hanoi",
        latitude: 21.0245,
        longitude: 105.8412,
        timezone: "Asia/Ho_Chi_Minh",
        country: "Vietnam",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (location: LocationData | undefined) => {
        try {
            if (!location) {
                console.error("Location is not set");
                setIsLoading(false);
                return;
            }
            const data = await getWeatherInfo(
                location.latitude,
                location.longitude,
                location.timezone,
                temperatureUnit,
                windSpeedUnit,
                precipitationUnit,
            );
            data && setWeatherData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Failed to fetch weather data.");
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchWeatherData(location);
    }, [location, temperatureUnit, windSpeedUnit, precipitationUnit]);

    return (
        <div className="max-w-[575px] md:max-w-[1248px] mx-auto p-4 my-3">
            {location && (
                <>
                    <Header />
                    {error ? (
                        <div className="text-center my-10 w-full flex flex-col items-center gap-5">
                            <Image src="assets/images/icon-error.svg" alt="Error Image" width={50} height={50}/>
                            <h1 className="text-6xl text-bold">Something went wrong</h1>
                            <p className="text-neutral-200">{"We coundn't connect to the server (API error). Please try again in a few moments"}</p>
                            <button className="bg-neutral-600 text-white px-4 py-2 rounded cursor-pointer flex gap-2" onClick={() => {
                                window.location.reload();
                            }}>
                                <Image src="assets/images/icon-retry.svg" alt="Retry Icon" width={20} height={20} />
                                Retry 
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="lg:text-6xl text-5xl text-center my-10">
                                {`How's the sky looking today?`}
                            </h1>
                            <SearchBar
                                setLocation={setLocation}
                                setLoading={setIsLoading}
                            />
                            <div className="flex flex-col md:flex-row gap-3 mt-10 md:h-[95vh]">
                                <DailyWeather
                                    locationData={location}
                                    weatherData={weatherData}
                                    loading={isLoading}
                                />
                                <HourlyWeather
                                    weatherHourly={parseHourlyData(weatherData)}
                                    loading={isLoading}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
