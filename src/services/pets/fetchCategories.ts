import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

type ArgPet = {
	id: number;
};

export const fetchCategories = async () => {
	const { data } = await baseAxios.get(`/pets/get_categories/`);

	console.log(data);
	return data;
};

export const useFetchCategories = () => {
	const query = useQuery({
		queryFn: () => fetchCategories,
		queryKey: ["categories"],
		initialData: null,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
