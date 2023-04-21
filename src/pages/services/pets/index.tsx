import React from "react";
import ListPets from "@/components/services/Pets/ListPets";
import HeaderMenu from "@/components/services/Pets/HeaderMenu";

const AdvListPage = () => {
	return (
		<div style={{ width: "90%" }} className="mx-auto my-5">
			<ListPets />
		</div>
	);
};

export default AdvListPage;
