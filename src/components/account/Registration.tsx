import React from 'react';
import RegistrationForm, { RegistrationFormValues } from './RegistrationForm';
import { useRegisterUser } from '@/services/registerFetch';

const Registration = () => {

    const [registerUser] = useRegisterUser();
    const handleSubmit = (data: RegistrationFormValues) => {
        console.log(data);

        registerUser(data);
    }

    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <RegistrationForm onSubmit={handleSubmit} />
        </div>


    )
}

export default Registration