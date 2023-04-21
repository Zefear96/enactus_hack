import { baseAxios } from "@/utils/baseAxios";
import { Comment } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ArgComment = {
    id: number;
    body: string;
    post: number;
}

export const editComment = async (arg: ArgComment) => {
    const { data } = await baseAxios.put<Comment>(`/feedback/comment/${arg.id}/`, { body: arg.body, post: arg.post });
    return data
}

export const useEditComment = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: editComment,
        onSettled() {
            queryClient.invalidateQueries(["comment"]),
                queryClient.invalidateQueries(["pet"])
        }
    });

    return [mutation.mutateAsync, mutation] as const
}