import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/utils/types';
import { baseAxios } from '@/utils/baseAxios';

type registerUserArg = {
    data: Partial<User> & ({ email: string } | { password: string } | { phone_number: string }) //только эти поля обязательны, остальные нет
}

const registerUser = async (arg: registerUserArg) => {
    const { data } = await baseAxios.post<User>("/account/register/", {
        ...arg.data
    });

    return data
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSettled() {
            queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey?.[0] === "account/register" //?
                }
            })
        }
    })

    return [mutation.mutateAsync, mutation] as const
}