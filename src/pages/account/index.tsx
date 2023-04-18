import React from 'react';
import Profile from '@/components/account/Profile';
import { FocusTrap, TextInput, Group, Button, Text, Title, Avatar } from "@mantine/core";
import { useFetchUser } from "@/services/user/fetchUser";
import Link from 'next/link';

const UserProfile = () => {
    const [currentUser, { isLoading, isError }] = useFetchUser();

    if (isLoading) return <h1>Loading ...</h1>;
    if (isError) return <h1>Something wrong!!</h1>;
    if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет
    return (
        <div className="flex w-11/12 m-auto">
            <Profile />
            <div className="flex w-2/4 mx-auto my-10">
                <div className='mx-auto w-11/12'>
                    <Title ta="center" fw={700} my="40px" fz='30px'>Личные данные</Title>
                    <div className="flex items-end justify-center my-10">
                        {currentUser.profile_image ? <Avatar src={currentUser.profile_image} style={{ borderRadius: '50%', border: '1px solid #4526FF' }} size="xl" /> : currentUser.name ? <Avatar src={null} color="primary" alt={currentUser.name} style={{ borderRadius: '50%', border: '1px solid #4526FF' }} size="xl" /> : <Avatar size="xl" style={{ borderRadius: '50%', border: '1px solid #4526FF' }} />}
                    </div>
                    <Text ta='center'><b>Имя:</b> {currentUser.name} </Text>
                    <Text ta='center'><b>Эл. почта:</b> {currentUser.email} </Text>
                    <Text ta='center'><b>Номер телефона:</b> {currentUser.phone_number} </Text>
                    <Group position="right" mt="md">
                        <button type="submit" className=' bg-yellowlogin w-1/2 mx-auto h-12 rounded-lg my-1 text-bluelogin'><Link href="/account/edit" >Изменить данные</Link></button>
                    </Group>
                </div>
            </div>
        </div>
    )
}

export default UserProfile