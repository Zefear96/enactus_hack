import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

interface FetchCategories {
	id: number;
	title: string;
}

// type FetchPetsCategories = {
// 	count: number;
// 	next: string;
// 	previous: null;
// 	results: Categories[] | null;
// };

export const fetchCategories = async () => {
	const { data } = await baseAxios.get<FetchCategories[]>(
		"/pets/get_categories/",
	);

	// console.log(data.results);
	return data;
};

export const useFetchCategories = () => {
	const query = useQuery({
		queryFn: fetchCategories,
		queryKey: ["categories"],
		initialData: null,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
