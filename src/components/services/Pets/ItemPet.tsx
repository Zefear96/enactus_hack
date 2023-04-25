import React from "react";
import { Card, Text, Loader } from "@mantine/core";
import { Pet } from "@/utils/types";
import Link from "next/link";
import { useFetchCategories } from "@/services/pets/fetchCategories";

import phone_blue from "../../../../public/phone_blue.png";
import address_blue from "../../../../public/address_blue.png";
import Image from "next/image";
import { useDispatch } from "react-redux";

type Props = {
	item: Pet;
};

const ItemPet = ({ item }: { item: Pet }) => {
	// console.log(item);
	const [categories] = useFetchCategories();

	const [loading, setLoading] = React.useState(true);

	return (
		<Link href={`/services/pets/${item.id}`}>
			<Card
				shadow="sm"
				padding="xl"
				className=" mx-auto"
				style={{
					background: "#FFD437",
					borderRadius: "8px",
				}}
			>
				<Card.Section>
					{loading && (
						<Loader
							color="violet"
							variant="dots"
							style={{ height: "300px", margin: "auto", scale: "1.5" }}
						/>
					)}

					<Image
						src={item.image}
						alt="error"
						width={1000}
						height={1000}
						style={{
							objectFit: "cover",
							objectPosition: "center",
							height: "300px",
							width: "100%",
						}}
						onLoad={() => setLoading(false)}
					/>
				</Card.Section>

				<div className=" h-16">
					<Text weight={700} size="xl" mt="md">
						{item.title.substring(0, 30) + " ..."}
					</Text>
				</div>
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
				<Text
					mt="md"
					color="dimmed"
					size="md"
					className="flex items-center"
					c="black"
				>
					<Image src={address_blue} alt="error" className=" me-3 h-full" />
					{item.address}
				</Text>
				<Text
					mt="md"
					color="dimmed"
					size="md"
					className="flex items-center"
					c="black"
				>
					<Image src={phone_blue} alt="error" className=" me-3 h-full" />
					{item.contact}
				</Text>
			</Card>
		</Link>
	);
};

export default ItemPet;
