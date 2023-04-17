import { baseAxios } from "@/utils/baseAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type ChangePassArg = {
    old_password: string,
    new_password: string
}

const changePassword = async (arg: ChangePassArg) => {

    try {

        const { data } = await baseAxios.put<string>('/account/change_password/', arg);
        console.log(data);
        return data

    } catch (error) {
        console.log(error);
    }
}

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: changePassword,
        onSettled() {
            queryClient.invalidateQueries(["password"])
        },
    })

    return [mutation.mutateAsync, mutation] as const
}