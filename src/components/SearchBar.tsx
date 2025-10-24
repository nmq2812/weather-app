"use client";
import { getLocationsByName } from "@/api/getLocations";
import { useState, useEffect, useRef } from "react";

function SearchBar({
    location,
    setLocation,
}: {
    location: LocationData;
    setLocation: (data: LocationData) => void;
}) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState<Array<LocationData>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Auto search when typing
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (query.length >= 2) {
            searchTimeout.current = setTimeout(() => {
                handleAutoSearch();
            }, 500); // Debounce 500ms
        } else {
            setLocations([]);
            setIsOpen(false);
        }

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
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

        if (value.length >= 2) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
            setLocations([]);
        }
    };

    const handleAutoSearch = async () => {
        if (query.length < 2) return;

        setIsLoading(true);
        try {
            const searchResults = await getLocationsByName(query);
            setLocations(searchResults);
            setIsOpen(true);
        } catch (error) {
            console.error("Search failed:", error);
            setLocations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleManualSearch = async () => {
        if (query.length < 2) return;

        setIsLoading(true);
        try {
            const searchResults = await getLocationsByName(query);
            setLocations(searchResults);
            setIsOpen(true);
        } catch (error) {
            console.error("Search failed:", error);
            setLocations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const selectLocation = (selectedLocation: LocationData) => {
        setLocation(selectedLocation);
        setIsOpen(false);
        setLocations([]);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleManualSearch();
        } else if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div className="flex justify-center relative group" ref={searchRef}>
            <input
                id="search-input"
                type="text"
                placeholder="Search for a place..."
                className="bg-neutral-700 rounded-lg py-4 lg:w-164 md:w-128 focus:outline-none hover:bg-neutral-600 w-full transition-colors"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{
                    backgroundImage: "url('/assets/images/icon-search.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "20px center",
                    paddingLeft: "50px",
                }}
                autoComplete="off"
            />

            {isOpen && (
                <div className="absolute bg-neutral-700 mt-1 top-full border-0 lg:w-164 md:w-128 rounded-lg overflow-hidden shadow-lg z-10">
                    {isLoading ? (
                        <div className="px-4 py-3 text-center">
                            <span>Searching...</span>
                        </div>
                    ) : locations.length > 0 ? (
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
    );
}

export default SearchBar;
