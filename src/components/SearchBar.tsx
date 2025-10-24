"use client";
import { getLocationsByName } from "@/api/getLocations";
import { useState, useEffect, useRef } from "react";

function SearchBar({
    location,
    setLocation,
    setLoading,
}: {
    location: LocationData;
    setLocation: (data: LocationData) => void;
    setLoading: (loading: boolean) => void;
}) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState<Array<LocationData>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Auto search when typing
    useEffect(() => {
        setIsOpen(false);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        setLocations([]);
    };

    const handleManualSearch = async () => {
        if (query.length < 2) return;

        setIsLoading(true);
        setIsOpen(true);
        try {
            const searchResults = await getLocationsByName(query);
            setLocations(searchResults);
        } catch (error) {
            console.error("Search failed:", error);
            setLocations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const selectLocation = (selectedLocation: LocationData) => {
        setLoading(true);
        setLocation(selectedLocation);
        setIsOpen(false);
        setLocations([]);
    };

    return (
        <div
            className="flex justify-center gap-3 relative group flex-col md:flex-row"
            ref={searchRef}
        >
            <div className="md:w-2/3 w-full flex justify-end">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search for a place..."
                    className="bg-neutral-700 rounded-2xl py-4 lg:w-128 focus:outline-none hover:bg-neutral-600 w-full transition-colors"
                    value={query}
                    onChange={handleInputChange}
                    style={{
                        backgroundImage:
                            "url('/assets/images/icon-search.svg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "20px center",
                        paddingLeft: "50px",
                    }}
                    autoComplete="off"
                />

                {isOpen && (
                    <div className="absolute bg-neutral-700 mt-1 top-full border-0 w-full lg:w-128 rounded-lg overflow-hidden shadow-lg z-10">
                        {isLoading ? (
                            <div className="px-4 py-3 text-center">
                                <span>Searching...</span>
                            </div>
                        ) : locations?.length > 0 ? (
                            <ul>
                                {locations.map((locationItem: LocationData) => (
                                    <li
                                        key={locationItem.id}
                                        className="border-b border-neutral-600 last:border-b-0"
                                    >
                                        <button
                                            className="w-full px-4 py-3 text-left hover:bg-neutral-600 cursor-pointer transition-colors"
                                            onClick={() =>
                                                selectLocation(locationItem)
                                            }
                                        >
                                            <div className="font-medium">
                                                {locationItem.name}
                                            </div>
                                            <div className="text-sm text-neutral-300">
                                                {locationItem.country}
                                                {locationItem.admin1 &&
                                                    `, ${locationItem.admin1}`}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : query.length >= 2 ? (
                            <div className="px-4 py-3 text-neutral-400">
                                {`No results found for "${query}"`}
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="md:flex-grow w-full md:w-auto">
                <button
                    className="h-full w-full md:w-auto md:p-4 py-2 text-xl bg-blue-500 rounded-2xl cursor-pointer"
                    onClick={() => handleManualSearch()}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
