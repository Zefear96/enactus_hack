import { baseAxios } from "@/utils/baseAxios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from "next/router";


type ResetPassCompleteArg = {
    password: string,
    password_confirm: string,
    code: string
}

const resetPassComplete = async (arg: ResetPassCompleteArg) => {
    const router = useRouter();

    try {

        const { data } = await baseAxios.post<ResetPassCompleteArg>('/account/reset_password_complete/', arg);
        console.log(data);
        router.push("/account/login/");
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