import { baseAxios } from "@/utils/baseAxios";
import { useQuery } from "@tanstack/react-query";
import { Commercial } from "@/utils/types";

type ArgCommercial = {
    id: number;
}

export const fetchOneCommercial = async (arg: ArgCommercial) => {
    const { data } = await baseAxios.get<Commercial>(`/shop/get_shop/${arg.id}`);
    console.log(data);

    return data

}

export const useFetchOneCommercial = (arg: ArgCommercial) => {
    const query = useQuery({
        queryFn: () => fetchOneCommercial(arg),
        queryKey: ["pet"],
        initialData: null,
    })
    return [query.data, query] as const;

}