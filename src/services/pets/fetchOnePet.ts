import { baseAxios } from "@/utils/baseAxios";
import { storageGetItem } from "@/utils/storage";
import { Pet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

type ArgPet = {
	id: number;
};

export const fetchPet = async (arg: ArgPet) => {
	const { data } = await baseAxios.get<Pet>(`/pets/get_pet/${arg.id}`);
	// if (data.image && !data.image.startsWith("http")) {
	// 	data.image = MEDIA_URL + data.image;
	// }

	console.log(data);
	// return data[0]?
	return data;
};

export const useFetchPet = (arg: ArgPet) => {
	const query = useQuery({
		queryFn: () => fetchPet(arg),
		queryKey: ["pet"],
		initialData: null,
	}); //usequery вызовет функцию, получит данные и вернет

	return [query.data, query] as const;
};
