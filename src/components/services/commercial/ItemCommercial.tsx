import React from 'react';
import Link from "next/link";
import { Card, Text, Group, createStyles } from "@mantine/core";
import Image from "next/image";
import contact from '../../../../public/contact.png';
import address from '../../../../public/address.png';
import time from '../../../../public/time.png';
import globe from '../../../../public/globe.png';

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

//mantine 
const useStyles = createStyles((theme) => ({

    card: {
        margin: '2rem auto',
        borderRadius: '10px',
        borderColor: '#CCCCFF !important',
        boxShadow: '-4px 0px 4px rgba(117, 117, 117, 0.1), 4px 0px 4px rgba(117, 117, 117, 0.1), 0px 4px 4px rgba(117, 117, 117, 0.1);',
    },
    picture: {
        objectFit: 'contain',
        height: '300px',
        width: '600px',
        // borderColor: '#CCCCFF !important',
        borderBottom: '1px solid #CCCCFF',
        // borderRadius: '8px 8px 0px 0px'
    }

}));

const ItemCommercial = ({ item }: { item: Props }) => {
    const { classes } = useStyles();
    console.log(item);


    const imageURL =
        typeof item.image === "string" ? item.image : URL.createObjectURL(item.image);

    return (
        <Link href={`/services/commercials/${item.id}`}>
            <Card
                shadow="sm" padding="lg" radius="md" withBorder
                className={classes.card}
            >
                <Card.Section>
                    <img
                        className={classes.picture}
                        src={
                            item.image
                                ? imageURL
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
                        }
                        alt="error :("
                    />
                </Card.Section>

                <Group mt="10px" mb="xs">
                    <Text weight={700} size="36px" >{item.category}</Text>
                    <Text weight={700} size="36px" c="#FFC800">"{item.title}"</Text>
                </Group>

                <Text mt="xs" size="sm" className='flex items-end '>
                    <Image src={address} alt="error" style={{ marginRight: '10px' }} />
                    {item.address}
                </Text>

                <Text mt="xs" size="sm" className='flex items-end '>
                    <Image src={time} alt="error" style={{ marginRight: '10px' }} />
                    Ежедневно 08:00-22:00
                </Text>
                <Text mt="xs" size="sm" className='flex items-end'>
                    <Image src={contact} alt="error" style={{ marginRight: '10px' }} />
                    {item.contact}
                </Text>
                <Text mt="xs" size="sm" className='flex items-end'>
                    <Image src={globe} alt="error" style={{ marginRight: '10px' }} />
                    <a href={item.social_net}>
                        {item.social_net}
                    </a>
                </Text>
            </Card>
        </Link>
    )
}

export default ItemCommercial