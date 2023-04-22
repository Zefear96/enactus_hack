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
import { setOrdering, setPage } from "@/store/slices/petsFilters.slice";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { useFetchPets } from "@/services/pets/fetchPets";
import { useEditPet } from "@/services/pets/editPet";
import HeaderMenu from "./HeaderMenu";
import { useFetchCategories } from "@/services/pets/fetchCategories";
import Image from "next/image";
import no_results_img from "../../../../public/no_results_img.png";
import no_results_text from "../../../../public/no_results_text.png";
import { Pet } from "@/utils/types";

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

	const handleChangeSort = (e: React.MouseEvent<HTMLButtonElement>) => {
		const val = e.currentTarget.value;
		console.log(val);

		// if (val in Pet) {
		// 	// проверяем, что val является ключом объекта Pet
		// 	dispatch(setOrdering(val as keyof Pet)); // преобразуем тип val в keyof Pet
		// }
		dispatch(setOrdering(val as keyof Pet));
	};

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

			<div className="main-block-config my-5 flex">
				<div className="left-block-filter w-1/2 ">
					<Menu as="div" className="relative inline-block text-left mx-auto">
						<Menu.Button className="inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-lg font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mx-5">
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
													className={`${active ? "bg-primary text-white" : "text-gray-900"
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
					<button
						className=" text-lg mx-5"
						onClick={() => setSelectedCategory(initCategory)}
					>
						Сбросить фильтр
					</button>
				</div>

				<div className="right-block-filter w-1/2">
					<div className=" flex justify-end">
						<Menu as="div" className="relative inline-block text-left ">
							<Menu.Button className="inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-lg font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mx-5">
								Сортировать по:
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
									{filtersBy?.map((item) => (
										<div className="px-1 py-1" key={item.id}>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active ? "bg-primary text-white" : "text-gray-900"
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														onClick={(e) => {
															e.stopPropagation();
															handleChangeSort(e);
														}}
														value={item.type}
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
					</div>
				</div>
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
						<div className=" flex items-center">
							<Image src={no_results_text} alt="error" />
							<Image src={no_results_img} alt="error" />
						</div>
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
					<div className=" flex items-center">
						<Image src={no_results_text} alt="error" />
						<Image src={no_results_img} alt="error" />
					</div>
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

const filtersBy = [
	{
		title: "А-Я",
		type: "title",
		id: 1,
	},
	{
		title: "Сначала старые",
		type: "id",
		id: 2,
	},
	{
		title: "Cначала свежие",
		type: "-id",
		id: 3,
	},
	{
		title: "Категориям",
		type: "category",
		id: 4,
	},
];
