import React from "react";
import ListPets from "@/components/services/Pets/ListPets";
import HeaderMenu from "@/components/services/Pets/HeaderMenu";
import Header from "@/components/services/Header";

const PetsPage = () => {
	return (
		<div style={{ width: "90%" }} className="mx-auto my-5">
			{/* <Header /> */}
			<ListPets />
		</div>
	);
};

export default PetsPage;
