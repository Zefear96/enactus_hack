import React from 'react';
import RegistrationForm, { RegistrationFormValues } from './RegistrationForm';
import { useRegisterUser } from '@/services/registerFetch';

const Registration = () => {

    const [registerUser] = useRegisterUser();
    const handleSubmit = (data: RegistrationFormValues) => {
        registerUser({ data });
    }

    return (

        <RegistrationForm onSubmit={handleSubmit} />

    )
}

export default Registration