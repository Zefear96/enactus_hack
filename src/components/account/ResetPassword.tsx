import React from 'react';
import { Group, Text, Title, TextInput } from "@mantine/core";
import Link from 'next/link';

const ResetPassword = () => {
    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className=" bg-greybase w-2/5 rounded-3xl" style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <div className="w-4/5 mx-auto my-5">
                    <Title ta="center" fw={700} my="40px">Сброс пароля</Title>
                    <Text ta="center" fw={500} fz="lg" my="50px">Введите вашу электронную почту,
                        и мы вам отправим инструкцию по
                        восстановлению пароля.</Text>
                    <TextInput
                        className="border-b"
                        variant="unstyled"
                        size="lg"
                        my="10px"
                        withAsterisk
                        placeholder="Эл. почта"
                    />
                    <button type="submit" className=' bg-yellowlogin w-full h-14 rounded-3xl my-10'
                    >Сбросить пароль</button>
                    <Group position="center" mb="40px">
                        <Text c="dimmed" fz="lg">Вспомнили пароль? <Link href="/account/login/" className=' text-blue-500' >Войти</Link> </Text>
                    </Group>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword