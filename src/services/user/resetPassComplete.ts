import { baseAxios } from "@/utils/baseAxios";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ResetPassCompleteArg = {
    password: string,
    password_confirm: string,
    code: string
}

const resetPassComplete = async (arg: ResetPassCompleteArg) => {

    try {

        const { data } = await baseAxios.post<ResetPassCompleteArg>('/account/reset_password_complete/', arg);
        console.log(data);
        return data

    } catch (error) {
        console.log(error);
    }
}

export const useResetPassComplete = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: resetPassComplete,
        onSettled() {
            queryClient.invalidateQueries(["password"])
        },
    })

    return [mutation.mutateAsync, mutation] as const
};