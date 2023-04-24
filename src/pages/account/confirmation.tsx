import React from 'react'
import { Group, Text, Title } from "@mantine/core";
import Link from 'next/link';
import styles from '../../components/account/styles/confirmationStyles.module.css';

const Confirmation = () => {
    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className={`${styles.main} bg-greybase w-2/5 rounded-3xl`} style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <div className="w-4/5 mx-auto my-5">
                    <Title ta="center" fw={700} my="40px" className={styles.title}>Подтвердите вашу почту</Title>
                    <Text ta="center" fw={500} fz="lg" my="70px">Письмо с подтверждением было отправлено на
                        example@gmail.com. Пожалуйста, перейдите по ссылке
                        внутри письма, чтобы начать использовать ZooNet.</Text>
                    <Group position="center" mb="40px">
                        <Text c="dimmed" fz="lg">Есть жалобы? <Link href="/reviews/add/" className=' text-blue-500' >Свяжитесь с нами</Link> </Text>
                    </Group>
                </div>
            </div>
        </div>
    )
}

export default Confirmation

// TODO поменять редирект на страницу жалоб и отзывов