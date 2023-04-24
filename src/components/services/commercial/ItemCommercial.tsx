import React, { useState } from 'react';
import Link from "next/link";
import { Card, Text, Group, Rating, Title } from "@mantine/core";
import Image from "next/image";
import contact from '../../../../public/contact.png';
import address from '../../../../public/address.png';
import time from '../../../../public/time.png';
import globe from '../../../../public/globe.png';
import styles from './styles/itemCommStyles.module.css';

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
    ratings: {
        rating__avg: number | null
    }
}


const ItemCommercial = ({ item }: { item: Props }) => {
    console.log(item);

    const imageURL =
        typeof item.image === "string" ? item.image : URL.createObjectURL(item.image);

    return (

        <Card
            shadow="sm" padding="lg" radius="md" withBorder
            className={styles.card}
        >
            <Card.Section>
                <img
                    className={styles.picture}
                    src={
                        item.image
                            ? imageURL
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
                    }
                    alt="error :("
                />
            </Card.Section>
            <Link href={`/services/commercials/${item.id}`} key={item.id}>
                <Group mt="10px" mb="xs">
                    <Title weight={700} className={styles.titles}>{item.category}</Title>
                    <Title weight={700} className={styles.titles} c="#FFC800">"{item.title}"</Title>
                </Group>
                <Rating value={item.ratings.rating__avg ? item.ratings.rating__avg : 0} readOnly />
                <Text mt="xs" size="sm" className={styles.block_text}>
                    <Image src={address} alt="error" style={{ marginRight: '10px' }} />
                    {item.address}
                </Text>

                <Text mt="xs" size="sm" className={styles.block_text}>
                    <Image src={time} alt="error" style={{ marginRight: '10px' }} />
                    Ежедневно 08:00-22:00
                </Text>
                <Text mt="xs" size="sm" className={styles.block_text}>
                    <Image src={contact} alt="error" style={{ marginRight: '10px' }} />
                    {item.contact}
                </Text>
            </Link>
            <Text mt="xs" size="sm" className={styles.block_text}>
                <Image src={globe} alt="error" style={{ marginRight: '10px' }} />
                <Link href={item.social_net} target="_blank" >
                    {item.address}
                </Link>
            </Text>
        </Card>
    )
}

export default ItemCommercial