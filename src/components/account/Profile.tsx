import React, { useState } from 'react';
import { useFetchUser } from '@/services/fetchUser';
import { User } from '@/utils/types';

const Profile = () => {
    const [currentUser, { isLoading, isError }] = useFetchUser();

    if (isLoading) return <h1>Loading ...</h1>;
    if (isError) return <h1>Something wrong!!</h1>;
    if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет

    return (
        <div>
            <p>{currentUser.email}</p>
            <p></p>
        </div>
    )
}

export default Profile