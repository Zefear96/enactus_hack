import Image from "next/image";
import logo from "../../public/logo.png";
import geomap from "../../public/geomap.png";
import searchIcon from "../../public/searchIcon.png";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

type MenuItem = {
	type: string;
	link: string;
};

const Navbar = () => {
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

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);
	const [searchTerm, setSearchTerm] = useState("");

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
				<button className="flex items-center">
					Бишкек <Image src={geomap} alt="error" className="mx-2" />
				</button>

				<div className="relative">
					<input
						type="text"
						placeholder="Найти питомца"
						className="rounded-md pl-8 pr-3 py-2  text-gray-900 focus:outline-none relative h-14 border-gray-400 border"
						style={{ width: "600px" }}
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

			<div className="relative">
				<Link href="/account/login">
					<button
						className="bg-bluelogin text-yellowlogin w-24 h-12 rounded-2xl relative z-[1] hover:bg-yellowlogin hover:text-bluelogin"
						onMouseOver={(e) => {
							e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.boxShadow = "none";
						}}
					>
						Войти
					</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
