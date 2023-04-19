import { baseAxios } from "@/utils/baseAxios";
import { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { storageSetItem } from "@/utils/storage";
import { useAppSelector } from "@/store/hooks";

export const fetchUser = async () => {

	const { data } = await baseAxios.get<User>("/account/edit_profile/");
	return data;

};

export const useFetchUser = () => {
	const accessToken = useAppSelector(state => state.auth.accessToken)

	const query = useQuery({
		queryFn: fetchUser,
		queryKey: ["account", accessToken],
		initialData: null,
		enabled: Boolean(accessToken)
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
