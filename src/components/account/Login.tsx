import React from 'react';
import LoginForm, { LoginFormValues } from './LoginForm';
import { useLoginUser } from '@/services/loginFetch';

const Login = () => {

    const [loginUser] = useLoginUser();
    const handleSubmit = (data: LoginFormValues) => {
        console.log(data);

        loginUser(data);
    }

    return (

        <LoginForm onSubmit={handleSubmit} />

    )
}

export default Login