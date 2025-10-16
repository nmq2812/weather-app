'use client'
import Image from "next/image";

function Header() {
    return (
        <div className="flex justify-between items-center">
            <Image
                src="assets/images/logo.svg"
                alt="Description"
                width={150}
                height={150}
            />
            <button className="bg-neutral-700 px-4 py-2 rounded-lg flex gap-2 cursor-pointer relative">
                <Image src="assets/images/icon-units.svg" alt="setting" width={15} height={15} />
                Units 
                <Image src="assets/images/icon-dropdown.svg" alt="dropdown" width={15} height={15} />
                {/* <div className="absolute top-full right-0">
                    <ul>
                        <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">Celsius, km/h</li>
                        <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">Fahrenheit, mph</li>
                    </ul>
                </div> */}
            </button>
        </div>
    );
}

export default Header;
