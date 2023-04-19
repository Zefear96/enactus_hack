import { useMutation } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";
import { Review } from "@/utils/types";

type createReviewArg = Omit<Review, 'id'>

const createReview = async (arg: createReviewArg) => {
    const { data } = await baseAxios.post<Review>('/feedback/review/', arg)
    console.log(data);

    return data
}

export const useCreateReview = () => {
    const mutation = useMutation({
        mutationFn: createReview,
    })

    return [mutation.mutateAsync, mutation] as const
}