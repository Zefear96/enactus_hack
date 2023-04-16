import { baseAxios } from "@/utils/baseAxios";
import { Pet } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ArgPet = {
	id: number;
	data: {
		title: string;
		breed?: string;
		image?: File | null;
		description?: string;
		price?: number;
		category: number;
	};
};

export const editPet = async (arg: ArgPet) => {
	const { data } = await baseAxios.patch<Pet>(
		`/pets/change/${arg.id}`,
		arg.data,
	);

	console.log(data);
	return data;
};

export const useEditPet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: editPet,
		onSettled(data, error, variables, context) {
			queryClient.invalidateQueries(["pet"]);
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};
