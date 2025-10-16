"use client";
import { getLocationsByName } from "@/api/getLocations";
import { getWeatherInfo } from "@/api/getWeatherInfo";
import { useState } from "react";

function SearchBar({ location, setLocation }: { location: LocationData ,setLocation: (data: LocationData) => void }) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState<Array<LocationData>>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        const locations = await getLocationsByName(query);
        setLocations(locations);
        setIsOpen(true);
    };

    const selectLocation = async (location: LocationData) => {
        setLocation(location);
        setIsOpen(false);
    };

    return (
        <div className="w-full flex gap-2">
            <div className="w-2/3 flex justify-end relative group">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search for a city..."
                    className="bg-neutral-700 rounded-lg py-4 lg:w-128 md:w-96 focus:outline-none hover:bg-neutral-600 w-full"
                    value={query}
                    onChange={handleInputChange}
                    style={{
                        backgroundImage:
                            "url('/assets/images/icon-search.svg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "20px center",
                        paddingLeft: "50px",
                    }}
                    onFocus={() => query && setIsOpen(true)}
                    autoComplete="off"
                />
                <div
                    className="absolute bg-neutral-700 mt-1 top-full right-0 border-0 lg:w-128 md:w-96 rounded-lg overflow-hidden"
                    style={{
                        display: isOpen ? "block" : "none",
                    }}
                >
                    {locations && query && locations.length > 0 ? (
                        <ul className="mt-1">
                            {locations.map((location: LocationData) => (
                                <li
                                    key={location.id}
                                    className="px-4 py-2 hover:bg-neutral-600 cursor-pointer"
                                >
                                    <button
                                        onClick={() => {
                                            selectLocation(location);
                                        }}
                                    >
                                        {location.name}, {location.country}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="px-4 py-2">No results found</p>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <button
                    className="h-full bg-blue-500 rounded-lg px-5 py-2 hover:bg-blue-700 cursor-pointer"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
