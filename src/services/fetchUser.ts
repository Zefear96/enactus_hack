import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { User } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

export const fetchUser = async () => {
    const { data } = await baseAxios.get<User>("/account/edit_profile/");
    // console.log(data);
    // return data[0]?
    return data
};

export const useFetchUser = () => {
    const query = useQuery({
        queryFn: () => fetchUser,
        queryKey: ["account/edit_profile",],
        initialData: null,
    }) //usequery вызовет функцию, получит данные и вернет

    return [query.data, query] as const;
};