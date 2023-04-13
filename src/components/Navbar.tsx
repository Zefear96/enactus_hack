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
			link: "/lang",
		},
		{
			type: "Вет.клиники/Аптеки",
			link: "/lang",
		},
		{
			type: "Акссесуары",
			link: "/lang",
		},
		{
			type: "Зоомагазины",
			link: "/lang",
		},
		{
			type: "Купить питомца",
			link: "/lang",
		},
		{
			type: "Животные даром",
			link: "/lang",
		},
	];

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<nav className="flex justify-between items-center max-w-screen-xl mx-auto mt-7">
			<div>
				<Image
					src={logo}
					alt="rerer"
					width={100}
					height={100}
					className="mx-4"
				/>
			</div>

			<div className="flex items-center space-x-10 w-11/12 justify-around">
				<button className="flex items-center">
					Бишкек <Image src={geomap} alt="error" className="mx-auto" />
				</button>

				<div className="relative">
					<input
						type="text"
						placeholder="Найти питомца"
						className="rounded-md pl-8 pr-3 py-2 bg-slate-300 text-gray-900 focus:outline-none relative h-14"
						style={{ width: "600px" }}
					/>
					<button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary h-full w-14 rounded-r-md">
						<Image src={searchIcon} alt="error" className="mx-auto"></Image>
					</button>
				</div>
				<select name="lang" id="">
					{lang.map((item) => (
						<option value="">{item.type}</option>
					))}
				</select>
				<div className="flex mx-auto justify-center">
					<Menu as="div" className="relative inline-block text-left mx-auto">
						<div>
							<Menu.Button className="inline-flex justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								Услуги
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
							<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								{services.map((item) => (
									<div className="px-1 py-1" key={item.type}>
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active
															? "bg-violet-500 text-white"
															: "text-gray-900"
													} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
												>
													{item.type}
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

			<button className="bg-secondary w-24 h-12 rounded-2xl shadow-xl shadow-primary shadow-outline">
				Войти
			</button>
		</nav>

		// <nav className="bg-gray-800">
		// 	<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		// 		<div className="flex justify-between h-16">
		// 			<div className="flex items-center">
		// 				<div className="flex-shrink-0">
		// 					<Link href="/">
		// 						<a className="text-white font-bold text-2xl">My Website</a>
		// 					</Link>
		// 				</div>
		// 				<div className="hidden md:block">
		// 					<div className="ml-10 flex items-baseline">
		// 						<Link href="/about">
		// 							<a className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">
		// 								About
		// 							</a>
		// 						</Link>
		// 						<Link href="/blog">
		// 							<a className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">
		// 								Blog
		// 							</a>
		// 						</Link>
		// 						<Link href="/contact">
		// 							<a className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">
		// 								Contact
		// 							</a>
		// 						</Link>
		// 					</div>
		// 				</div>
		// 			</div>
		// 			<div className="hidden md:block">
		// 				<div className="flex items-center">
		// 					<div className="relative">
		// 						<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
		// 							<svg
		// 								className="h-5 w-5 text-gray-400"
		// 								fill="currentColor"
		// 								viewBox="0 0 20 20"
		// 								// xmlns="http://www.w3.org/2000/svg"
		// 							>
		// 								<path
		// 									fillRule="evenodd"
		// 									clipRule="evenodd"
		// 									d="M14.498 12.665C16.053 11.142 17 9.13 17 7c0-4.411-3.589-8-8-8S1 2.589 1 7s3.589 8 8 8c2.087 0 3.994-.785 5.465-2.073l3.67 3.67 1.414-1.414-3.67-3.67zm-6.498 1.335C4.947 14 3 11.866 3 9.5S4.947 5 7 5s4 2.134 4 4.5-1.947 4.5-4 4.5z"
		// 								/>
		// 							</svg>
		// 						</span>
		// 						<input
		// 							className="block w-full bg-gray-900 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:bg-white focus:text-gray-900"
		// 							type="text"
		// 							placeholder="Search"
		// 							value={searchTerm}
		// 							onChange={(e) => setSearchTerm(e.target.value)}
		// 						/>
		// 					</div>
		// 				</div>
		// 				<div className="-mr-2 flex md:hidden">
		// 					<button
		// 						onClick={toggleMenu}
		// 						type="button"
		// 						className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
		// 						aria-controls="mobile-menu"
		// 						aria-expanded="false"
		// 					>
		// 						<span className="sr-only">Open main menu</span>
		// 						{/* <MenuIcon className="h-6 w-6" /> */}
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div
		// 		className={`${isOpen ? "block" : "hidden"} md:hidden`}
		// 		id="mobile-menu"
		// 	>
		// 		<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
		// 			<Link href="/about">
		// 				<a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
		// 					About
		// 				</a>
		// 			</Link>
		// 			<Link href="/blog">
		// 				<a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
		// 					Blog
		// 				</a>
		// 			</Link>
		// 			<Link href="/contact">
		// 				<a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
		// 					Contact
		// 				</a>
		// 			</Link>
		// 		</div>
		// 		<div className="pt-4 pb-3 border-t border-gray-700">
		// 			<div className="flex items-center px-5">
		// 				<div className="flex-shrink-0">
		// 					<svg
		// 						className="h-8 w-8 text-white"
		// 						// xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 						aria-hidden="true"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth={2}
		// 							d="M4 6h16M4 12h16M4 18h16"
		// 						/>
		// 					</svg>
		// 				</div>
		// 				<div className="ml-3">
		// 					<div className="text-base font-medium text-white">Menu</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>

		// 	<div className="hidden md:block">
		// 		<div className="flex items-center">
		// 			<Link href="/login">
		// 				<a className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
		// 					Войти
		// 				</a>
		// 			</Link>
		// 		</div>
		// 	</div>
		// </nav>
	);
};

export default Navbar;
