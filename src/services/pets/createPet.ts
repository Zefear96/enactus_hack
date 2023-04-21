import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pet } from "@/utils/types";
import { baseAxios } from "@/utils/baseAxios";

type createPetArg = {
	title: string;
	breed?: string;
	image?: File | null;
	description?: string;
	price?: number;
	category: number;
	age?: string;
	address?: string;
	pet_name?: string;
	contact?: string;
};

const createPet = async (arg: createPetArg) => {
	const formData = new FormData();

	Object.entries(arg).forEach(([key, value]) => {
		const stringValue = value instanceof Blob ? value : value?.toString();

		// if (key === "image") {
		// 	formData.append(key, value ?? null); // добавляем null если value является null или undefined
		// 	return;
		// }

		if (!stringValue) return;

		formData.append(key, stringValue);
		console.log(formData);
	});

	const { data } = await baseAxios.post<Pet>("/pets/create_pets/", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
};

export const useCreatePet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createPet,
		onSettled() {
			queryClient.invalidateQueries(["pets"]);
		},

		// onSuccess: (data) => {
		// 	queryClient.setQueryData("pets", (existingData) => {
		// 		if (existingData && existingData.length > 0) {
		// 			return [...existingData, data];
		// 		}
		// 		return [data];
		// 	});
		// },
	});

	return [mutation.mutateAsync, mutation] as const;
};
