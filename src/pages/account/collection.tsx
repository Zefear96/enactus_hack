import React from "react";
import Profile from "@/components/account/Profile";
import ListPetsOwner from "@/components/services/Pets/ListPetsOwner";

const ListOwner = () => {
	return (
		<div className="flex w-11/12 m-auto">
			<Profile />
			<ListPetsOwner />
		</div>
	);
};

export default ListOwner;
