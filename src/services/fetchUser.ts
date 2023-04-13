import { baseAxios } from "@/utils/baseAxios";
import { User } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

type fetchUser = {
    headers: {
        Authorization: string
    }
}

export const fetchUser = async (arg: fetchUser) => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || ""); //?ругается на localstorage
    arg.headers.Authorization = `Bearer ${tokens.access}`;

    const { data } = await baseAxios.get<User>("/account/edit_profile/", arg);
    // console.log(data);
    // return data[0]?
    return data
};

export const useFetchUser = (arg: fetchUser) => {
    const query = useQuery({
        queryFn: () => fetchUser(arg),
        queryKey: ["account/edit_profile", arg],
        initialData: null,
    }) //usequery вызовет функцию, получит данные и вернет

    return [query.data, query] as const;
};