import { baseAxios } from "@/utils/baseAxios";
import { useMutation } from "@tanstack/react-query";
import { Commercial } from "@/utils/types";

type CreateRatingArg = {
    id: number,
    rateValue: number
}

const putRating = async (arg: CreateRatingArg) => {
    const { data } = await baseAxios.post<Commercial>(`/feedback/${arg.id}/rating/`, arg.rateValue);
    return data
}

export const usePutRating = () => {
    const mutation = useMutation({
        mutationFn: putRating
    })
    return [mutation.mutateAsync, mutation] as const
}