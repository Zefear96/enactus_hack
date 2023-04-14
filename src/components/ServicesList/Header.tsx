import { useState } from "react";
import { Tab } from "@headlessui/react";
import home from "../../../public/home.png";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	let [categories] = useState({
		"Хостелы/Приюты": [
			{
				id: 1,
				title: "Does drinking coffee make you smarter?",
				date: "5h ago",
				commentCount: 5,
				shareCount: 2,
				// link: "../public/home.png",
			},
			{
				id: 2,
				title: "So you've bought coffee... now what?",
				date: "2h ago",
				commentCount: 3,
				shareCount: 2,
				// link: "../public/",
			},
		],
		"Вет.клиники/Аптеки": [
			{
				id: 1,
				title: "Is tech making coffee better or worse?",
				date: "Jan 7",
				commentCount: 29,
				shareCount: 16,
				// link: "../public/",
			},
			{
				id: 2,
				title: "The most innovative things happening in coffee",
				date: "Mar 19",
				commentCount: 24,
				shareCount: 12,
				// link: "../public/",
			},
		],
		Акссесуары: [
			{
				id: 1,
				title: "Ask Me Anything: 10 answers to your questions about coffee",
				date: "2d ago",
				commentCount: 9,
				shareCount: 5,
				// link: "../public/",
			},
			{
				id: 2,
				title: "The worst advice we've ever heard about coffee",
				date: "4d ago",
				commentCount: 1,
				shareCount: 2,
				// link: "../public/",
			},
		],
		"Другие услуги": [
			{
				id: 1,
				title: "Ask Me Anything: 10 answers to your questions about coffee",
				date: "2d ago",
				commentCount: 9,
				shareCount: 5,
				// link: "../public/",
			},
			{
				id: 2,
				title: "The worst advice we've ever heard about coffee",
				date: "4d ago",
				commentCount: 1,
				shareCount: 2,
				// link: "/public/",
			},
		],
	});

	return (
		<div className=" w-full px-2 py-16 sm:px-0 mx-auto ">
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1 border-primary ">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 h-12 ",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected
										? "bg-secondary shadow"
										: "text-blue-100 hover:bg-white/[0.12] hover:text-white",
								)
							}
						>
							{/* <Image src="../" alt="error"></Image> */}
							{category}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-2">
					{Object.values(categories).map((posts, idx) => (
						<Tab.Panel
							key={idx}
							className={classNames(
								"rounded-xl bg-white p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
							)}
						>
							<ul>
								{posts.map((post) => (
									<li
										key={post.id}
										className="relative rounded-md p-3 hover:bg-gray-100"
									>
										<h3 className="text-sm font-medium leading-5">
											{post.title}
										</h3>

										<ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
											<li>{post.date}</li>
											<li>&middot;</li>
											<li>{post.commentCount} comments</li>
											<li>&middot;</li>
											<li>{post.shareCount} shares</li>
										</ul>

										<a
											href="#"
											className={classNames(
												"absolute inset-0 rounded-md",
												"ring-blue-400 focus:z-10 focus:outline-none focus:ring-2",
											)}
										/>
									</li>
								))}
							</ul>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
