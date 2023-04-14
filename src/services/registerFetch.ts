import { useMutation } from '@tanstack/react-query';
import { User } from '@/utils/types';
import { baseAxios } from '@/utils/baseAxios';

type RegisterUserArg = {
    email: string;
    password: string;
    password2: string;
    phone_number: string;
}

const registerUser = async (arg: RegisterUserArg) => {
    const res = await baseAxios.post<User>("/account/register/", arg);
    console.log(res);

    return res.data
}

export const useRegisterUser = () => {

    const mutation = useMutation({
        mutationFn: registerUser,
    })

    return [mutation.mutateAsync, mutation] as const
}