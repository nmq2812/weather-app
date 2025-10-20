export async function getLocationsByName(name: string) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch location data");
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
