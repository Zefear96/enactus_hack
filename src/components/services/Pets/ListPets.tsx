import React, { useState } from "react";
import ItemPet from "./ItemPet";
import Link from "next/link";
import {
	Group,
	List,
	Loader,
	Pagination,
	Skeleton,
	Stack,
	rem,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage } from "@/store/slices/petsFilters.slice";

import { useFetchPets } from "@/services/pets/fetchPets";
import { useEditPet } from "@/services/pets/editPet";

const ListPets = () => {
	// const [data] = useFetchPets();
	// console.log(data);

	const dispatch = useAppDispatch();
	const petsFilters = useAppSelector((state) => state.petsFilters);

	const handleChange = (page: number) => {
		dispatch(setPage(page));
	};

	const [pets, { isLoading }] = useFetchPets(petsFilters);
	console.log(pets);

	if (isLoading) {
		return (
			<div className=" grid grid-cols-3 gap-10 w-3/4 mx-auto mt-4">
				<Skeleton h={300} />
				<Skeleton h={300} />
				<Skeleton h={300} />
				<Skeleton h={300} />
				<Skeleton h={300} />
			</div>
		);
	}

	return (
		<>
			<div
				className=" grid grid-cols-3 gap-10 w-3/4 mx-auto my-10"
				style={{ height: "700px" }}
			>
				{pets.results.map((item) => (
					<ItemPet item={item} key={item.id} />
				))}
			</div>
			<Group position="center">
				<Pagination
					value={petsFilters.page ?? 1}
					onChange={handleChange}
					siblings={1}
					total={Math.ceil(pets.count / petsFilters._limit)}
				/>
			</Group>
		</>
	);
};

export default ListPets;

// grid grid-cols-6
