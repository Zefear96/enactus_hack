import Image from "next/image";
import petfree from "../../../../public/petfree.png";
import React from "react";

const HeaderMenu = () => {
	return (
		<div className=" flex items-center border border-bluelogin rounded-lg p-4 bg-greybg w-full mt-10">
			<div className=" flex items-center mx-auto justify-center">
				<Image src={petfree} alt="error" className="mx-5 "></Image>
				<span className=" text-xl">Животные даром</span>
			</div>
		</div>
	);
};

export default HeaderMenu;
