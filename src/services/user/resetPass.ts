import { baseAxios } from "@/utils/baseAxios";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ResetPassArg = {
    email: string
}

export let emailsend = false

const resetPassword = async (arg: ResetPassArg) => {
    // console.log(arg);
    try {

        const { data } = await baseAxios.post<string>('/account/reset_password/', arg);
        emailsend = true
        return data

    } catch (error) {
        console.log(error);
    }
};

export const useResetPassword = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSettled() {
            queryClient.invalidateQueries(["password"])
        },
    })

    return [mutation.mutateAsync, mutation] as const

}