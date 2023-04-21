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
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { useFetchPets } from "@/services/pets/fetchPets";
import { useEditPet } from "@/services/pets/editPet";
import HeaderMenu from "./HeaderMenu";
import { useFetchCategories } from "@/services/pets/fetchCategories";

type CategoryObj = {
	id: number;
	title: string;
};

const ListPets = () => {
	const dispatch = useAppDispatch();
	const petsFilters = useAppSelector((state) => state.petsFilters);
	const [categories] = useFetchCategories();
	const initCategory = {
		title: "Категории",
		id: 0,
	};
	console.log(categories);

	const handleChange = (page: number) => {
		dispatch(setPage(page));
	};

	const [pets, { isLoading }] = useFetchPets(petsFilters);
	console.log(pets);

	const [selectedCategory, setSelectedCategory] =
		useState<CategoryObj>(initCategory);

	function handleSelectChange(value: CategoryObj) {
		setSelectedCategory(value);
	}

	if (pets === null) {
		<p>Empty</p>;
	}

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
			<HeaderMenu />

			<div>
				<Menu as="div" className="relative inline-block text-left mx-auto">
					<Menu.Button className="inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ">
						{selectedCategory?.title}
						<svg
							className="fill-current h-4 w-4 mx-4"
							// xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M10 12l-6-6h12z" />
						</svg>
					</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
							{categories?.map((item) => (
								<div className="px-1 py-1" key={item.id}>
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active ? "bg-primary text-white" : "text-gray-900"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
												onClick={() => handleSelectChange(item)}
											>
												{item.title}
											</button>
										)}
									</Menu.Item>
								</div>
							))}
						</Menu.Items>
					</Transition>
				</Menu>

				<button onClick={() => setSelectedCategory(initCategory)}>
					Сбросить фильтр
				</button>
			</div>

			{/* LIST PETS */}
			<div
				className=" grid grid-cols-3 gap-10 w-3/4 mx-auto my-10"
				// style={{ height: "1100px" }}
			>
				{/* {selectedCategory.title === "Категории"
					? pets.results.map((item) => <ItemPet item={item} key={item.id} />)
					: pets.results
							.filter((item) => item.category === selectedCategory.id)
							.map((item) => <ItemPet item={item} key={item.id} />)} */}

				{selectedCategory.title === "Категории" ? (
					pets?.length ?? 0 > 0 ? (
						pets
							?.slice(
								(petsFilters.page - 1) * petsFilters._limit,
								petsFilters.page * petsFilters._limit,
							)
							.map((item) => <ItemPet item={item} key={item.id} />) ?? []
					) : (
						<>
							<img
								src="https://media.istockphoto.com/id/612722464/photo/cat-hold-blue-frame-with-blank-empty-white-paper.jpg?s=612x612&w=0&k=20&c=237qke9f35zSR7ha-XYM_T9ZL6iSkit-Jd8DjJq0cvM="
								alt="No results found"
							/>
						</>
					)
				) : pets
						?.filter((item) => item.category === selectedCategory.id)
						?.slice(
							(petsFilters.page - 1) * petsFilters._limit,
							petsFilters.page * petsFilters._limit,
						)
						?.map((item) => <ItemPet item={item} key={item.id} />).length ??
				  0 > 0 ? (
					pets
						?.filter((item) => item.category === selectedCategory.id)
						?.slice(
							(petsFilters.page - 1) * petsFilters._limit,
							petsFilters.page * petsFilters._limit,
						)
						?.map((item) => <ItemPet item={item} key={item.id} />)
				) : (
					<>
						<img
							src="https://media.istockphoto.com/id/612722464/photo/cat-hold-blue-frame-with-blank-empty-white-paper.jpg?s=612x612&w=0&k=20&c=237qke9f35zSR7ha-XYM_T9ZL6iSkit-Jd8DjJq0cvM="
							alt="No results found"
							className="col-start-2"
						/>
					</>
				)}
			</div>

			<Group position="center">
				<Pagination
					value={petsFilters.page ?? 1}
					onChange={handleChange}
					siblings={2}
					// total={Math.ceil((pets?.length ?? 0) / petsFilters._limit)}
					total={Math.ceil((pets?.length ?? 0) / petsFilters._limit)}
				/>
			</Group>
		</>
	);
};

export default ListPets;

// grid grid-cols-6
