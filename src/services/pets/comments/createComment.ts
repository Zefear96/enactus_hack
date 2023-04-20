import { useMutation } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";
import { Comment } from "@/utils/types";
import { queryClient } from "@/utils/queryClient";

type CreateCommentArg = {
    body: string;
    post: number
}

const createComment = async (arg: CreateCommentArg) => {
    const { data } = await baseAxios.post('/feedback/comment/', arg)
    console.log(data);

    return data
}

export const useCreateComment = () => {
    const mutation = useMutation({
        mutationFn: createComment,
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(['pet'])
        },
    })
    return [mutation.mutateAsync, mutation] as const
}
