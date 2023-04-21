import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

interface Categories {
	id: number;
	title: string;
}

type FetchPetsCategories = {
	count: number;
	next: string;
	previous: null;
	results: Categories[] | null;
};

export const fetchCategories = async () => {
	const { data } = await baseAxios.get<FetchPetsCategories>(
		"/pets/get_categories/",
	);

	// console.log(data.results);
	return data.results;
};

export const useFetchCategories = () => {
	const query = useQuery({
		queryFn: fetchCategories,
		queryKey: ["categories"],
		initialData: null,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
