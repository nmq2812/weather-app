function CurrentWeatherLoadingState() {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="flex gap-2">
                <div className="w-3 h-3 bg-neutral-200 rounded-full ease-in-out animate-[bounce_2s_ease-in-out_infinite]"></div>
                <div className="w-3 h-3 bg-neutral-200 rounded-full ease-in-out animate-[bounce_2s_ease-in-out_infinite_0.2s]"></div>
                <div className="w-3 h-3 bg-neutral-200 rounded-full ease-in-out animate-[bounce_2s_ease-in-out_infinite_0.4s]"></div>
            </div>
            <p className="text-xl">Loading...</p>
        </div>
    );
}

export default CurrentWeatherLoadingState;