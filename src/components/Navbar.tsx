import Image from "next/image";
import logo from "../../public/logo.png";
import geomap from "../../public/geomap.png";
import searchIcon from "../../public/searchIcon.png";
import { Menu, Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { useLogout } from "@/services/user/logout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChangeEvent } from "react";
import { setPage, setSearchText } from "@/store/slices/petsFilters.slice";
import { useFetchGeo } from "@/services/user/fetchGeolocation";
import { useFetchUser } from "@/services/user/fetchUser";
import person_white from "../../public/person_white.png";
import { IconHeart, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";

import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";

type MenuItem = {
	type: string;
	link: string;
};

interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

interface GeocodeResult {
	address_components: AddressComponent[];
}

interface Settings {
	name: string;
	onClick: () => void;
}

const Navbar = () => {
	const logout = useLogout();

	// SEARCH
	const dispatch = useAppDispatch();
	const searchText = useAppSelector((state) => state.petsFilters.search);

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// GEOLOCATION
	const [city, setCity] = useState<string | null>(null);
	const [data] = useFetchGeo();
	// console.log(data);

	// USER
	const [user, { isLoading, isError }] = useFetchUser();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	function toggleMenuUser() {
		setIsMenuOpen(!isMenuOpen);
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value;
		dispatch(setPage(1));
		dispatch(setSearchText(val));
	};

	async function handleGetGeo() {
		const currentCity = await data.city.split(" ");
		// console.log(currentCity);

		if (data === null || data === undefined) setCity("Unnamed Road");
		setCity(currentCity[1].toString());
	}

	const [opened, { open, close }] = useDisclosure(false);

	return (
		<nav className="flex justify-between items-center max-w-screen-xl mx-auto mt-7">
			<div className="flex-shrink-0">
				<Link href="/">
					<Image
						src={logo}
						alt="error"
						width={110}
						height={120}
						className="mx-5 sm: w-16"
					/>
				</Link>
			</div>

			<div className=" flex w-full max-sm:hidden">
				<button
					className="flex items-center max-md:hidden"
					onClick={handleGetGeo}
				>
					<span style={{ width: "100px" }}>{city} </span>
					<Image src={geomap} alt="error" className="mx-2" />
				</button>
				<div className=" w-full  flex items-center">
					<div className="relative w-3/4">
						<input
							type="text"
							placeholder="Найти питомца"
							className="rounded-md pl-8 pr-3 py-2  text-gray-900 focus:outline-none relative h-14 border-gray-400 border w-full"
							// style={{ width: "600px" }}
							value={searchText}
							onChange={handleChange}
						/>
						<button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary h-full w-14 rounded-r-md">
							<Image src={searchIcon} alt="error" className="mx-auto"></Image>
						</button>
					</div>

					<div className="relative inline-flex max-md:hidden ">
						<select className="block appearance-none hover:border-gray-500 px-4 py-2 pr-8 rounded cursor-pointer leading-tight focus:outline-none focus:shadow-outline max-lg:text-sm ">
							<option>Рус</option>
							<option>Кырг</option>
							<option>Англ</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								// xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M10 12l-6-6h12z" />
							</svg>
						</div>
					</div>
					<div className="flex mx-auto justify-center">
						<Menu as="div" className="relative inline-block text-left mx-auto">
							<div>
								<Menu.Button className=" inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-md font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 max-lg:text-sm md:p-0">
									Услуги
									<svg
										className="fill-current h-4 w-4 mx-4"
										viewBox="0 0 20 20"
									>
										<path d="M10 12l-6-6h12z" />
									</svg>
								</Menu.Button>
							</div>
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
									{services.map((item) => (
										<div className="px-1 py-1" key={item.type}>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active ? "bg-primary text-white" : "text-gray-900"
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													>
														<Link href={item.link}>{item.type}</Link>
													</button>
												)}
											</Menu.Item>
										</div>
									))}
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					<Link href={"/favorites"} className=" w-10 mr-10">
						<IconHeart
							className=" cursor-pointer md:w-7"
							size="2rem"
							color="#4526FF"
						/>
					</Link>
				</div>
			</div>

			<Drawer
				opened={opened}
				onClose={close}
				overlayProps={{ opacity: 0.5 }}
				size={500}
				position="top"
			>
				<div className=" flex-col justify-center items-center">
					<div className="mx-auto flex justify-center">
						<div className="absolute">
							<input
								type="text"
								placeholder="Найти питомца"
								className="rounded-md pl-8 pr-3 py-2  text-gray-900 focus:outline-none relative h-14 border-gray-400 border w-full"
								value={searchText}
								onChange={handleChange}
							/>
							<button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary h-full w-14 rounded-r-md">
								<Image src={searchIcon} alt="error" className="mx-auto"></Image>
							</button>
						</div>
					</div>

					<div className="flex mx-auto justify-center text-lg mt-5">
						<Menu as="div" className="relative inline-block ">
							<div>
								<Menu.Button className=" inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-md font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-16">
									Услуги
									<svg
										className="fill-current h-4 w-4 mx-4"
										viewBox="0 0 20 20"
									>
										<path d="M10 12l-6-6h12z" />
									</svg>
								</Menu.Button>
							</div>
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
									{services.map((item) => (
										<div className="px-1 py-1" key={item.type}>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active ? "bg-primary text-white" : "text-gray-900"
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													>
														<Link href={item.link}>{item.type}</Link>
													</button>
												)}
											</Menu.Item>
										</div>
									))}
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					<Link
						href={"/favorites"}
						className=" flex items-center mx-auto justify-center text-xl my-5"
					>
						Избранное
						<IconHeart
							className=" cursor-pointer mx-2"
							size="1.6rem"
							color="#4526FF"
						/>
					</Link>

					<div className="mx-auto flex justify-center">
						<div className="relative inline-flex">
							<select className="block appearance-none hover:border-gray-500 px-4 py-2 pr-8 rounded cursor-pointer leading-tight focus:outline-none focus:shadow-outline text-xl">
								<option>Рус</option>
								<option>Кырг</option>
								<option>Англ</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
									<path d="M10 12l-6-6h12z" />
								</svg>
							</div>
						</div>
					</div>
					<Link href="/">
						<Image
							src={logo}
							alt="error"
							width={110}
							height={120}
							className="mx-auto my-5"
						/>
					</Link>
				</div>
			</Drawer>

			<Group position="center">
				<button onClick={open} className=" hidden max-sm:block">
					<IconMenu2 color="black" />
				</button>
			</Group>

			{!user ? (
				<div className="relative right-4 ">
					<Link href="/account/login">
						<button
							style={{
								color: "blue",
								backgroundColor: "yellow",
								boxShadow: "10px 10px 0px 4px #988CE1",
								borderRadius: "16px",
								transition: "all 0.3s ease",
								height: "60px",
								width: "100px",
								// marginTop: "15px",
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.backgroundColor = "blue";
								e.currentTarget.style.color = "yellow";
								e.currentTarget.style.boxShadow = "none";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.backgroundColor = "yellow";
								e.currentTarget.style.color = "blue";
								e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
							}}
						>
							<span className="flex items-center mx-auto justify-center ">
								Войти
							</span>
						</button>
					</Link>
				</div>
			) : (
				<div className="relative" ref={menuRef}>
					<button
						className="bg-gray-300 rounded-full p-2 hover:bg-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 w-16 h-16"
						onClick={toggleMenuUser}
					>
						{user && (
							<Image
								src={user.profile_image ? user.profile_image : person_white}
								width={100}
								height={100}
								alt="error"
								className=" rounded-full"
							/>
						)}
					</button>

					{isMenuOpen && (
						<div className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg z-10">
							<ul>
								<Link href="/account/">
									<li className="px-4 py-2 hover:bg-primary transition-colors duration-300 cursor-pointer">
										Мой профиль
									</li>
								</Link>
								<Link href="/services/add/pets">
									<li className="px-4 py-2 hover:bg-primary transition-colors duration-300 cursor-pointer">
										Добавить объявление
									</li>
								</Link>
								<li
									className="px-4 py-2 hover:bg-primary transition-colors duration-300 cursor-pointer"
									onClick={() => {
										logout();
										setIsMenuOpen(false);
									}}
								>
									Выйти
								</li>
							</ul>
						</div>
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;

const lang: MenuItem[] = [
	{
		type: "Рус",
		link: "/lang",
	},
	{
		type: "Кырг",
		link: "/lang",
	},
];

const services: MenuItem[] = [
	{
		type: "Хостелы/Приюты",
		link: "/services",
	},
	{
		type: "Вет.клиники/Аптеки",
		link: "/services",
	},
	{
		type: "Акссесуары",
		link: "/services",
	},
	{
		type: "Зоомагазины",
		link: "/services",
	},
	{
		type: "Купить питомца",
		link: "/services",
	},
	{
		type: "Животные даром",
		link: "/services/pets",
	},
];

{
	/* BURGER MENU */
}
{
	/* <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
<div className="block lg:hidden">
	<button
		onClick={() => setIsOpenBurger(!isOpenBurger)}
		className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
	>
		<svg
			className="fill-current h-3 w-3"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Menu</title>
			<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
		</svg>
	</button>
</div>
<div
	className={`${
		isOpenBurger ? "block" : "hidden"
	} lg\:block w-full lg:flex lg:items-center lg:w-auto`}
>
	<div className="text-sm lg:flex-grow">
		<a
			href="#responsive-header"
			className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
		>
			Docs
		</a>
		<a
			href="#responsive-header"
			className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
		>
			Examples
		</a>
		<a
			href="#responsive-header"
			className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white"
		>
			Blog
		</a>
	</div>
	<div>
		<a
			href="#"
			className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
		>
			Download
		</a>
	</div>
</div>
</nav> */
}
