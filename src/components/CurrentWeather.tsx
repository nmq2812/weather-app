import useUnitStore from "@/stores/unit";
import getWeatherIcon from "@/utils/getWeatherIcon";
import Image from "next/image";

function CurrentWeather({
    currentData,
    locationData,
}: {
    currentData: CurrentWeather | undefined;
    locationData: LocationData;
}) {
    const { temperatureUnit, windSpeedUnit, precipitationUnit } =
        useUnitStore();

    console.log("Current Data:", currentData);
    console.log("Location Data:", locationData);

    return (
        <div className="">
            <div className="md:px-5 p-4 min-h-72 flex justify-between items-center md:bg-[url('/assets/images/bg-today-large.svg')] bg-[url('/assets/images/bg-today-small.svg')] bg-center bg-contain bg-no-repeat ">
                <div className="flex flex-col gap-3">
                    <h1 className="text-left text-xl md:text-2xl lg:text-4xl font-semibold">
                        {locationData.name}, {locationData.country}
                    </h1>
                    <p className="text-md font-thin italic">
                        {currentData?.time.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <div className="flex items-center justify-end">
                    <Image
                        src={getWeatherIcon(currentData?.weather_code || 0)}
                        alt=""
                        width={120}
                        height={120}
                    />
                    <p className="text-left text-6xl italic">
                        {currentData?.temperature_2m
                            ? Math.round(currentData.temperature_2m)
                            : "N/A"}
                        {temperatureUnit === "celsius" ? "°C" : "°F"}
                    </p>
                </div>
            </div>
            <div className="lg:flex md:grid md:grid-cols-2 gap-6 mt-4">
                <div className="p-3 bg-neutral-700 rounded-lg flex-1">
                    <p className="text-left p-2 text-xl">Feel like</p>
                    <p className="text-left p-2 text-4xl font-bold">
                        {currentData?.apparent_temperature
                            ? Math.round(currentData.apparent_temperature)
                            : "N/A"}
                        {temperatureUnit === "celsius" ? "°C" : "°F"}
                    </p>
                </div>
                <div className="p-3 bg-neutral-700 rounded-lg flex-1">
                    <p className="text-left p-2 text-xl">Humidity</p>
                    <p className="text-left p-2 text-4xl font-bold">
                        {currentData?.relative_humidity_2m
                            ? currentData.relative_humidity_2m
                            : "N/A"}{" "}
                        %
                    </p>
                </div>
                <div className="p-3 bg-neutral-700 rounded-lg flex-1">
                    <p className="text-left p-2 text-xl">Wind</p>
                    <p className="text-left p-2 text-4xl font-bold">
                        {currentData?.wind_speed_10m
                            ? Math.round(currentData.wind_speed_10m)
                            : "N/A"}{" "}
                        {(() => {
                            switch (windSpeedUnit) {
                                case "kmh":
                                    return "km/h";
                                case "ms":
                                    return "m/s";
                                case "mph":
                                    return "mph";
                                case "kn":
                                    return "kn";
                                default:
                                    return "";
                            }
                        })()}
                    </p>
                </div>
                <div className="p-3 bg-neutral-700 rounded-lg flex-1">
                    <p className="text-left p-2 text-xl">Precipitation</p>
                    <p className="text-left p-2 text-4xl font-bold">
                        {currentData?.precipitation !== undefined
                            ? Math.round(currentData.precipitation)
                            : "N/A"}{" "}
                        {precipitationUnit === "mm" ? "mm" : "inch"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
