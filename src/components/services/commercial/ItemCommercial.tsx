import React from 'react';
import Link from "next/link";
import { Card, Image, Text } from "@mantine/core";


type Props = {
    id: number;
    title: string;
    category: string;
    description: string;
    address: string;
    contact: string;
    social_net: string;
    image: any;
    is_confirmed: boolean;
}

const ItemCommercial = ({ item }: { item: Props }) => {

    const imageURL =
        typeof item.image === "string" ? item.image : URL.createObjectURL(item.image)

    return (
        <Link href={`/services/pets/${item.id}`}>
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
                                ? imageURL
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
    )
}

export default ItemCommercial