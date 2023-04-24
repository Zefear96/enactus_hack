import { useState } from "react";
import ListCommercials from "./commercial/ListCommercials";
import Image from "next/image";
import ListPets from "./Pets/ListPets";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{
			label: "Хостелы/Приюты",
			content: <ListCommercials />,
			img: "/home.png",
		},
		{
			label: "Вет.клиники/Аптеки",
			content: <p>"Вет.клиники/Аптеки"</p>,
			img: "/healer.png",
		},
		{
			label: "Акссесуары",
			content: <p>"Акссесуары"</p>,
			img: "/accessory.png",
		},
		{
			label: "Животные даром",
			content: <ListPets />,
			img: "/petfree.png",
		},
	];

	return (
		<div className="w-full max-w-screen-xl mx-auto my-10">
			<div className="flex">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`${
							activeTab === index
								? " bg-yellowlogin text-bluelogin"
								: "bg-white text-gray-700"
						} flex-1 py-4 px-6 font-medium text-md focus:outline-none border border-bluelogin rounded-lg`}
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
