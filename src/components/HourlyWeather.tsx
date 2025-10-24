"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import getWeatherIcon from "@/utils/getWeatherIcon";

function HourlyWeather({
    weatherHourly,
}: {
    weatherHourly: WeatherHourly | undefined;
}) {
    const [day, setDay] = useState<string>("");
    const [week, setWeek] = useState<string[]>([]);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    useEffect(() => {
        if (weatherHourly) {
            setDay(Object.keys(weatherHourly)[0]);
            setWeek(Object.keys(weatherHourly) || []);
        }
    }, [weatherHourly]);

    return (
        <div className="h-full overflow-hidden flex flex-col flex-grow rounded-2xl bg-neutral-800 p-2">
            <div className="flex justify-between py-2 px-3 items-center relative">
                <h1 className="text-md font-semibold">Hourly forecast</h1>
                <button
                    className="bg-neutral-700 px-4 py-2 rounded-lg flex gap-2 cursor-pointer relative"
                    onClick={() => setOpenDropdown(!openDropdown)}
                >
                    <div className="flex gap-2 ">
                        {day}
                        <Image
                            src="assets/images/icon-dropdown.svg"
                            alt="dropdown"
                            width={15}
                            height={15}
                            style={{
                                transition: "transform 0.3s ease",
                                transform: openDropdown
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                            }}
                        />
                    </div>
                </button>
                <div
                    className={`p-2 bg-neutral-700 w-1/2 shadow-sm rounded-xl overflow-hidden absolute top-full right-0 border-neutral-600 border-1 ${
                        openDropdown ? "" : "hidden"
                    }`}
                >
                    <ul>
                        {week &&
                            week.map((_day: string) => (
                                <li
                                    key={_day}
                                    className="px-4 py-2 rounded-md hover:bg-neutral-600 cursor-pointer"
                                >
                                    <button
                                        onClick={() => {
                                            setDay(_day);
                                            setOpenDropdown(false);
                                        }}
                                        className="w-full text-left cursor-pointer"
                                    >
                                        {_day}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            <div className="py-2 px-3 flex flex-col gap-3 min-w-max h-full flex-grow overflow-y-scroll scrollbar-hidden">
                {day &&
                    weatherHourly &&
                    Object.entries(weatherHourly[day]).map(
                        ([time, info]: [string, HourlyWeatherInfo]) => {
                            return (
                                <div
                                    key={time}
                                    className="flex items-center justify-between text-2xl min-w-[60px] py-2 pr-3 rounded-xl border-neutral-600 shadow-md border-1 bg-neutral-700"
                                >
                                    <div className="flex items-center justify-center gap-2 ">
                                        <Image
                                            src={getWeatherIcon(
                                                info.weatherCode,
                                            )}
                                            alt="weather icon"
                                            width={50}
                                            height={50}
                                        />
                                        <p className="">{time}</p>
                                    </div>

                                    <p className="mt-2">
                                        {info.temperature}°
                                    </p>
                                </div>
                            );
                        },
                    )}
            </div>
        </div>
    );
}

export default HourlyWeather;
