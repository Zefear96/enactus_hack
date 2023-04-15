import { baseAxios } from "@/utils/baseAxios";
import { Commercial } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

type ShopResults = {
    count: number | null;
    prev: number | null;
    next: number | null;
    results: Commercial[]
}

export const fetchCommercials = async () => {
    const { data } = await baseAxios.get<ShopResults>("/shop/get_shop/");
    console.log(data);
    return data.results
}

export const useFetchCommercials = () => {
    const query = useQuery({
        queryFn: fetchCommercials,
        queryKey: ["commercials"],
        initialData: []
    })

    return [query.data, query] as const
}