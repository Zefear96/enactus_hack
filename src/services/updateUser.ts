import { baseAxios } from "@/utils/baseAxios";
import { User } from "@/utils/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateUserArg = {
    data: Partial<User>
}

const updateUser = async (arg: UpdateUserArg) => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "");

    //config
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
        headers: {
            Authorization, //ключ со значением
        },
    };

    const { data } = await baseAxios.patch<User>('/account/edit_profile/', arg.data, config);
    return data
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateUser,
        onSettled() {
            queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey?.[0] === "account/edit_profile"
                }
            })
        }
    })

    return [mutation.mutateAsync, mutation] as const
}