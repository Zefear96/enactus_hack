import React from "react";
import { Card, Image, Text } from "@mantine/core";
import { Pets } from "@/utils/types";

type Props = {
	item: Pets;
};

const ItemServices = ({ item }: Props) => {
	return (
		<Card
			shadow="sm"
			padding="xl"
			component="a"
			style={{ width: "300px" }}
			className=" mx-auto my-8"
		>
			<Card.Section>
				<Image
					src={
						item.image
							? item.image
							: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
					}
					height={160}
					alt="error"
				/>
			</Card.Section>

			<Text weight={500} size="lg" mt="md">
				{item.title}
			</Text>

			<Text mt="xs" color="dimmed" size="sm">
				{item.description}
			</Text>
		</Card>
	);
};

export default ItemServices;
