import React, { useState } from "react";
import Link from "next/link";
import { Card, Text, Group, Rating, Title, Loader } from "@mantine/core";
import Image from "next/image";
import contact from "../../../../public/contact.png";
import address from "../../../../public/address.png";
import time from "../../../../public/time.png";
import globe from "../../../../public/globe.png";
import styles from "./styles/itemCommStyles.module.css";

type Props = {
	id: number;
	title: string;
	category: number;
	description: string;
	address: string;
	contact: string;
	social_net: string;
	image: any;
	is_confirmed: boolean;
	ratings: {
		rating__avg: number | null;
	};
};

const ItemCommercial = ({ item }: { item: Props }) => {
	console.log(item);
	const [loading, setLoading] = React.useState(true);

	const imageURL =
		typeof item.image === "string"
			? item.image
			: URL.createObjectURL(item.image);

	return (
		<Card
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			className={styles.card}
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
					className={styles.picture}
					src={
						item.image
							? imageURL
							: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
					}
					alt="error :("
					width={1000}
					height={1000}
					style={{ width: "100%", height: "100%" }}
					onLoad={() => setLoading(false)}
				/>
			</Card.Section>
			<Link href={`/services/commercials/${item.id}`} key={item.id}>
				<Group mt="10px" mb="xs">
					<Title weight={700} className={styles.titles}>
						{item.category === 1
							? `Приют`
							: item.category === 2
							? `Клиника/Аптека`
							: item.category === 3
							? `Зоомагазин`
							: ``}
					</Title>
					<Title weight={700} className={styles.titles} c="#FFC800">
						`"{item.title}"`
					</Title>
				</Group>
				<Rating
					value={item.ratings.rating__avg ? item.ratings.rating__avg : 0}
					readOnly
				/>
				<Text mt="xs" size="sm" className={styles.block_text}>
					<Image src={address} alt="error" style={{ marginRight: "10px" }} />
					{item.address}
				</Text>

				<Text mt="xs" size="sm" className={styles.block_text}>
					<Image src={time} alt="error" style={{ marginRight: "10px" }} />
					Ежедневно 08:00-22:00
				</Text>
				<Text mt="xs" size="sm" className={styles.block_text}>
					<Image src={contact} alt="error" style={{ marginRight: "10px" }} />
					{item.contact}
				</Text>
			</Link>
			<Text mt="xs" size="sm" className={styles.block_text}>
				<Image src={globe} alt="error" style={{ marginRight: "10px" }} />
				<Link href={item.social_net} target="_blank">
					{item.social_net}
				</Link>
			</Text>
		</Card>
	);
};

export default ItemCommercial;
