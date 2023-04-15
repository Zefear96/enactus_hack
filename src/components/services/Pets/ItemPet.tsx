import React from "react";
import { Card, Image, Text } from "@mantine/core";
import { Pet } from "@/utils/types";
import Link from "next/link";

type Props = {
	owner: string;
	id: number;
	title: string;
	breed: string;
	image: any;
	description: string;
	price: number;
	category: number;
};

// interface Props extends Pets {
// 	image: string | null | File;
// }

const ItemPet = ({ item }: { item: Props }) => {
	console.log(item);

	const imageUrl =
		typeof item.image === "string"
			? item.image
			: URL.createObjectURL(item.image);

	return (
		<Link href={`/services/list/${item.id}`}>
			<Card
				shadow="sm"
				padding="xl"
				// style={{ width: "300px" }}
				className=" mx-auto my-8"
			>
				<Card.Section>
					<Image
						src={
							item.image
								? imageUrl
								: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
						}
						height={160}
						alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
					/>
				</Card.Section>

				<Text weight={500} size="lg" mt="md">
					{item.title}
				</Text>

				<Text mt="xs" color="dimmed" size="sm">
					{item.description}
				</Text>
			</Card>
		</Link>
	);
};

export default ItemPet;
