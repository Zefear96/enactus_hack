import { baseAxios } from "@/utils/baseAxios";
import { Comment } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ArgComment = {
    id: number;
};

export const deleteComment = async (arg: ArgComment) => {
    const { data } = await baseAxios.delete(`/feedback/comment/${arg.id}`)
    console.log(data);
    return data
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteComment,
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["comment", { id: variables.id }]),
                queryClient.invalidateQueries(["pet"])
        }
    })
    return [mutation.mutateAsync, mutation] as const
}