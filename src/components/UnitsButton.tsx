"use client";
import useUnitStore from "@/stores/unit";
import Image from "next/image";
import { useState } from "react";

function UnitsButton() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {
        temperatureUnit,
        windSpeedUnit,
        precipitationUnit,
        toggleTemperatureUnit,
        toggleWindSpeedUnit,
        togglePrecipitationUnit,
    } = useUnitStore();
    return (
        <>
            <button
                className="bg-neutral-700 px-4 py-2 rounded-lg flex gap-2 cursor-pointer relative text-sm"
                onClick={() => setOpenModal(!openModal)}
            >
                <Image
                    src="assets/images/icon-units.svg"
                    alt="setting"
                    width={15}
                    height={15}
                />
                Units
                <Image
                    src="assets/images/icon-dropdown.svg"
                    alt="dropdown"
                    width={15}
                    height={15}
                    style={{
                        transition: "transform 0.3s ease",
                        transform: openModal
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                    }}
                />
            </button>
            <div
                className={`${
                    !openModal && "hidden"
                } absolute top-full right-0 m-1 bg-neutral-700 p-4 flex flex-col rounded-xl gap-2 z-12`}
            >
                <h4 className="text-sm md:pr-10">Switch to imperial</h4>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-300">Temperature</span>
                    <button className={`px-2 py-1 rounded-md text-left ${temperatureUnit === 'celsius' ? 'bg-neutral-600 flex justify-between' : ''}`} onClick={() => toggleTemperatureUnit('celsius')}>
                        Celsius
                        {temperatureUnit === 'celsius' && <Image src="assets/images/icon-checkmark.svg" alt="" width={12} height={12}/>}
                    </button>
                    <button className={`px-2 py-1 rounded-md text-left ${temperatureUnit === 'fahrenheit' ? 'bg-neutral-600 flex justify-between' : ''}`} onClick={() => toggleTemperatureUnit('fahrenheit')}>
                        Fahrenheit
                        {temperatureUnit === 'fahrenheit' && <Image src="assets/images/icon-checkmark.svg" alt="" width={12} height={12}/>}
                    </button>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-300">Wind Speed</span>
                    <button className={`px-2 py-1 rounded-md text-left ${windSpeedUnit === 'kmh' ? 'bg-neutral-600 flex justify-between' : ''}`} onClick={() => toggleWindSpeedUnit('kmh')}>
                        km/h
                        {windSpeedUnit === 'kmh' && <Image src="assets/images/icon-checkmark.svg" alt="" width={12} height={12}/>}
                    </button>
                    <button className={`px-2 py-1 rounded-md text-left ${windSpeedUnit === 'mph' ? 'bg-neutral-600 flex justify-between' : ''}`} onClick={() => toggleWindSpeedUnit('mph')}>
                        mph
                        {windSpeedUnit === 'mph' && <Image src="assets/images/icon-checkmark.svg" alt="" width={12} height={12}/>}
                    </button>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-300">Precipitation</span>
                    <button className={`px-2 py-1 rounded-md text-left ${precipitationUnit === 'mm' ? 'bg-neutral-600 flex justify-between' : ''}`} onClick={() => togglePrecipitationUnit('mm')}>
                        mm
                        {precipitationUnit === 'mm' && <Image src="assets/images/icon-checkmark.svg" alt="" width={12} height={12}/>}
                    </button>
                    <button className={`px-2 py-1 rounded-md text-left ${precipitationUnit === 'inch' ? 'bg-neutral-600 flex justify-between' : ''}`} onClick={() => togglePrecipitationUnit('inch')}>
                        inch
                        {precipitationUnit === 'inch' && <Image src="assets/images/icon-checkmark.svg" alt="" width={12} height={12}/>}
                    </button>
                </div>
            </div>
        </>
    );
}

export default UnitsButton;
