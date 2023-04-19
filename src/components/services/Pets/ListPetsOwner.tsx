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
import { useFetchUser } from "@/services/user/fetchUser";

const ListPetsOwner = () => {
	const [currentUser] = useFetchUser();

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
		<div className="flex-col w-3/4 mx-auto my-10">
			<div className=" grid grid-cols-2 gap-10 w-3/4 mx-auto ">
				{pets.results
					.filter((item) => item.owner === currentUser?.email)
					.map((item) => (
						<ItemPet item={item} key={item.id} />
					))}
			</div>
			<Group position="center" className="my-20">
				<Pagination
					value={petsFilters.page ?? 1}
					onChange={handleChange}
					siblings={1}
					total={Math.ceil(pets.count / petsFilters._limit)}
				/>
			</Group>
		</div>
	);
};

export default ListPetsOwner;

// grid grid-cols-6
