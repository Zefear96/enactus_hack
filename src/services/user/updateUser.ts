import { baseAxios } from "@/utils/baseAxios";
import { User } from "@/utils/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateUserArg = {
    data: Partial<User>
}

const updateUser = async (arg: UpdateUserArg) => {

    const { data } = await baseAxios.patch<User>('/account/edit_profile/', arg.data);
    return data
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateUser,
        onSettled() {
            queryClient.invalidateQueries(["account"])
        }
    })

    return [mutation.mutateAsync, mutation] as const
}