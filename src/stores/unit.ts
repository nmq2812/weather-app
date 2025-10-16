import {create} from "zustand";

interface UnitState {
    temperatureUnit: "celsius" | "fahrenheit";
    windSpeedUnit: "kmh" | "ms" | "mph" | "kn";
    precipitationUnit: "mm" | "inch";
    toggleTemperatureUnit: (unit: "celsius" | "fahrenheit") => void;
    toggleWindSpeedUnit: (unit: "kmh" | "ms" | "mph" | "kn") => void;
    togglePrecipitationUnit: (unit: "mm" | "inch") => void;
}

const unitStore = create<UnitState>((set) => ({
    temperatureUnit: "celsius",
    windSpeedUnit: "kmh",
    precipitationUnit: "mm",
    togglePrecipitationUnit: (unit: "mm" | "inch") =>
        set((state) => ({precipitationUnit: state.precipitationUnit === unit ? state.precipitationUnit : unit})),
    toggleTemperatureUnit: (unit: "celsius" | "fahrenheit") =>
        set((state) => ({temperatureUnit: state.temperatureUnit === unit ? state.temperatureUnit : unit})),
    toggleWindSpeedUnit: (unit: "kmh" | "ms" | "mph" | "kn") =>
        set((state) => ({windSpeedUnit: state.windSpeedUnit === unit ? state.windSpeedUnit : unit})),
}))

const useUnitStore = () => {
    return unitStore();
}

export default useUnitStore;