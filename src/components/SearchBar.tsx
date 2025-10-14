"use client";
import Image from "next/image";
import { useState } from "react";

function SearchBar() {
    const [query, setQuery] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log("Searching for:", query);
    };

    return (
        <div className="w-full flex gap-2">
            <div className="w-2/3 flex justify-end">
                <div className="md:w-3/5 p-3 rounded-lg flex items-center gap-2 bg-neutral-800 focus-within:border-red-500 transition">
                    <Image
                        src="assets/images/icon-search.svg"
                        alt="Search Icon"
                        width={18}
                        height={18}
                    />
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search for a city..."
                        className="px-2 w-64 focus:outline-none flex-grow"
                        value={query}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="flex-grow">
                <button
                    className="h-full bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-700 cursor-pointer"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
