import React from "react";
import { Card, Text } from "@mantine/core";
import { Pet } from "@/utils/types";
import Link from "next/link";
import { useFetchCategories } from "@/services/pets/fetchCategories";

import phone_blue from "../../../../public/phone_blue.png";
import address_blue from "../../../../public/address_blue.png";
import Image from "next/image";

type Props = {
	item: Pet;
};

const ItemPet = ({ item }: { item: Pet }) => {
	// console.log(item);
	const [categories] = useFetchCategories();

	return (
		<Link href={`/services/pets/${item.id}`}>
			<div
				// style={{ width: "300px" }}
				className=" mx-auto flex w-full rounded-lg max-sm:flex-col"
				style={{
					background: "#F3F3F3",
					borderRadius: "8px",
					boxShadow:
						"-4px 0px 4px rgba(117, 117, 117, 0.1), 4px 0px 4px rgba(117, 117, 117, 0.1), 0px 4px 4px rgba(117, 117, 117, 0.1)",
					borderColor: "#CCCCFF",
					borderWidth: "2px",
				}}
			>
				<div className=" relative w-1/3">
					<Image
						src={item.image}
						alt="error"
						width={1000}
						height={1000}
						style={{
							objectFit: "cover",
							objectPosition: "center",
							height: "100%",
							width: "100%",
							borderTopLeftRadius: "8px",
							borderBottomLeftRadius: "8px",
						}}
					/>
				</div>

				<div className=" w-full ms-5">
					<Text weight={700} size="xl" mt="md">
						{item.title}
					</Text>
					<Text size="md" mt="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)" }}>Возраст: </span>
						{item.age}
					</Text>
					<Text mt="md" color="dimmed" size="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)" }}>
							Категория животных:{" "}
						</span>
						{categories?.map((cat) =>
							cat.id === item.category ? cat.title : "",
						)}
					</Text>
					<Text mt="md" color="dimmed" size="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)" }}>Порода: </span>
						{item.breed}
					</Text>
					<Text mt="md" color="dimmed" size="md" className="flex" c="black">
						<Image src={address_blue} alt="error" className=" me-3" />
						{item.address}
					</Text>
					<Text mt="md" color="dimmed" size="md" className="flex" c="black">
						<Image src={phone_blue} alt="error" className=" me-3" />
						{item.contact}
					</Text>
					<Link href={`/services/pets/edit/${item.id}`}>
						<button className=" border-yellow-500 border-solid border w-3/4 h-10 my-5 rounded-lg  hover:bg-primary transition: ease-in-out transition-colors">
							Изменить
						</button>
					</Link>
				</div>
			</div>
		</Link>
	);
};

export default ItemPet;
