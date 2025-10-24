import Image from "next/image";
import UnitsButton from "./UnitsButton";


function Header() {
    return (
        <div className="flex justify-between items-center relative">
            <Image
                src="assets/images/logo.svg"
                alt="Description"
                width={150}
                height={150}
            />
            <UnitsButton></UnitsButton>
        </div>
    );
}

export default Header;
