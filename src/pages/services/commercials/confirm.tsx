import React from 'react'
import { Group, Text } from "@mantine/core";
import Link from 'next/link';
import styles from '../../../components/services/commercial/styles/confirmStyles.module.css'

const CommercialConfirm = () => {
    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className=" bg-greybase w-2/5 rounded-3xl lg:w-3/5 md:w-4/5 max-sm:w-4/5" style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <div className="w-4/5 mx-auto my-5">
                    <Text ta="center" fw={500} fz="lg" my="70px" className={styles.text}>Для проверки информации модератором
                        требуется время. После проверки,
                        администратор сайта выйдет на связь
                        с Вами. Спасибо за понимание.</Text>
                    <Group position="center" mb="40px">
                        <Text c="dimmed" fz="lg" className={styles.text} >Остались вопросы? <br /> <Link href="/reviews/add/" className=' text-blue-500' >Свяжитесь с нами</Link> </Text>
                    </Group>
                </div>
            </div>
        </div>
    )
}

export default CommercialConfirm

// TODO redirect на Контакты