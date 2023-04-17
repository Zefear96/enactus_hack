import React from "react";
import ListPets from "@/components/services/Pets/ListPets";
import petfree from "../../../../public/petfree.png";
import Image from "next/image";

const AdvListPage = () => {
	return (
		<div style={{ width: "90%" }} className="mx-auto my-5">
			<div className=" flex items-center justify-center border border-bluelogin rounded-lg p-4 bg-greybg">
				<Image src={petfree} alt="error" className="mx-5"></Image>
				<span className=" text-xl">Животные даром</span>
			</div>
			<ListPets />
		</div>
	);
};

export default AdvListPage;
