import React, { useState } from 'react';
import { Card, Text, Group, createStyles, Rating } from "@mantine/core";
import Image from "next/image";
import contact from '../../../../public/contact.png';
import address from '../../../../public/address.png';
import time from '../../../../public/time.png';
import globe from '../../../../public/globe.png';
import { Commercial } from '@/utils/types';
import Link from "next/link";
import { usePutRating } from '@/services/commercials/putRating';

type Props = {
    item: Commercial;
};

//mantine 
const useStyles = createStyles((theme) => ({

    card: {
        margin: 'auto',
        borderRadius: '10px',
        borderColor: '#CCCCFF !important',
        boxShadow: '-4px 0px 4px rgba(117, 117, 117, 0.1), 4px 0px 4px rgba(117, 117, 117, 0.1), 0px 4px 4px rgba(117, 117, 117, 0.1);',
        width: '41%'
    },
    picture: {
        objectFit: 'contain',
        height: '300px',
        borderBottom: '1px solid #CCCCFF',
    },
    mainDetail: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2.5rem 0'
    }

}));

const DetailsCommercial = ({ item }: Props) => {
    const { classes } = useStyles();
    const [value, setValue] = useState(0);
    const [ratingOpen, setRatingOpen] = useState(false)
    const [putRating] = usePutRating();

    return (
        <div className={classes.mainDetail}>
            <Card
                shadow="sm" padding="lg" radius="md" withBorder
                className={classes.card}
            >
                <Card.Section>
                    <img
                        className={classes.picture}
                        src={
                            item.image
                                ? item.image
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
                        }
                        alt="error :("
                    />
                </Card.Section>

                <Group mt="10px" mb="xs">
                    <Text weight={700} size="36px" >{item.category}</Text>
                    <Text weight={700} size="36px" c="#FFC800">"{item.title}"</Text>
                </Group>
                <Rating value={item.ratings.rating__avg ? item.ratings.rating__avg : 0} readOnly defaultValue={0} />
                <button className=' text-bluelogin' onClick={() => setRatingOpen(true)}>Поставить оценку</button>
                {ratingOpen ? (<div className='flex mt-2'><Rating onChange={setValue} />
                    <button className=' text-bluelogin ml-2 text-xs' onClick={() => {
                        putRating({ id: item.id, rating: value });
                        setRatingOpen(false)
                    }}>Оценить</button></div>) : null}
                <Text mt="xs" size="sm" className='flex items-end'>
                    {item.description}
                </Text>

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
        </div>
    )
}

export default DetailsCommercial