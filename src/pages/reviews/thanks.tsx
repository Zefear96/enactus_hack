import React from 'react'
import { Group, Text, Title } from "@mantine/core";
import Link from 'next/link';
import styles from '../../components/reviews/thanksStyles.module.css';

const ReviewThanks = () => {
    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className={` bg-greybase w-2/5 rounded-3xl md:w-3/5 lg:w-2/4`} style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <div className="w-4/5 mx-auto my-5">
                    <Title ta="center" fw={700} my="30px" className={styles.title}>Спасибо за обратную связь!</Title>
                    <Group position="center" mb="40px">
                        <Text c="dimmed" fz="lg" className={styles.text}>Это поможет нам улучшить качество нашей работы!</Text>
                    </Group>
                </div>
            </div>
        </div>
    )
}

export default ReviewThanks