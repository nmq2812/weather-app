export default function getWeatherIcon(weatherCode: number): string {
    switch (weatherCode) {
        case 0:
            return "/assets/images/weather-icons/icon-sunny.webp"; // Clear sky
        case 1:
        case 2: // Mainly clear, partly cloudy
            return "/assets/images/weather-icons/icon-partly-cloudy.webp";
        case 3:
            return "/assets/images/weather-icons/icon-overcast.webp"; // Overcast
        case 45:
        case 48: // Fog and depositing rime fog
            return "/assets/images/weather-icons/icon-fog.webp";
        case 51:
        case 53:
        case 55: // Drizzle: Light, moderate, and dense intensity
            return "/assets/images/weather-icons/icon-drizzle.webp";
        case 56:
        // case 57:    // Freezing Drizzle: Light and dense intensity
        //     return "/assets/images/weather-icons/icon-freezing-drizzle.webp";
        case 61:
        case 63:
        case 65: // Rain: Slight, moderate and heavy intensity
            return "/assets/images/weather-icons/icon-rain.webp";
        case 71:
        case 73:
        case 75:
            return "/assets/images/weather-icons/icon-snow.webp";
        case 80:
        case 81:
        case 82: // Rain showers: Slight, moderate, and violent
            return "/assets/images/weather-icons/icon-rain.webp";
        case 85:
        case 86: // Snow showers slight and heavy
            return "/assets/images/weather-icons/icon-snow.webp";
        case 95:
        case 96:
        case 99: // Thunderstorm with slight and heavy hail
            return "/assets/images/weather-icons/icon-storm.webp";
        default:
            return "/assets/images/weather-icons/icon-partly-cloudy.webp"; // Unknown weather code
    }
}
