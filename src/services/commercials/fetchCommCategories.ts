import { baseAxios } from "@/utils/baseAxios";
import { Commercial } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

type categoryResults = Commercial[]

export const fetchHostels = async () => {
    const { data } = await baseAxios.get<categoryResults>(`/shop/get_shop_category/${1}`);
    return data
}

export const useFetchHostels = () => {
    const query = useQuery({
        queryFn: fetchHostels,
        queryKey: ['hostels'],
        initialData: []
    })
    return [query.data, query] as const
}

export const fetchClinics = async () => {
    const { data } = await baseAxios.get<categoryResults>(`/shop/get_shop_category/${2}`);
    return data
}

export const useFetchClinics = () => {
    const query = useQuery({
        queryFn: fetchClinics,
        queryKey: ['clinics'],
        initialData: []
    })
    return [query.data, query] as const
}

export const fetchZoo = async () => {
    const { data } = await baseAxios.get<categoryResults>(`/shop/get_shop_category/${3}`);
    return data
}

export const useFetchZoo = () => {
    const query = useQuery({
        queryFn: fetchZoo,
        queryKey: ['zoo'],
        initialData: []
    })
    return [query.data, query] as const
}




