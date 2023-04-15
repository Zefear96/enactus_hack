import React, { useState } from "react";
import ItemPet from "./ItemPet";
import Link from "next/link";

import { useFetchPets } from "@/services/pets/fetchPets";

const ListPets = () => {
	const [data] = useFetchPets();
	console.log(data);

	return (
		<div className=" grid grid-cols-3 gap-10 w-3/4 mx-auto">
			{data.map((item) => (
				// <Link href={`/services/pets/${item.id}`} key={item.id}>
				<ItemPet item={item} />
				// </Link>
			))}
		</div>
	);
};

export default ListPets;

// grid grid-cols-6
