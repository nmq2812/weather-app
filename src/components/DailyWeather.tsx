"use client";
function DailyWeather() {
    return (
        <div className="w-2/3">
            <div className="md:bg-[url('/assets/images/bg-today-large.svg')] bg-[url('/assets/images/bg-today-small.svg')] object-contain bg-no-repeat rounded-lg ">
            
                <p className="text-center text-xl">Temperature: 75°F</p>
                <p className="text-center text-md">Sunny</p>
            </div>
            <p className="text-center text-lg mt-2">Today's Weather</p>
        </div>
    );
}

export default DailyWeather;
