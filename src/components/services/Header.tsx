import { useState } from "react";
import ListCommercials from "./commercial/ListCommercials";
import Image from "next/image";
import ListPets from "./Pets/ListPets";
import ListClinics from "./commercial/ListClinics";
import ListHostels from "./commercial/ListHostels";
import ListZoo from "./commercial/ListZoo";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{
			label: "Хостелы/Приюты",
			content: <ListHostels />,
			img: "/home.png",
		},
		{
			label: "Вет.клиники/Аптеки",
			content: <ListClinics />,
			img: "/healer.png",
		},
		{
			label: "Зоомагазины",
			content: <ListZoo />,
			img: "/accessory.png",
		},
		{
			label: "Животные даром",
			content: <ListPets />,
			img: "/petfree.png",
		},
	];

	return (
		<div className=" w-11/12 max-w-screen-xl mx-auto my-10">
			<div className=" flex flex-wrap sm:justify-center mx-auto">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`${
							activeTab === index
								? " bg-yellowlogin text-bluelogin"
								: "bg-white text-gray-700"
						} flex-1 py-4 px-6 font-medium text-md focus:outline-none border border-bluelogin rounded-lg sm: w-40 `}
						onClick={() => setActiveTab(index)}
					>
						<Image
							src={tab.img}
							alt="error"
							width={30}
							height={30}
							className=" mx-auto my-2"
						/>
						{tab.label}
					</button>
				))}
			</div>
			<div className="mt-8">{tabs[activeTab].content}</div>
		</div>
	);
}
