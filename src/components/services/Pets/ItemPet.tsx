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

	// const imageUrl =
	// 	typeof item.image === "string"
	// 		? item.image
	// 		: URL.createObjectURL(item.image);

	return (
		<Link href={`/services/pets/${item.id}`}>
			<Card
				shadow="sm"
				padding="xl"
				// style={{ width: "300px" }}
				className=" mx-auto"
				style={{
					background: "#FFD437",
					borderRadius: "8px",
				}}
			>
				<Card.Section>
					{/* <Image
						src={item.image}
						height={300}
						alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
						style={{ objectFit: "cover", objectPosition: "center" }}
					/> */}
					<Image
						src={item.image}
						alt="error"
						width={400}
						height={300}
						style={{
							objectFit: "cover",
							objectPosition: "center",
							height: "300px",
							width: "100%",
						}}
					/>
				</Card.Section>

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
			</Card>
		</Link>
	);
};

export default ItemPet;
