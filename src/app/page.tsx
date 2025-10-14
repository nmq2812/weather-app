import React from "@/../public/assets/images/logo.svg";
import DailyWeather from "@/components/DailyWeather";
import Header from "@/components/Header";
import HourlyWeather from "@/components/HourlyWeather";
import SearchBar from "@/components/SearchBar";

export default function Home() {
    return <div className="max-w-[375px] md:max-w-[1248px] mx-auto p-4">
        <Header />
        <h1 className="lg:text-6xl text-5xl text-center my-10">How's the sky looking today?</h1>
        <SearchBar />
        <div className="flex gap-3 mt-10">
            <DailyWeather />
            <HourlyWeather />
        </div>
    </div>;
}
