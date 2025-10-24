'use client'
import Image from "next/image";
import { useState } from "react";

function Header() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    return (
        <div className="flex justify-between items-center relative">
            <Image
                src="assets/images/logo.svg"
                alt="Description"
                width={150}
                height={150}
            />
            <button className="bg-neutral-700 px-4 py-2 rounded-lg flex gap-2 cursor-pointer relative" onClick={() => setOpenModal(!openModal)}>
                <Image src="assets/images/icon-units.svg" alt="setting" width={15} height={15} />
                Units 
                <Image src="assets/images/icon-dropdown.svg" alt="dropdown" width={15} height={15} style={{
                                transition: "transform 0.3s ease",
                                transform: openModal
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                            }}/>
                {/* <div className="absolute top-full right-0">
                    <ul>
                        <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">Celsius, km/h</li>
                        <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">Fahrenheit, mph</li>
                    </ul>
                </div> */}
            </button>
            <div className={`${!openModal && "hidden"} absolute top-full right-0 m-1`}>he</div>
        </div>
    );
}

export default Header;
