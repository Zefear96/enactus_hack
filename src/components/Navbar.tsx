import Image from "next/image";
import logo from "../../public/logo.png";
import geomap from "../../public/geomap.png";
import searchIcon from "../../public/searchIcon.png";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useLogout } from "@/services/user/logout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChangeEvent } from "react";
import { setSearchText } from "@/store/slices/petsFilters.slice";
import { useFetchGeo } from "@/services/user/fetchGeolocation";
import { useFetchUser } from "@/services/user/fetchUser";

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
		dispatch(setSearchText(val));
	};

	async function handleGetGeo() {
		const currentCity = await data.city.split(" ");
		// console.log(currentCity);

		if (data === null || data === undefined) setCity("Unnamed Road");
		setCity(currentCity[1].toString());
	}

	return (
		<nav className="flex justify-between items-center max-w-screen-xl mx-auto mt-7">
			<Link href="/">
				<Image
					src={logo}
					alt="error"
					width={110}
					height={120}
					className="mx-auto"
				/>
			</Link>

			<div className="flex items-center space-x-10 w-11/12 justify-around">
				<button className="flex items-center" onClick={handleGetGeo}>
					<span style={{ width: "100px" }}>{city} </span>
					<Image src={geomap} alt="error" className="mx-2" />
				</button>

				<div className="relative">
					<input
						type="text"
						placeholder="Найти питомца"
						className="rounded-md pl-8 pr-3 py-2  text-gray-900 focus:outline-none relative h-14 border-gray-400 border"
						style={{ width: "600px" }}
						value={searchText}
						onChange={handleChange}
					/>
					<button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary h-full w-14 rounded-r-md">
						<Image src={searchIcon} alt="error" className="mx-auto"></Image>
					</button>
				</div>

				<div className="relative inline-flex">
					<select className="block appearance-none w-full hover:border-gray-500 px-4 py-2 pr-8 rounded cursor-pointer leading-tight focus:outline-none focus:shadow-outline">
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
							<Menu.Button className="inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								Услуги
								<svg
									className="fill-current h-4 w-4 mx-4"
									// xmlns="http://www.w3.org/2000/svg"
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
			</div>

			{!user ? (
				<div className="relative">
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
							<span className="flex items-center mx-auto justify-center">
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
								src={user.profile_image ? user.profile_image : ""}
								width={100}
								height={100}
								alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU"
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
