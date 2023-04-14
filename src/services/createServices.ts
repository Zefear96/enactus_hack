import { useMutation } from "@tanstack/react-query";
import { Pets } from "@/utils/types";
import { baseAxios } from "@/utils/baseAxios";

type createPetArg = {
	title: string;
	breed?: string;
	image?: File | null;
	description?: string;
	price?: number;
	category: number;
};

const createPet = async (arg: createPetArg) => {
	const formData = new FormData();

	Object.entries(arg).forEach(([key, value]) => {
		const stringValue = value instanceof Blob ? value : value?.toString();
		if (!stringValue) return;

		formData.append(key, stringValue);
	});

	const { data } = await baseAxios.post<Pets>("/pets/create_pets/", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
};

export const useCreatePet = () => {
	const mutation = useMutation({
		mutationFn: createPet,
	});

	return [mutation.mutateAsync, mutation] as const;
};
