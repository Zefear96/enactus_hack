import { useMutation, } from '@tanstack/react-query';
import { User } from '@/utils/types';
import { baseAxios } from '@/utils/baseAxios';

type loginUserArg = {
    data: Partial<User> & ({ password: string } | { phone_number: string }) //только эти поля обязательны, остальные нет
}

const loginUser = async (arg: loginUserArg) => {
    const { data } = await baseAxios.post<User>("/account/login/", {
        ...arg.data
    });

    localStorage.setItem("tokens", JSON.stringify(data));

    return data
}

export const useLoginUser = () => {

    const mutation = useMutation({
        mutationFn: loginUser,
    })

    return [mutation.mutateAsync, mutation] as const
}