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
        <div className='flex justify-center items-center m-auto my-10'>
            <LoginForm onSubmit={handleSubmit} />
        </div>

    )
}

export default Login