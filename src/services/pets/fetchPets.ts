import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { Pet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

type FetchPetsResponse = {
	count: number;
	next: number | null;
	previous: number | null;
	results: Pet[];
};

export type FetchPetsArg = {
	// _sort?: keyof Results;
	ordering?: "asc" | "desc";
	search?: string;
	page?: any;
	_limit: number;
};

export const fetchPets = async (arg?: FetchPetsArg) => {
	const { data } = await baseAxios.get<FetchPetsResponse>("/pets/get_pets/", {
		params: arg,
	});

	return data;
};

const initialData: FetchPetsResponse = {
	results: [],
	next: null,
	previous: null,
	count: 0,
};

export const useFetchPets = (arg?: FetchPetsArg) => {
	const query = useQuery({
		queryFn: () => fetchPets(arg),
		queryKey: ["pets", arg],
		initialData,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
