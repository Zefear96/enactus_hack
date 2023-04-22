import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { Pet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

// type FetchPetsResponse = {
// 	count: number;
// 	next: number | null;
// 	previous: number | null;
// 	results: Pet[];
// };

export type FetchPetsArg = {
	// _sort?: keyof Results;
	ordering?: `${keyof Pet | `-${keyof Pet}`}${
		| `,${keyof Pet | `-${keyof Pet}`}`
		| ""}`;
	search?: string;
	page?: any;
	_limit: number;
};

export const fetchPets = async (arg?: FetchPetsArg) => {
	// console.log(arg);

	const { data } = await baseAxios.get<Pet[] | null>("/pets/get_pets/", {
		params: arg,
	});
	console.log(data);

	return data;
};

// const initialData: FetchPetsResponse = {
// 	results: [],
// 	next: null,
// 	previous: null,
// 	count: 0,
// };

export const useFetchPets = (arg?: FetchPetsArg) => {
	const query = useQuery({
		queryFn: () => fetchPets(arg),
		queryKey: ["pets", arg],
		initialData: null,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
