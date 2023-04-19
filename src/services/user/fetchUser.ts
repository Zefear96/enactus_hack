import { baseAxios } from "@/utils/baseAxios";
import { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const fetchUser = async () => {
	const { data } = await baseAxios.get<User>("/account/edit_profile/");
	console.log(data);

	return data;
};

export const useFetchUser = () => {
	const query = useQuery({
		queryFn: fetchUser,
		queryKey: ["account"],
		initialData: null,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
