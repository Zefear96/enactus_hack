import { baseAxios } from "@/utils/baseAxios";
import { useQuery } from "@tanstack/react-query";
import { Review } from "@/utils/types";

export const fetchReviews = async () => {
    const { data } = await baseAxios.get<Review[]>('/feedback/review/');
    return data
}

export const useFetchReviews = () => {
    const query = useQuery({
        queryFn: fetchReviews,
        queryKey: ['reviews'],
        initialData: []
    })

    return [query.data, query] as const
}