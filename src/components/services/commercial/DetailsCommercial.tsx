import React, { useState } from 'react';
import { Card, Text, Group, Rating, Title } from "@mantine/core";
import Image from "next/image";
import contact from '../../../../public/contact.png';
import address from '../../../../public/address.png';
import time from '../../../../public/time.png';
import globe from '../../../../public/globe.png';
import { Commercial } from '@/utils/types';
import Link from "next/link";
import { usePutRating } from '@/services/commercials/putRating';
import styles from './styles/detailCommStyles.module.css';

type Props = {
    item: Commercial;
};

const DetailsCommercial = ({ item }: Props) => {

    const [value, setValue] = useState(0);
    const [ratingOpen, setRatingOpen] = useState(false)
    const [putRating] = usePutRating();

    return (
        <div className={styles.mainDetail}>
            <Card
                shadow="sm" padding="lg" radius="md" withBorder
                className={styles.card}
            >

                <Card.Section>
                    <img
                        className={styles.picture}
                        src={
                            item.image
                                ? item.image
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
                        }
                        alt="error :("
                    />
                </Card.Section >

                <Group mt="10px" mb="xs">
                    <Title weight={700} className={styles.titles} >{item.category === 1 ? "Приют" : item.category === 2 ? 'Клиника/Аптека' : item.category === 3 ? 'Зоомагазин' : ''}</Title>
                    <Title weight={700} c="#FFC800" className={styles.titles}>"{item.title}"</Title>
                </Group>
                <Rating value={item.ratings.rating__avg ? item.ratings.rating__avg : 0} readOnly defaultValue={0} />
                <button className={`  text-bluelogin ${styles.rating_btn}`} onClick={() => setRatingOpen(true)}>Поставить оценку</button>
                {ratingOpen ? (<div className='flex mt-2'><Rating onChange={setValue} />
                    <button className={` text-bluelogin ml-2 text-xs ${styles.rating_btn}`} onClick={() => {
                        putRating({ id: item.id, rating: value });
                        setRatingOpen(false)
                    }}>Оценить</button></div>) : null}
                <Text mt="xs" size="sm" className={` ${styles.text} flex items-end`}>
                    {item.description}
                </Text>

                <Text mt="xs" size="sm" className={` ${styles.text} flex items-end`}>
                    <Image src={address} alt="error" style={{ marginRight: '10px' }} />
                    {item.address}
                </Text>

                <Text mt="xs" size="sm" className={` ${styles.text} flex items-end`}>
                    <Image src={time} alt="error" style={{ marginRight: '10px' }} />
                    Ежедневно 08:00-22:00
                </Text>
                <Text mt="xs" size="sm" className={` ${styles.text} flex items-end`}>
                    <Image src={contact} alt="error" style={{ marginRight: '10px' }} />
                    {item.contact}
                </Text>
                <Text mt="xs" size="sm" className={` ${styles.text} flex items-end`}>
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