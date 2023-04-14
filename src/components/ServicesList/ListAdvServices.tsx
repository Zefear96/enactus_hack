import React, { useState } from "react";
import ItemServices from "./ItemServices";

import { useFetchPets } from "@/services/fetchServices";

const ListAdvServices = () => {
	const [data] = useFetchPets();
	console.log(data);

	return (
		<div className=" flex">
			{data.map((item) => (
				<ItemServices item={item} key={item.id} />
			))}
		</div>
	);
};

export default ListAdvServices;
