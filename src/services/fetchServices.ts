import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { Pets } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

type Results = {
	count: number | null;
	next: number | null;
	prev: number | null;
	results: Pets[];
};

export const fetchPets = async () => {
	const { data } = await baseAxios.get<Results>("/pets/get_pets/");
	console.log(data);
	// return data[0]?
	return data.results;
};

export const useFetchPets = () => {
	const query = useQuery({
		queryFn: fetchPets,
		queryKey: ["pets"],
		initialData: [],
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
