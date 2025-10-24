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

export default function Home() {
    const { temperatureUnit, windSpeedUnit, precipitationUnit } = useUnitStore();
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

    const fetchWeatherData = async () => {
        try {
            const data = await getWeatherInfo(
                location.latitude,
                location.longitude,
                location.timezone,
                temperatureUnit,
                windSpeedUnit,
                precipitationUnit
            );
            data && setWeatherData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchWeatherData();
    }, [location, temperatureUnit, windSpeedUnit, precipitationUnit]);

    return (
        <div className="max-w-[575px] md:max-w-[1248px] mx-auto p-4 my-3">
            <Header />
            <h1 className="lg:text-6xl text-5xl text-center my-10">
                {`How's the sky looking today?`}
            </h1>
            <SearchBar location={location} setLocation={setLocation} setLoading={setIsLoading}/>
            <div className="flex flex-col md:flex-row gap-3 mt-10 md:h-[95vh]">
                <DailyWeather locationData={location} weatherData={weatherData} loading={isLoading}/>
                <HourlyWeather weatherHourly={parseHourlyData(weatherData)} loading={isLoading}/>
            </div>
        </div>
    );
}
