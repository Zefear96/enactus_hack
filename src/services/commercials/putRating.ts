import { baseAxios } from "@/utils/baseAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Commercial } from "@/utils/types";

type CreateRatingArg = {
    id: number,
    rating: number
}

const putRating = async (arg: CreateRatingArg) => {
    const { data } = await baseAxios.post<Commercial>(`/feedback/${arg.id}/rating/`, { rating: arg.rating });
    return data
}

export const usePutRating = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: putRating,
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["commercial"]);
        },

    })
    return [mutation.mutateAsync, mutation] as const
}