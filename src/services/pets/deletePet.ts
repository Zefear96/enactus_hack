import { baseAxios } from "@/utils/baseAxios";
import { Pet } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ArgPet = {
	id: number;
};

export const deletePet = async (arg: ArgPet) => {
	const { data } = await baseAxios.delete<Pet>(`/pets/change/${arg.id}`);
	console.log(data);
	// return data[0]?
	return data;
};

export const useDeletePet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deletePet,

		onSettled(data, error, variables, context) {
			queryClient.invalidateQueries(["pets"]);
			// queryClient.invalidateQueries(["pet", { id: variables.id }]);
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};

// export const useDeletePet = () => {
// 	const queryClient = useQueryClient();

// 	const mutation = useMutation({
// 		mutationFn: deletePet,
// 		onMutate: async (arg: ArgPet) => {
// 			await queryClient.cancelQueries(["pet"]);
// 			const previousData = queryClient.getQueryData<Pet[]>(["pet"]);
// 			const newData = previousData?.filter((pet) => pet.id !== arg.id) ?? [];
// 			queryClient.setQueryData<Pet[]>(["pet"], newData);
// 			return { previousData };
// 		},
// 		onError: (err, variables, context) => {
// 			queryClient.setQueryData<Pet[]>(["pet"], context.previousData);
// 		},
// 		onSettled: () => {
// 			queryClient.invalidateQueries(["pet"]);
// 		},
// 		optimisticResults: () => {
// 			const previousData = queryClient.getQueryData<Pet[]>(["pet"]);
// 			const newData = previousData?.filter((pet) => pet.id !== arg.id) ?? [];
// 			return newData;
// 		},
// 	});

// 	return [mutation.mutateAsync, mutation] as const;
// };
