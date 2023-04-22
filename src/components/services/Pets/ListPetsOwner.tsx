import React, { useEffect, useState } from "react";
import ItemPetOwner from "./ItemPetOwner";
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
import { Pet } from "@/utils/types";

const ListPetsOwner = () => {
	const [currentUser] = useFetchUser();
	const dispatch = useAppDispatch();
	const petsFilters = useAppSelector((state) => state.petsFilters);
	console.log(petsFilters);
	const [pets, { isLoading }] = useFetchPets(petsFilters);
	const [ownerList, setOwnerList] = useState<Pet[]>([]);

	useEffect(() => {
		if (pets) {
			setOwnerList(pets.filter((pet) => pet.owner === currentUser?.email));
		}
	}, []);

	// setOwnerList(pets?.filter((pet) => pet.owner === currentUser?.email));
	console.log(ownerList);

	const handleChange = (page: number) => {
		dispatch(setPage(page));
	};

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
			<div className=" grid grid-cols-1 gap-10 w-3/4 mx-auto ">
				{ownerList.map((item) => (
					<ItemPetOwner item={item} key={item.id} />
				))}
			</div>
			<Group position="center" className="my-20">
				<Pagination
					value={petsFilters.page ?? 1}
					onChange={handleChange}
					siblings={1}
					total={Math.ceil((ownerList.length ?? 0) / petsFilters._limit)}
				/>
			</Group>
		</div>
	);
};

export default ListPetsOwner;

// grid grid-cols-6
